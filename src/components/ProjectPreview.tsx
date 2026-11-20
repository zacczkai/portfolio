"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { getCloudinaryPlaybackUrl, getCloudinaryPosterUrl, getResponsivePosterWidth } from "@/lib/cloudinary";
import { canAutoplayPreview, getPreviewRecovery } from "@/lib/media-policy";
import { useViewportWidth } from "@/hooks/useViewportWidth";

const ACTIVE_PREVIEW_EVENT = "portfolio:preview-active";

interface ProjectPreviewProps {
  project: Project;
  language: "pt" | "en";
  className?: string;
  sizes?: string;
  width?: number;
  priority?: boolean;
  label?: string;
  fit?: "cover" | "contain";
  backdrop?: boolean;
}

type NavigatorWithConnection = Navigator & {
  connection?: { saveData?: boolean };
};

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
}: ProjectPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLAnchorElement>(null);
  const retryTimerRef = useRef<number | undefined>(undefined);
  const reducedMotion = Boolean(useReducedMotion());
  const [saveData] = useState(() =>
    typeof navigator === "undefined"
      ? false
      : Boolean((navigator as NavigatorWithConnection).connection?.saveData),
  );
  const [isActive, setIsActive] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [posterUnavailable, setPosterUnavailable] = useState(false);
  const [previewAttempt, setPreviewAttempt] = useState(1);
  const copy = project.copy[language];
  const canMove = canAutoplayPreview({ reducedMotion, saveData });
  const posterWidth = getResponsivePosterWidth(useViewportWidth(), width);

  const handlePreviewFailure = useCallback((failure: "media-error" | "play-rejected") => {
    const recovery = getPreviewRecovery(failure, previewAttempt);
    if (recovery.kind !== "retry") {
      setIsReady(false);
      return;
    }

    setIsReady(false);
    window.clearTimeout(retryTimerRef.current);
    retryTimerRef.current = window.setTimeout(() => {
      setPreviewAttempt((attempt) => attempt + 1);
    }, recovery.delay);
  }, [previewAttempt]);

  const deactivate = useCallback(() => {
    setIsActive(false);
    videoRef.current?.pause();
  }, []);

  const activate = useCallback(() => {
    if (!canMove || project.media.kind !== "video") return;
    if (hasError) {
      setHasError(false);
      setPreviewAttempt(1);
    }
    setShouldLoad(true);
    setIsActive(true);
    window.dispatchEvent(new CustomEvent(ACTIVE_PREVIEW_EVENT, { detail: project.id }));
  }, [canMove, hasError, project.id, project.media.kind]);

  useEffect(() => () => window.clearTimeout(retryTimerRef.current), []);

  useEffect(() => {
    const stopOtherPreview = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== project.id) deactivate();
    };
    window.addEventListener(ACTIVE_PREVIEW_EVENT, stopOtherPreview);
    return () => window.removeEventListener(ACTIVE_PREVIEW_EVENT, stopOtherPreview);
  }, [deactivate, project.id]);

  useEffect(() => {
    if (!isActive || !shouldLoad) return;
    if (!isReady) videoRef.current?.load();
    videoRef.current?.play().catch((error: unknown) => {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        handlePreviewFailure("play-rejected");
      }
    });
  }, [handlePreviewFailure, isActive, isReady, previewAttempt, shouldLoad]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !canMove || project.media.kind !== "video") return;

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
  }, [activate, canMove, deactivate, project.media.kind]);

  const visual = (() => {
    if (project.media.kind === "video") {
      const preview = project.media.preview;
      const poster = getCloudinaryPosterUrl(project.media.sourceUrl, preview.start, posterWidth);
      const playbackUrl = getCloudinaryPlaybackUrl(project.media.sourceUrl);
      const fitClass = fit === "contain" ? "object-contain" : "object-cover";
      return (
        <>
          {backdrop && !posterUnavailable && (
            <Image
              src={poster}
              alt=""
              fill
              priority={priority}
              sizes={sizes}
              className="scale-110 object-cover opacity-45 blur-2xl saturate-75"
            />
          )}
          {!posterUnavailable && (
            <Image
              src={poster}
              alt=""
              fill
              priority={priority}
              sizes={sizes}
              className={`${fitClass} transition-opacity duration-500 ${isReady && isActive ? "opacity-0" : "opacity-100"}`}
              onError={() => setPosterUnavailable(true)}
            />
          )}
          {shouldLoad && !hasError && (
            <video
              key={previewAttempt}
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
              poster={poster}
              className={`absolute inset-0 h-full w-full ${fitClass} transition-opacity duration-500 ${isReady && isActive ? "opacity-100" : "opacity-0"}`}
              onLoadedMetadata={(event) => {
                const video = event.currentTarget;
                if (Number.isFinite(video.duration) && video.duration > preview.start) {
                  video.currentTime = preview.start;
                }
              }}
              onCanPlay={() => {
                setIsReady(true);
                setHasError(false);
              }}
              onTimeUpdate={(event) => {
                const video = event.currentTarget;
                const previewEnd = preview.start + preview.duration;
                if (video.currentTime >= previewEnd) video.currentTime = preview.start;
              }}
              onError={() => handlePreviewFailure("media-error")}
            >
              <source src={playbackUrl} type="video/mp4" />
            </video>
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
        className={`${fit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.025]`}
        onError={() => setHasError(true)}
      />
    );
  })();

  return (
    <Link
      ref={frameRef}
      href={`/projetos/${project.slug}`}
      aria-label={label ?? copy.title}
      onPointerEnter={activate}
      onPointerLeave={deactivate}
      onFocus={activate}
      onBlur={deactivate}
      className={`group relative block overflow-hidden bg-[#11110f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black ${className}`}
    >
      {visual}
      {hasError && (
        <span className="absolute inset-0 grid place-items-center bg-[#11110f] px-6 text-center text-sm text-zinc-300">
          {language === "pt" ? "Prévia indisponível" : "Preview unavailable"}
        </span>
      )}
    </Link>
  );
}
