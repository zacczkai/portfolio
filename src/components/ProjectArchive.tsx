"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project, type ProjectDiscipline } from "@/data/projects";
import { disciplineLabels, uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectArchive() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].archive;
  const motionProjects = projects.filter((project) => project.discipline === "motion");
  const designProjects = projects.filter((project) => project.discipline === "design");

  return (
    <section id="arquivo" className="scroll-mt-16 border-t border-white/10 bg-[#090908] py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-lime-300">{copy.label}</p>
            <h2 className="mt-4 max-w-[13ch] text-balance text-[clamp(2.8rem,5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white">{copy.title}</h2>
          </div>
          <p className="max-w-lg text-pretty text-base leading-relaxed text-zinc-300 lg:justify-self-end">{copy.description}</p>
        </div>

        <div className="grid lg:grid-cols-2">
          <ArchiveGroup discipline="motion" items={motionProjects} language={lang} openLabel={copy.open} />
          <ArchiveGroup discipline="design" items={designProjects} language={lang} openLabel={copy.open} />
        </div>
      </div>
    </section>
  );
}

function ArchiveGroup({
  discipline,
  items,
  language,
  openLabel,
}: {
  discipline: ProjectDiscipline;
  items: readonly Project[];
  language: "pt" | "en";
  openLabel: string;
}) {
  return (
    <div className="border-white/10 pt-10 lg:first:pr-10 lg:last:border-l lg:last:pl-10">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h3 className="text-2xl font-semibold tracking-[-0.025em] text-white">{disciplineLabels[language][discipline]}</h3>
        <span className="font-mono text-xs tabular-nums text-zinc-500">{String(items.length).padStart(2, "0")}</span>
      </div>
      <ol>
        {items.map((project, index) => (
          <li key={project.id} className="border-t border-white/10">
            <Link
              href={`/projetos/${project.slug}`}
              aria-label={`${openLabel}: ${project.copy[language].title}`}
              className="group grid min-h-24 grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-3 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
            >
              <span className="font-mono text-xs tabular-nums text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
              <span>
                <strong className="block text-xl font-medium leading-tight tracking-[-0.025em] text-zinc-100 transition-colors group-hover:text-lime-300 sm:text-2xl">{project.copy[language].shortTitle}</strong>
                <span className="mt-1 block text-sm text-zinc-500">{project.year} · {getFormatLabel(project, language)}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 text-zinc-500 transition-[color,transform] duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-lime-300" />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

function getFormatLabel(project: Project, language: "pt" | "en") {
  if (project.media.kind === "gallery") return language === "pt" ? "Carrossel" : "Carousel";
  if (project.media.kind === "image") return language === "pt" ? "Estático" : "Static";
  return "Video";
}
