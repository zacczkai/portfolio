"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onClick={toggleLanguage}
      type="button"
      aria-label={lang === "pt" ? "Mudar idioma para inglês" : "Switch language to Portuguese"}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3 py-2 text-white transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grade focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">{lang}</span>
    </motion.button>
  );
}
