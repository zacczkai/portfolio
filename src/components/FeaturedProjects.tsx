"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProjectPreview from "@/components/ProjectPreview";
import { featuredProjects } from "@/data/projects";
import { getProjectLabel, uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

export default function FeaturedProjects() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].featured;
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="trabalhos" className="scroll-mt-16 bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">{copy.label}</p>
        <h2 className="mt-4 max-w-4xl text-balance text-[clamp(3rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">{copy.title}</h2>
      </div>
      <div className="mt-16 sm:mt-24">
        {featuredProjects.map((project, index) => {
          const projectCopy = project.copy[lang];
          return (
            <article key={project.id} className="relative lg:min-h-[112svh] 2xl:min-h-[108svh]">
              <div className="px-5 py-6 sm:px-8 lg:sticky lg:top-16 lg:flex lg:h-[calc(100svh-4rem)] lg:items-center lg:justify-center lg:px-[var(--stage-gutter)] lg:py-6">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0.72, scale: 0.985 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.45 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="cinematic-stage relative overflow-hidden bg-[#11110f]"
                >
                  <ProjectPreview
                    project={project}
                    language={lang}
                    priority={index === 0}
                    width={2560}
                    sizes="(max-width: 1023px) calc(100vw - 40px), 94vw"
                    label={`${copy.open}: ${projectCopy.title}`}
                    className="aspect-video w-full lg:h-full lg:aspect-auto"
                    fit="contain"
                    backdrop
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 aspect-video bg-[linear-gradient(0deg,rgba(0,0,0,.7)_0%,rgba(0,0,0,.04)_58%,rgba(0,0,0,.18)_100%)] lg:inset-0 lg:aspect-auto lg:bg-[linear-gradient(0deg,rgba(0,0,0,.88)_0%,rgba(0,0,0,.12)_58%,rgba(0,0,0,.2)_100%)]" />
                  <div className="pointer-events-none relative z-10 grid gap-5 border border-t-0 border-white/10 bg-black p-6 sm:p-9 lg:absolute lg:inset-x-0 lg:bottom-0 lg:grid-cols-[1fr_auto] lg:items-end lg:border-0 lg:bg-transparent lg:p-12">
                    <div>
                      <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.17em] text-lime-300">
                        <span>0{index + 1}</span><span className="h-px w-8 bg-lime-300/70" />{getProjectLabel(lang, project)}
                      </p>
                      <h3 className="max-w-[12ch] text-balance text-[clamp(2.7rem,6vw,6rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">{projectCopy.shortTitle}</h3>
                      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-200 sm:text-base">{projectCopy.summary}</p>
                    </div>
                    <Link
                      href={`/projetos/${project.slug}`}
                      className="pointer-events-auto inline-flex min-h-12 w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-lime-300 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                    >
                      {copy.open}<ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
