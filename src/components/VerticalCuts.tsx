"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "framer-motion";
import { ViewTransition, useEffect, useRef, useState, type CSSProperties } from "react";
import ProjectPreview from "@/components/ProjectPreview";
import { useLanguage } from "@/context/LanguageContext";
import { verticalProjects } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";

export default function VerticalCuts() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].verticals;
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: "0px 0px -60% 0px" });
  const [activeId, setActiveId] = useState(verticalProjects[0].id);

  useEffect(() => {
    const followsScroll = window.matchMedia("(hover: none), (max-width: 1023px)");
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>("[data-cut]");
    if (!cards) return;

    const observer = new IntersectionObserver((entries) => {
      if (!followsScroll.matches) return;
      const visible = entries.find((entry) => entry.isIntersecting)?.target as HTMLElement | undefined;
      if (visible?.dataset.cut) setActiveId(visible.dataset.cut);
    }, { threshold: 0.62 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="verticais" aria-labelledby="verticais-title" className="scroll-mt-16 bg-sala pt-20 lg:py-24 xl:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 sm:px-8 lg:gap-10 lg:px-12 xl:grid-cols-[minmax(0,1fr)_auto] xl:gap-12 xl:px-16">
        <div className="vertical-cuts-intro min-w-0 xl:sticky xl:top-24 xl:self-start">
          <h2 id="verticais-title" className="type-display text-balance text-[clamp(3rem,6.5vw,7rem)] text-projetor">{copy.title}</h2>
          <p className="mt-4 max-w-[32ch] text-pretty text-lg leading-snug text-projetor/75">{copy.description}</p>
        </div>
        <ol className="-mx-5 flex flex-col sm:-mx-8 lg:mx-0 lg:flex-row lg:gap-4">
          {verticalProjects.map((project) => {
            const projectCopy = project.copy[lang];
            const isActive = project.id === activeId;
            return (
              <li
                key={project.id}
                data-cut={project.id}
                style={project.grade ? ({ "--grade": project.grade } as CSSProperties) : undefined}
                className="vertical-cut flex h-svh shrink-0 flex-col lg:block lg:h-auto"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActiveId(project.id);
                }}
                onFocusCapture={() => setActiveId(project.id)}
              >
                <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
                  <ProjectPreview
                    project={project}
                    language={lang}
                    width={720}
                    sizes="(max-width: 1023px) 100vw, 24rem"
                    label={projectCopy.title}
                    className="vertical-cut-media aspect-[9/16] shrink-0 self-center"
                    playing={isInView && isActive}
                  />
                </ViewTransition>
                <span className={`block h-0.5 w-full shrink-0 transition-colors duration-300 ${isActive ? "bg-grade" : "bg-white/20"}`} />
                <div className="flex min-h-0 flex-1 flex-col justify-center px-5 sm:px-8 lg:mt-3 lg:block lg:px-0">
                  <Link
                    href={`/projetos/${project.slug}`}
                    aria-label={`${copy.open}: ${projectCopy.title}`}
                    className="group flex min-h-11 items-center justify-between gap-3 text-projetor focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grade lg:items-start"
                  >
                    <span className="text-xl font-semibold leading-tight transition-colors group-hover:text-grade">
                      {projectCopy.shortTitle}
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 lg:mt-1" aria-hidden="true" />
                  </Link>
                  <p className="line-clamp-2 text-pretty text-sm leading-snug text-projetor/65 lg:mt-1">{projectCopy.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
