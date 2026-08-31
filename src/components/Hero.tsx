"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { featuredProjects } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";
import ProjectPreview from "@/components/ProjectPreview";

export default function Hero() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].hero;
  const reduceMotion = Boolean(useReducedMotion());
  const heroProject = featuredProjects[0];

  return (
    <section id="hero" className="relative min-h-svh overflow-hidden bg-black">
      <div className="absolute inset-x-0 top-16 aspect-video lg:inset-0 lg:aspect-auto">
        <ProjectPreview
          project={heroProject}
          language={lang}
          priority
          width={2560}
          sizes="100vw"
          label={`${uiCopy[lang].featured.open}: ${heroProject.copy[lang].title}`}
          className="h-full w-full"
          fit="contain"
          backdrop
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,rgba(5,5,5,.9)_24%,rgba(5,5,5,.28)_64%,rgba(5,5,5,.12)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#050505_0%,transparent_42%,rgba(5,5,5,.22)_100%)]" />

      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.18 } } }}
        className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1600px] flex-col justify-end px-5 pb-12 pt-28 sm:px-8 lg:justify-center lg:px-12 lg:pb-20 xl:px-16"
      >
        <motion.p
          variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          className="mb-5 max-w-xl text-xs font-semibold uppercase tracking-[0.2em] text-lime-300 sm:text-sm"
        >
          {copy.eyebrow}
        </motion.p>
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 38 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
          className="max-w-[11ch] text-balance text-[clamp(3.25rem,7vw,6rem)] font-semibold leading-[0.86] tracking-[-0.04em] text-white"
        >
          {copy.title}
        </motion.h1>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
          className="mt-8 flex max-w-3xl flex-col gap-7 lg:mt-10"
        >
          <p className="max-w-md text-pretty text-base leading-relaxed text-zinc-200 sm:text-lg">{copy.description}</p>
          <div className="flex flex-wrap gap-6">
            <a
              href="#trabalhos"
              className="inline-flex min-h-12 w-fit items-center gap-3 border-b border-lime-300 pb-2 text-sm font-semibold uppercase tracking-[0.1em] text-lime-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              {copy.workCta}
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#design"
              className="inline-flex min-h-12 w-fit items-center gap-3 border-b border-white/60 pb-2 text-sm font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:border-lime-300 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
            >
              {copy.designCta}
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8, delay: 0.2 } } }}
          className="mt-12 flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-zinc-300 lg:absolute lg:bottom-8 lg:right-12 lg:mt-0 xl:right-16"
        >
          <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(215,255,79,.75)]" />
          {copy.availability}
        </motion.div>
      </motion.div>
    </section>
  );
}
