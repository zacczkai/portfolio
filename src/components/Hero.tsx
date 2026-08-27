"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
} as const;

const universalTags = [
  "After Effects", "Photoshop", "Premiere Pro",
  "Motion Graphics", "Color Grading",
  "Sound Design", "Branding",
];

export default function Hero() {
  const { t } = useLanguage();

  const tags = [...universalTags, t.tags.artDirection];

  return (
    <section className="relative min-h-[90vh] flex items-center px-4 py-24 overflow-hidden">

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto w-full grid md:grid-cols-[1.2fr_1fr] gap-12 items-center"
      >
        {/* Left: Text */}
        <div>
          <motion.p variants={fadeUp} className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">
            {t.hero.subtitle}
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            {t.hero.line1}{" "}
            <span className="text-lime-300">{t.hero.line2}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
            {t.hero.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mb-9 flex flex-wrap gap-3">
            <a
              href="#projetos"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-lime-300 px-5 py-2.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5 hover:bg-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.hero.workCta}
            </a>
            <a
              href="#contato"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-lime-300/70 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              {t.hero.contactCta}
            </a>
          </motion.div>

          {/* Tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-lime-300/50 hover:text-lime-200"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo placeholder */}
        <motion.div
          variants={fadeUp}
          className="relative h-[300px] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 group md:h-[480px] flex items-center justify-center"
        >
          <Image
            src="/images/minha foto.jpeg" 
            alt={t.hero.photoAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-lime-300/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute bottom-5 left-5 right-5 rounded-lg border border-white/15 bg-black/60 px-4 py-3 backdrop-blur-sm">
            <p className="text-sm font-semibold text-white">Enzo Guerreiro</p>
            <p className="mt-1 text-xs text-zinc-300">{t.hero.photoCaption}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
