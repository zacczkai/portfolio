"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpLeft } from "lucide-react";
import { ViewTransition, type CSSProperties } from "react";
import type { Language, Project } from "@/data/projects";
import { getProjectLabel, localizeRole, uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";
import CaseVideoPlayer from "@/components/CaseVideoPlayer";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import ProjectCarousel from "@/components/ProjectCarousel";

interface CaseStudyProps {
  project: Project;
  previous: Project;
  next: Project;
}

export default function CaseStudy({ project, previous, next }: CaseStudyProps) {
  const { lang } = useLanguage();
  const copy = project.copy[lang];
  const labels = uiCopy[lang].case;
  const style = project.grade ? ({ "--grade": project.grade } as CSSProperties) : undefined;
  const backHref = project.discipline === "design" ? "/#design" : "/#trabalhos";

  return (
    <main style={style} className="min-h-screen bg-sala text-projetor">
      <Navbar />
      <article>
        <ProjectFullMedia project={project} language={lang} label={labels.fullVideo} />

        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <header className="grid gap-5 border-b border-white/15 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,34rem)] lg:items-end lg:gap-12 lg:py-14">
            <div>
              <Link
                href={backHref}
                className="-ml-0.5 inline-flex min-h-11 items-center gap-2 text-sm text-projetor/75 transition-colors hover:text-grade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grade"
              >
                <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />{labels.back}
              </Link>
              <h1 className="type-display mt-3 text-balance text-[clamp(3rem,7.5vw,7.5rem)]">{copy.shortTitle}</h1>
              <p className="mt-3 text-base text-grade">{getProjectLabel(lang, project)}, {project.year}</p>
            </div>
            <p className="text-pretty text-lg leading-snug lg:pb-1 lg:text-xl">{copy.summary}</p>
          </header>

          <div className="grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,34rem)] lg:gap-12 lg:py-16">
            <section aria-labelledby="case-project-title">
              <h2 id="case-project-title" className="text-lg font-semibold">{labels.project}</h2>
              <div className="mt-4 max-w-[62ch] space-y-5 text-pretty text-lg leading-relaxed text-projetor/85">
                {copy.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
            <dl className="m-0 grid content-start gap-6">
              <div>
                <dt className="text-lg font-semibold">{labels.role}</dt>
                <dd className="m-0 mt-2 leading-relaxed text-projetor/85">{project.roles.map((role) => localizeRole(lang, role)).join(", ")}</dd>
              </div>
              <div>
                <dt className="text-lg font-semibold">{labels.tools}</dt>
                <dd className="m-0 mt-2 leading-relaxed text-projetor/85">{project.tools.join(", ")}</dd>
              </div>
            </dl>
          </div>

          <nav aria-label={lang === "pt" ? "Navegação entre projetos" : "Project navigation"} className="grid border-t border-white/15 sm:grid-cols-2">
            <CaseLink project={previous} language={lang} direction="previous" label={labels.previous} />
            <CaseLink project={next} language={lang} direction="next" label={labels.next} />
          </nav>
        </div>
      </article>
      <Contact />
    </main>
  );
}

function ProjectFullMedia({ project, language, label }: { project: Project; language: Language; label: string }) {
  const media = project.media;
  if (media.kind === "video") {
    return (
      <div className="px-[var(--stage-gutter)] pt-20">
        <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
          <CaseVideoPlayer project={project} language={language} label={label} />
        </ViewTransition>
      </div>
    );
  }

  if (media.kind === "gallery") {
    return (
      <div className="bg-mesa pb-6 pt-24 text-sala">
        <ProjectCarousel
          images={media.images}
          language={language}
          title={project.copy[language].title}
          priority
          sizes="(max-width: 1023px) 82vw, 38rem"
          variant="strip"
        />
      </div>
    );
  }

  return (
    <div className="bg-mesa px-[var(--stage-gutter)] pb-8 pt-24">
      <figure className="case-media-artwork relative m-0 mx-auto overflow-hidden">
        <Image src={media.image.src} alt={media.image.alt[language]} fill priority sizes="(max-width: 1023px) calc(100vw - 40px), 960px" className="object-contain" />
      </figure>
    </div>
  );
}

function CaseLink({ project, language, direction, label }: { project: Project; language: Language; direction: "previous" | "next"; label: string }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`group flex min-h-40 flex-col justify-center gap-2 py-8 transition-colors hover:text-grade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-grade ${isNext ? "items-end border-t border-white/15 text-right sm:border-l sm:border-t-0 sm:pl-10" : "items-start sm:pr-10"}`}
    >
      <span className="flex items-center gap-2 text-sm text-penumbra">
        {!isNext && <ArrowLeft className="h-4 w-4" aria-hidden="true" />}{label}{isNext && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
      </span>
      <strong className="type-display max-w-[16ch] text-[clamp(2rem,3.5vw,3.5rem)]">{project.copy[language].shortTitle}</strong>
    </Link>
  );
}
