"use client";

import { motion } from "framer-motion";
import { Mail, Globe, Link as LinkIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <footer id="contato" className="py-24 px-4 border-t border-zinc-900 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-900 to-transparent opacity-50" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold mb-8"
        >
          {t.contact.title1} <span className="text-purple-500">{t.contact.title2}</span>
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6"
        >
          <a href="mailto:enzoguerreiro05@gmail.com" className="p-4 bg-zinc-900 rounded-full hover:bg-purple-900/50 hover:text-purple-400 transition-all">
            <Mail className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/in/enzo-guerreiro-568a4b233/" target="_blank" rel="noreferrer" className="p-4 bg-zinc-900 rounded-full hover:bg-purple-900/50 hover:text-purple-400 transition-all">
            <LinkIcon className="w-6 h-6" />
          </a>
          <a href="https://behance.net/raajzkai" target="_blank" rel="noreferrer" className="p-4 bg-zinc-900 rounded-full hover:bg-purple-900/50 hover:text-purple-400 transition-all">
            <Globe className="w-6 h-6" />
          </a>
        </motion.div>

        <p className="mt-12 text-zinc-600 text-sm">
          © {new Date().getFullYear()} Enzo Guerreiro. {t.contact.rights}
        </p>
      </div>
    </footer>
  );
}
