"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t.about.title1} <span className="text-purple-500">{t.about.title2}</span>
          </h2>
          <p className="text-gray-400 text-lg mb-4">
            {t.about.p1}
          </p>
          <p className="text-gray-400 text-lg">
            {t.about.p2}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative h-96 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 flex items-center justify-center group"
        >
          {/* Placeholder for a photo */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
          <p className="text-zinc-500 font-mono text-sm z-10">[ Espaço para sua foto ]</p>
        </motion.div>
      </div>
    </section>
  );
}
