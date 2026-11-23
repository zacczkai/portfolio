"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useTransform, type MotionValue } from "framer-motion";
import { ViewTransition } from "react";
import ProjectPreview from "@/components/ProjectPreview";
import type { Language, VideoProject } from "@/data/projects";
import { getProjectLabel, localizeRole } from "@/data/ui-copy";

interface ReelTakeProps {
  project: VideoProject;
  index: number;
  isLast: boolean;
  language: Language;
  isActive: boolean;
  isPlaying: boolean;
  isStatic: boolean;
  position: MotionValue<number>;
  time: MotionValue<number>;
  viewLabel: string;
}

export default function ReelTake({ project, index, isLast, language, isActive, isPlaying, isStatic, position, time, viewLabel }: ReelTakeProps) {
  const copy = project.copy[language];
  const enter = index === 0 ? -1 : index;
  const reveal = useTransform(position, [index - 0.12, index + 0.22], [100, 0]);
  const clipPath = useMotionTemplate`inset(${reveal}% 0 0 0)`;
  const mediaScale = useTransform(position, [index + 0.88, index + 1.22], [1, isLast ? 1 : 0.93]);
  const stretch = useTransform(position, [enter, enter + 0.5], [75, 100]);
  const fontStretch = useMotionTemplate`${stretch}%`;
  const detailOpacity = useTransform(position, [enter, enter + 0.22], [0, 1]);
  const detailY = useTransform(position, [enter, enter + 0.3], [8, 0]);

  return (
    <motion.article
      className="reel-take absolute inset-0 overflow-hidden bg-sala"
      style={{ zIndex: index, clipPath: index === 0 ? undefined : clipPath }}
      inert={!isActive && !isStatic}
    >
      <motion.div className="reel-media absolute inset-x-0 top-0 bottom-[var(--reel-console)]" style={{ scale: mediaScale }}>
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <ProjectPreview
            project={project}
            language={language}
            priority={index === 0}
            width={2560}
            sizes="100vw"
            label={copy.title}
            className="h-full w-full"
            fit="contain"
            backdrop
            playing={isPlaying}
            time={isActive ? time : undefined}
          />
        </ViewTransition>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-[var(--reel-rail)] grid h-[var(--reel-caption)] content-center gap-y-1 bg-sala px-5 sm:px-8 lg:grid-cols-[clamp(13rem,22vw,26rem)_minmax(0,1fr)_auto] lg:items-center lg:gap-x-10 lg:px-12 xl:px-16">
        <motion.h2
          className="reel-detail whitespace-nowrap text-[clamp(1.875rem,3.1vw,3.25rem)] font-bold leading-none tracking-[-0.015em] text-projetor"
          style={{ fontStretch, opacity: detailOpacity }}
        >
          {copy.shortTitle}
        </motion.h2>
        <motion.div className="reel-detail min-w-0 max-w-[68ch]" style={{ opacity: detailOpacity, y: detailY }}>
          <p className="text-pretty text-sm leading-snug text-projetor lg:text-base">{copy.summary}</p>
          <p className="mt-0.5 hidden truncate text-sm text-projetor/65 lg:block">
            {getProjectLabel(language, project)}, {project.year}. {project.roles.map((role) => localizeRole(language, role)).join(", ")}.
          </p>
        </motion.div>
        <motion.div className="reel-detail flex items-center gap-5" style={{ opacity: detailOpacity, y: detailY }}>
          {project.highlight && <p className="text-sm font-semibold text-grade">{project.highlight[language]}</p>}
          <Link
            href={`/projetos/${project.slug}`}
            className="pointer-events-auto inline-flex min-h-11 shrink-0 items-center gap-2 text-base font-semibold text-projetor underline decoration-grade decoration-2 underline-offset-4 transition-colors hover:text-grade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grade"
          >
            {viewLabel}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </motion.article>
  );
}
