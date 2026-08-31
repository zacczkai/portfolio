"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpLeft } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/projects";
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
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f0]">
      <Navbar />
      <article>
        <header className="mx-auto max-w-[1600px] px-5 pb-16 pt-28 sm:px-8 sm:pb-24 sm:pt-36 lg:px-12 xl:px-16">
          <Link
            href="/#trabalhos"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-zinc-300 transition-colors hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
          >
            <ArrowUpLeft className="h-4 w-4" />{labels.back}
          </Link>
          <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-lime-300">{getProjectLabel(lang, project)} · {project.year}</p>
              <h1 className="mt-5 max-w-[14ch] text-balance text-[clamp(3.4rem,8vw,6rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-white">{copy.shortTitle}</h1>
            </motion.div>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-300 lg:justify-self-end lg:pb-2">{copy.summary}</p>
          </div>
        </header>

        <div className="px-[var(--stage-gutter)]">
          <ProjectFullMedia project={project} language={lang} label={labels.fullVideo} />
        </div>

        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.25fr_.75fr] lg:gap-20">
            <section aria-labelledby="case-project-title">
              <p id="case-project-title" className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">{labels.project}</p>
              <div className="mt-6 max-w-3xl space-y-6 text-lg leading-relaxed text-zinc-300 sm:text-xl">
                {copy.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>
            <aside className="grid content-start gap-8 border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{labels.role}</p>
                <p className="mt-3 leading-relaxed text-zinc-200">{project.roles.map((role) => localizeRole(lang, role)).join(" · ")}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">{labels.tools}</p>
                <p className="mt-3 leading-relaxed text-zinc-200">{project.tools.join(" · ")}</p>
              </div>
            </aside>
          </div>

          <nav aria-label={lang === "pt" ? "Navegação entre projetos" : "Project navigation"} className="grid border-t border-white/10 sm:grid-cols-2">
            <CaseLink project={previous} language={lang} direction="previous" label={labels.previous} />
            <CaseLink project={next} language={lang} direction="next" label={labels.next} />
          </nav>
        </div>
      </article>
      <Contact />
    </main>
  );
}

function ProjectFullMedia({ project, language, label }: { project: Project; language: "pt" | "en"; label: string }) {
  const media = project.media;
  if (media.kind === "video") {
    return <CaseVideoPlayer project={project} language={language} label={label} />;
  }

  if (media.kind === "gallery") {
    return (
      <ProjectCarousel
        images={media.images}
        language={language}
        title={project.copy[language].title}
        priority
        sizes="(max-width: 1023px) calc(100vw - 40px), min(56vw, 960px)"
        className="mx-auto w-full max-w-[60rem]"
      />
    );
  }

  return (
    <figure className="case-media-portrait relative mx-auto overflow-hidden bg-[#11110f]">
      <Image src={media.image.src} alt={media.image.alt[language]} fill priority sizes="(max-width: 1023px) calc(100vw - 40px), min(50vw, 1080px)" className="object-contain" />
    </figure>
  );
}

function CaseLink({ project, language, direction, label }: { project: Project; language: "pt" | "en"; direction: "previous" | "next"; label: string }) {
  const isNext = direction === "next";
  return (
    <Link
      href={`/projetos/${project.slug}`}
      className={`group flex min-h-44 flex-col justify-center gap-3 py-8 transition-colors hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 ${isNext ? "items-end border-t border-white/10 text-right sm:border-l sm:border-t-0 sm:pl-10" : "items-start sm:pr-10"}`}
    >
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {!isNext && <ArrowLeft className="h-4 w-4" />}{label}{isNext && <ArrowRight className="h-4 w-4" />}
      </span>
      <strong className="max-w-[16ch] text-2xl font-medium tracking-[-0.03em] sm:text-3xl">{project.copy[language].shortTitle}</strong>
    </Link>
  );
}
