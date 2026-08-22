"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

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
  "FL Studio", "Motion Graphics", "Color Grading",
  "Sound Design", "Branding",
];

export default function Hero() {
  const { t } = useLanguage();

  const tags = [...universalTags, t.tags.artDirection];

  return (
    <section className="relative min-h-[90vh] flex items-center px-4 py-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-purple-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-5xl mx-auto w-full grid md:grid-cols-[1.2fr_1fr] gap-12 items-center"
      >
        {/* Left: Text */}
        <div>
          <motion.p variants={fadeUp} className="text-purple-400 font-mono text-sm tracking-widest uppercase mb-4">
            {t.hero.subtitle}
          </motion.p>

          <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
            {t.hero.line1}{" "}
            <span className="text-purple-500">{t.hero.line2}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
            {t.hero.description}
          </motion.p>

          {/* Tags */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 hover:border-purple-500/50 hover:text-purple-300 transition-colors"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right: Photo placeholder */}
        <motion.div
          variants={fadeUp}
          className="relative h-[420px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 group hidden md:flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
          <p className="text-zinc-500 font-mono text-sm z-10">{t.hero.photoAlt}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
