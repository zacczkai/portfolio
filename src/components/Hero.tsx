"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/30 rounded-full blur-[100px] -z-10" />

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6"
      >
        <span className="block">{t.hero.line1}</span>
        <span className="block text-purple-500">{t.hero.line2}</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
      >
        {t.hero.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-12 animate-bounce"
      >
        <ArrowDown className="text-purple-500 w-8 h-8" />
      </motion.div>
    </section>
  );
}
