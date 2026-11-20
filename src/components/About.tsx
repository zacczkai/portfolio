"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Briefcase, Download, GraduationCap, Sparkles } from "lucide-react";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

type TabKey = "bio" | "experience" | "skills";

export default function About() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].about;
  const reduceMotion = Boolean(useReducedMotion());
  const [activeTab, setActiveTab] = useState<TabKey>("bio");

  return (
    <section id="sobre" className="scroll-mt-16 bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start lg:px-12 xl:px-16">
        {/* Left Column: Portrait */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] max-h-[44rem] w-full overflow-hidden bg-[#11110f]"
        >
          <Image
            src="/images/minha foto.jpeg"
            alt={copy.photoAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 36vw"
            className="object-cover object-top grayscale-[15%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.65)_0%,transparent_50%)]" />

          {/* Quick badge on photo bottom */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3.5 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime-400" />
              </span>
              <span className="text-xs font-medium text-zinc-200">
                {copy.location ?? "Brasília, DF"}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio, Tabs, Content */}
        <div className="flex flex-col">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">{copy.label}</p>
          <h2 className="mt-4 text-balance text-[clamp(2.5rem,4.5vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white">
            {copy.title}
          </h2>

          {/* Minimalist Tabs Navigation */}
          <div
            role="tablist"
            aria-label={copy.label}
            className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-3"
          >
            {(["bio", "experience", "skills"] as const).map((tab) => {
              const isActive = activeTab === tab;
              const tabLabel = copy.tabs ? copy.tabs[tab] : tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${tab}`}
                  id={`tab-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`relative inline-flex min-h-11 items-center px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 ${
                    isActive
                      ? "text-lime-300"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {tabLabel}
                  {isActive && (
                    <motion.span
                      layoutId="activeAboutTabIndicator"
                      className="absolute inset-x-0 -bottom-3 h-0.5 bg-lime-300"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Panels */}
          <div className="mt-8 min-h-[18rem]">
            <AnimatePresence mode="wait">
              {activeTab === "bio" && (
                <motion.div
                  key="bio"
                  id="tab-panel-bio"
                  role="tabpanel"
                  aria-labelledby="tab-bio"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <p className="max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">
                    {copy.body}
                  </p>
                  <div className="border-t border-white/10 pt-6">
                    <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">
                      {lang === "pt" ? "Especialidades centrais" : "Core capabilities"}
                    </p>
                    <p className="mt-3 text-sm uppercase leading-loose tracking-[0.12em] text-zinc-300">
                      {copy.capabilities}
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  id="tab-panel-experience"
                  role="tabpanel"
                  aria-labelledby="tab-experience"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  {/* Professional Experience */}
                  <div>
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">
                      <Briefcase className="h-3.5 w-3.5" />
                      {copy.experienceLabel ?? (lang === "pt" ? "Experiência Profissional" : "Professional Experience")}
                    </h3>
                    <div className="mt-4 divide-y divide-white/10 border-t border-white/10">
                      {copy.experiences?.map((exp, i) => (
                        <div key={i} className="py-4 first:pt-3">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                            <h4 className="text-base font-semibold text-white">
                              {exp.company}{" "}
                              <span className="font-normal text-zinc-400">· {exp.role}</span>
                            </h4>
                            <span className="font-mono text-xs text-lime-300/90 tabular-nums">
                              {exp.period}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Academic Background */}
                  <div className="border-t border-white/10 pt-6">
                    <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-lime-300">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {copy.educationLabel ?? (lang === "pt" ? "Formação Acadêmica" : "Academic Background")}
                    </h3>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {copy.education?.map((edu, i) => (
                        <div
                          key={i}
                          className="border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20"
                        >
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-lime-300">
                            {edu.institution}
                          </span>
                          <h4 className="mt-1 text-sm font-semibold text-white">{edu.course}</h4>
                          <p className="mt-1 text-xs text-zinc-400">{edu.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  id="tab-panel-skills"
                  role="tabpanel"
                  aria-labelledby="tab-skills"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {copy.skills?.map((skill, i) => (
                      <div
                        key={i}
                        className="border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-lime-300/40"
                      >
                        <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-lime-300">
                          <Sparkles className="h-3 w-3" />
                          {skill.category}
                        </h4>
                        <p className="mt-2.5 text-sm leading-relaxed text-zinc-300">
                          {skill.items}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Action: Download CV in PDF */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <a
              href="/curriculo-enzo-guerreiro.pdf"
              download="Curriculo-Enzo-Guerreiro.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-3 border border-white/20 bg-white/[0.03] px-6 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all hover:border-lime-300 hover:bg-lime-300 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
            >
              <Download className="h-4 w-4" />
              {copy.downloadCv ?? (lang === "pt" ? "Baixar Currículo (PDF)" : "Download Resume (PDF)")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
