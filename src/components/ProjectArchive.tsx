"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { getPosterTime, projects, type Language, type Project } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";
import { getCloudinaryPosterUrl } from "@/lib/cloudinary";

const orderedProjects = [
  ...projects.filter((project) => project.discipline === "motion"),
  ...projects.filter((project) => project.discipline === "design"),
];

export default function ProjectArchive() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].archive;
  const [previewId, setPreviewId] = useState(orderedProjects[0].id);
  const previewProject = orderedProjects.find((project) => project.id === previewId) ?? orderedProjects[0];

  return (
    <section id="arquivo" className="scroll-mt-16 bg-sala py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="type-display text-[clamp(3rem,7vw,7.5rem)] text-projetor">{copy.title}</h2>
          <p className="text-lg text-projetor/75 lg:pb-2">{copy.description}</p>
        </header>

        <div className="mt-10 grid lg:grid-cols-[minmax(0,1fr)_minmax(18rem,30vw)] lg:gap-12">
          <ol className="border-b border-white/15">
            {orderedProjects.map((project) => {
              const isPreviewed = project.id === previewProject.id;
              return (
                <li
                  key={project.id}
                  className="border-t border-white/15"
                  style={project.grade ? ({ "--grade": project.grade } as CSSProperties) : undefined}
                >
                  <Link
                    href={`/projetos/${project.slug}`}
                    aria-label={`${copy.open}: ${project.copy[lang].title}`}
                    onPointerEnter={() => setPreviewId(project.id)}
                    onFocus={() => setPreviewId(project.id)}
                    className="group grid min-h-16 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-grade"
                  >
                    <span className={`truncate text-xl font-semibold leading-tight transition-colors group-hover:text-grade sm:text-2xl ${isPreviewed ? "lg:text-projetor" : "lg:text-projetor/60"}`}>
                      {project.copy[lang].shortTitle}
                    </span>
                    <span className="hidden text-sm text-penumbra sm:block">{getFormatLabel(project, lang)}, {project.year}</span>
                    <ArrowUpRight className="h-4 w-4 text-penumbra transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-grade" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ol>
          <div className="relative sticky top-24 hidden h-[calc(100svh-8rem)] self-start lg:block" aria-hidden="true">
            <Image
              key={previewProject.id}
              src={getPreviewSource(previewProject)}
              alt=""
              fill
              sizes="30vw"
              className="object-contain object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function getPreviewSource(project: Project) {
  if (project.media.kind === "video") {
    return getCloudinaryPosterUrl(project.media.sourceUrl, getPosterTime(project.media), 1440);
  }
  return project.media.kind === "gallery" ? project.media.images[0].src : project.media.image.src;
}

function getFormatLabel(project: Project, language: Language) {
  const pt = language === "pt";
  if (project.media.kind === "gallery") return pt ? "Carrossel" : "Carousel";
  if (project.media.kind === "image") return pt ? "Estático" : "Static";
  if (project.media.orientation === "portrait") return pt ? "Vídeo vertical" : "Vertical video";
  return pt ? "Vídeo" : "Video";
}
