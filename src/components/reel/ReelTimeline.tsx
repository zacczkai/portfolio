"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import type { Language, VideoProject } from "@/data/projects";
import { getCloudinaryPosterUrl } from "@/lib/cloudinary";
import { formatTimecode, getClipStops } from "@/lib/reel";

const THUMBNAIL_WIDTH = 160;

interface ReelTimelineProps {
  takes: readonly VideoProject[];
  language: Language;
  activeIndex: number;
  position: MotionValue<number>;
  time: MotionValue<number>;
  label: string;
  goToLabel: string;
  ofLabel: string;
  onSelect: (index: number) => void;
}

export default function ReelTimeline({ takes, language, activeIndex, position, time, label, goToLabel, ofLabel, onSelect }: ReelTimelineProps) {
  const stops = getClipStops(takes.map((take) => take.media.preview.duration));
  const playheadX = useTransform(position, stops.map((_, index) => index), stops.map((stop) => `${stop * 100}%`));
  const timecode = useTransform(time, (seconds) => formatTimecode(seconds));

  return (
    <nav aria-label={label} className="reel-timeline absolute inset-x-0 bottom-0 z-40 px-5 pb-3 sm:px-8 lg:px-12 lg:pb-4 xl:px-16">
      <div className="mb-1.5 flex items-baseline justify-between text-sm">
        <motion.span className="font-mono text-xs tabular-nums text-grade">{timecode}</motion.span>
        <span className="tabular-nums text-penumbra">{activeIndex + 1} {ofLabel} {takes.length}</span>
      </div>
      <div className="relative">
        <ol className="flex">
          {takes.map((take, index) => {
            const title = take.copy[language].shortTitle;
            const isActive = index === activeIndex;
            const { preview, sourceUrl } = take.media;
            return (
              <li key={take.id} style={{ flexGrow: preview.duration, flexBasis: 0 }} className="min-w-0">
                <button
                  type="button"
                  aria-label={`${goToLabel} ${title}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => onSelect(index)}
                  className="group relative flex h-11 w-full items-end overflow-hidden border-l border-black focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-projetor lg:h-12"
                >
                  <span className="absolute inset-0 hidden lg:flex" aria-hidden="true">
                    {Array.from({ length: preview.duration }, (_, second) => (
                      <span key={second} className="relative min-w-0 flex-1">
                        <Image
                          src={getCloudinaryPosterUrl(sourceUrl, preview.start + second, THUMBNAIL_WIDTH)}
                          alt=""
                          fill
                          unoptimized
                          loading="lazy"
                          sizes="160px"
                          className="object-cover"
                        />
                      </span>
                    ))}
                  </span>
                  <span className={`absolute inset-0 hidden transition-colors duration-300 lg:block ${isActive ? "bg-black/10" : "bg-black/65 group-hover:bg-black/35"}`} />
                  <span className={`absolute inset-x-0 bottom-0 h-1 transition-colors duration-300 lg:h-0.5 ${isActive ? "bg-grade" : "bg-white/25"}`} />
                  <span className={`relative hidden truncate px-2 pb-1.5 text-xs font-medium [text-shadow:0_1px_6px_rgba(0,0,0,.9)] sm:block ${isActive ? "text-projetor" : "text-projetor/70"}`}>
                    {title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <motion.div style={{ x: playheadX }} className="pointer-events-none absolute -inset-y-1 left-0 w-full" aria-hidden="true">
          <span className="absolute inset-y-0 left-0 w-0.5 -translate-x-1/2 bg-projetor shadow-[0_0_10px_rgba(0,0,0,.8)]" />
          <span className="absolute -top-0.5 left-0 h-2 w-2 -translate-x-1/2 rotate-45 bg-projetor" />
        </motion.div>
      </div>
    </nav>
  );
}
