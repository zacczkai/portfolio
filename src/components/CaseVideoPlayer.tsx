"use client";

import { RotateCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Language, Project } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";
import { getCloudinaryPlaybackUrl, getCloudinaryPosterUrl, getResponsivePosterWidth } from "@/lib/cloudinary";
import { useViewportWidth } from "@/hooks/useViewportWidth";

interface CaseVideoPlayerProps {
  project: Project;
  language: Language;
  label: string;
}

export default function CaseVideoPlayer({ project, language, label }: CaseVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [attempt, setAttempt] = useState(0);
  const [metadataReady, setMetadataReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const media = project.media;
  const posterWidth = getResponsivePosterWidth(useViewportWidth(), 2560);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markMetadataReady = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        setMetadataReady(true);
      }
    };
    video.addEventListener("loadedmetadata", markMetadataReady);
    const readyTimer = video.readyState >= HTMLMediaElement.HAVE_METADATA
      ? window.setTimeout(markMetadataReady, 0)
      : undefined;

    return () => {
      video.removeEventListener("loadedmetadata", markMetadataReady);
      if (readyTimer !== undefined) window.clearTimeout(readyTimer);
    };
  }, [attempt, project.id]);

  if (media.kind !== "video") return null;
  const copy = uiCopy[language].case;
  const poster = getCloudinaryPosterUrl(media.sourceUrl, media.preview.start, posterWidth);

  const retry = () => {
    setMetadataReady(false);
    setHasError(false);
    setAttempt((value) => value + 1);
  };

  return (
    <div
      className={`relative mx-auto overflow-hidden bg-black ${media.orientation === "portrait" ? "case-media-portrait" : "case-media-landscape"}`}
      aria-busy={!metadataReady && !hasError}
    >
      <video
        ref={videoRef}
        key={attempt}
        controls={metadataReady}
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={`${label}: ${project.copy[language].title}`}
        onLoadedMetadata={(event) => {
          const duration = event.currentTarget.duration;
          if (Number.isFinite(duration) && duration > 0) setMetadataReady(true);
        }}
        onError={() => setHasError(true)}
        className={`block h-full w-full bg-black object-contain transition-opacity duration-300 ${metadataReady ? "opacity-100" : "opacity-70"}`}
      >
        <source src={getCloudinaryPlaybackUrl(media.sourceUrl)} type="video/mp4" />
        {language === "pt" ? "Seu navegador não suporta vídeo HTML5." : "Your browser does not support HTML5 video."}
      </video>

      {!metadataReady && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/20 p-6 text-center">
          {hasError ? (
            <div className="pointer-events-auto bg-black/80 px-6 py-5">
              <p className="text-sm text-zinc-200">{copy.videoError}</p>
              <button
                type="button"
                onClick={retry}
                className="mt-4 inline-flex min-h-11 items-center gap-2 border-b border-lime-300 text-sm font-semibold uppercase tracking-[0.08em] text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
              >
                <RotateCw className="h-4 w-4" />{copy.retry}
              </button>
            </div>
          ) : (
            <p className="bg-black/70 px-4 py-3 text-sm text-zinc-200">{copy.loadingVideo}</p>
          )}
        </div>
      )}
    </div>
  );
}
