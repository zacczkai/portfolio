"use client";

import Image from "next/image";
import Link from "next/link";
import type { MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPosterTime, type Project } from "@/data/projects";
import { getCloudinaryPosterUrl, getCloudinaryPreviewUrl, getResponsivePosterWidth } from "@/lib/cloudinary";
import { getPreviewRecovery } from "@/lib/media-policy";
import { useStaticMedia } from "@/hooks/useStaticMedia";
import { useViewportWidth } from "@/hooks/useViewportWidth";

const ACTIVE_PREVIEW_EVENT = "portfolio:preview-active";
const MAX_PREVIEW_WIDTH = 1920;

const FIT_CLASSES = {
  cover: "object-cover",
  contain: "object-contain",
} as const;

interface ProjectPreviewProps {
  project: Project;
  language: "pt" | "en";
  className?: string;
  sizes?: string;
  width?: number;
  priority?: boolean;
  label?: string;
  fit?: keyof typeof FIT_CLASSES;
  backdrop?: boolean;
  playing?: boolean;
  time?: MotionValue<number>;
}

export default function ProjectPreview({
  project,
  language,
  className = "",
  sizes = "100vw",
  width = 1440,
  priority = false,
  label,
  fit = "cover",
  backdrop = false,
  playing,
  time,
}: ProjectPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLAnchorElement>(null);
  const retryTimerRef = useRef<number | undefined>(undefined);
  const [isHovered, setIsHovered] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posterUnavailable, setPosterUnavailable] = useState(false);
  const [previewAttempt, setPreviewAttempt] = useState(1);
  const copy = project.copy[language];
  const canMove = !useStaticMedia();
  const isControlled = playing !== undefined;
  const isVideo = project.media.kind === "video";
  const isPlaying = canMove && isVideo && (isControlled ? playing : isHovered);
  const posterWidth = getResponsivePosterWidth(useViewportWidth(), width);
  const previewStart = project.media.kind === "video" ? project.media.preview.start : 0;

  if (isPlaying && !shouldLoad) setShouldLoad(true);

  const handlePreviewFailure = useCallback((failure: "media-error" | "play-rejected") => {
    const recovery = getPreviewRecovery(failure, previewAttempt);
    setIsReady(false);
    if (recovery.kind !== "retry") return;

    window.clearTimeout(retryTimerRef.current);
    retryTimerRef.current = window.setTimeout(() => {
      setPreviewAttempt((attempt) => attempt + 1);
    }, recovery.delay);
  }, [previewAttempt]);

  const deactivate = useCallback(() => setIsHovered(false), []);
  const activate = useCallback(() => {
    if (canMove && isVideo) setIsHovered(true);
  }, [canMove, isVideo]);

  useEffect(() => () => window.clearTimeout(retryTimerRef.current), []);

  useEffect(() => {
    if (isControlled) return;
    const stopOtherPreview = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== project.id) deactivate();
    };
    window.addEventListener(ACTIVE_PREVIEW_EVENT, stopOtherPreview);
    return () => window.removeEventListener(ACTIVE_PREVIEW_EVENT, stopOtherPreview);
  }, [deactivate, isControlled, project.id]);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    if (!isPlaying) {
      videoRef.current.pause();
      return;
    }

    window.dispatchEvent(new CustomEvent(ACTIVE_PREVIEW_EVENT, { detail: project.id }));
    if (!isReady) videoRef.current?.load();
    videoRef.current?.play().catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        handlePreviewFailure("play-rejected");
      }
    });
  }, [handlePreviewFailure, isPlaying, isReady, previewAttempt, project.id, shouldLoad]);

  useEffect(() => {
    if (!time || !isPlaying) return;
    let frame = 0;
    const syncTime = () => {
      time.set(previewStart + (videoRef.current?.currentTime ?? 0));
      frame = requestAnimationFrame(syncTime);
    };
    frame = requestAnimationFrame(syncTime);
    return () => cancelAnimationFrame(frame);
  }, [isPlaying, previewStart, time]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || isControlled || !canMove || !isVideo) return;

    const touchLike = window.matchMedia("(hover: none)").matches;
    if (!touchLike) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) activate();
        else deactivate();
      },
      { threshold: 0.62 },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, [activate, canMove, deactivate, isControlled, isVideo]);

  const visual = (() => {
    if (project.media.kind === "video") {
      const preview = project.media.preview;
      const poster = getCloudinaryPosterUrl(project.media.sourceUrl, getPosterTime(project.media), posterWidth);
      const previewUrl = getCloudinaryPreviewUrl(project.media.sourceUrl, preview, Math.min(posterWidth, MAX_PREVIEW_WIDTH));
      const fitClass = FIT_CLASSES[fit];
      return (
        <>
          {backdrop && !posterUnavailable && (
            <Image
              src={poster}
              alt=""
              fill
              priority={priority}
              sizes={sizes}
              className="scale-110 object-cover opacity-60 blur-2xl saturate-125"
            />
          )}
          {!posterUnavailable && (
            <Image
              src={poster}
              alt=""
              fill
              priority={priority}
              sizes={sizes}
              className={`${fitClass} transition-opacity duration-500 ${isReady && isPlaying ? "opacity-0" : "opacity-100"}`}
              onError={() => setPosterUnavailable(true)}
            />
          )}
          {shouldLoad && !hasError && (
            <video
              key={previewAttempt}
              ref={videoRef}
              src={previewUrl}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              poster={poster}
              className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-500 ${isReady && isPlaying ? "opacity-100" : "opacity-0"}`}
              onCanPlay={() => {
                setIsReady(true);
                setHasError(false);
              }}
              onError={() => handlePreviewFailure("media-error")}
            />
          )}
        </>
      );
    }

    const asset = project.media.kind === "gallery" ? project.media.images[0] : project.media.image;
    return (
      <Image
        src={asset.src}
        alt=""
        fill
        priority={priority}
        sizes={sizes}
        className={`${FIT_CLASSES[fit]} transition-transform duration-700 group-hover:scale-[1.025]`}
        onError={() => setHasError(true)}
      />
    );
  })();

  return (
    <Link
      ref={frameRef}
      href={`/projetos/${project.slug}`}
      aria-label={label ?? copy.title}
      aria-hidden={isControlled || undefined}
      tabIndex={isControlled ? -1 : undefined}
      onPointerEnter={isControlled ? undefined : activate}
      onPointerLeave={isControlled ? undefined : deactivate}
      onFocus={isControlled ? undefined : activate}
      onBlur={isControlled ? undefined : deactivate}
      className={`group relative block overflow-hidden bg-sala focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grade focus-visible:ring-offset-4 focus-visible:ring-offset-black ${className}`}
    >
      {visual}
      {hasError && (
        <span className="absolute inset-0 grid place-items-center bg-sala px-6 text-center text-sm text-penumbra">
          {language === "pt" ? "Prévia indisponível" : "Preview unavailable"}
        </span>
      )}
    </Link>
  );
}
