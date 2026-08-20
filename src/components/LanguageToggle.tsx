"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-white px-4 py-2 rounded-full hover:bg-purple-900/50 hover:border-purple-500/50 transition-all shadow-lg"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium uppercase">{lang}</span>
    </motion.button>
  );
}
