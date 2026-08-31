"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Layers3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ProjectCarousel from "@/components/ProjectCarousel";
import { designProjects } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

export default function DesignShowcase() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].design;
  const reduceMotion = Boolean(useReducedMotion());
  const carousels = designProjects.filter((project) => project.media.kind === "gallery");
  const staticPosts = designProjects.filter((project) => project.media.kind === "image");

  return (
    <section id="design" className="scroll-mt-16 bg-[#050505] text-white">
      <div className="bg-lime-300 text-black">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.3fr_.7fr] lg:items-end lg:px-12 xl:px-16">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.12em]">{copy.label}</p>
            <h2 className="mt-5 max-w-[12ch] text-balance text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[0.88] tracking-[-0.04em]">
              {copy.title}
            </h2>
          </div>
          <p className="max-w-xl text-pretty text-lg leading-relaxed lg:justify-self-end lg:pb-2">{copy.description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 xl:px-16">
        <div>
          {carousels.map((project, index) => {
            if (project.media.kind !== "gallery") return null;
            const projectCopy = project.copy[lang];
            const reverse = index % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={reduceMotion ? false : { opacity: 0.72, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-10 border-t border-white/15 py-16 sm:py-24 lg:grid-cols-2 lg:items-start lg:gap-20"
              >
                <div className={reverse ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 text-lime-300">
                    <Layers3 className="h-4 w-4" />
                    <span className="font-mono text-xs uppercase tracking-[0.12em]">{copy.carouselLabel} · {project.media.images.length} {copy.slideUnit}</span>
                  </div>
                  <h3 className="mt-6 max-w-[13ch] text-balance text-[clamp(2.5rem,4.5vw,5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
                    {projectCopy.shortTitle}
                  </h3>
                  <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-zinc-300">{projectCopy.summary}</p>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="mt-8 inline-flex min-h-12 items-center gap-3 border-b border-white/50 pb-2 text-sm font-semibold uppercase tracking-[0.1em] transition-colors hover:border-lime-300 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                  >
                    {copy.open}<ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <ProjectCarousel
                  images={project.media.images}
                  language={lang}
                  title={projectCopy.title}
                  priority={index === 0}
                  sizes="(max-width: 1023px) calc(100vw - 40px), 42vw"
                  className={`mx-auto w-full max-w-[38rem] ${reverse ? "lg:order-1" : ""}`}
                />
              </motion.article>
            );
          })}
        </div>

        <div className="border-t border-white/15 pt-16 sm:pt-24">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h3 className="max-w-[10ch] text-balance text-[clamp(2.75rem,5vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.04em]">
              {lang === "pt" ? "Peças estáticas, presença imediata." : "Static work, immediate presence."}
            </h3>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-400">{copy.staticLabel}</p>
          </div>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {staticPosts.map((project, index) => {
              if (project.media.kind !== "image") return null;
              return (
                <motion.article
                  key={project.id}
                  initial={reduceMotion ? false : { opacity: 0.72, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6, delay: reduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={index === 1 ? "lg:mt-24" : ""}
                >
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#11110f]">
                      <Image
                        src={project.media.image.src}
                        alt={project.media.image.alt[lang]}
                        fill
                        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 46vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="mt-5 flex items-start justify-between gap-5">
                      <div>
                        <h4 className="text-2xl font-medium leading-tight tracking-[-0.025em] transition-colors group-hover:text-lime-300">{project.copy[lang].shortTitle}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">{project.copy[lang].summary}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-zinc-500 transition-colors group-hover:text-lime-300" />
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
