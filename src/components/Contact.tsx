"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const BehanceIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22 7h-7v2h7V7zm1.72 6.51c0-2.31-1.29-4.22-3.87-4.22-2.36 0-3.88 1.95-3.88 4.3 0 2.45 1.54 4.3 4.14 4.3 1.95 0 3.32-.93 3.8-2.58h-1.92c-.22.65-.91 1.05-1.78 1.05-1.07 0-1.83-.69-1.93-1.84h5.41c.01-.27.03-.61.03-1.01zm-3.81-1.28c.84 0 1.55.51 1.77 1.28h-3.66c.21-.76.93-1.28 1.89-1.28zM8.88 7H0v13h9.12c3.48 0 5.48-1.52 5.48-4.14 0-1.78-1.07-3.03-2.61-3.48v-.11c1.23-.39 2.05-1.52 2.05-3 0-2.3-1.63-3.6-5.16-3.6zm-1.04 7.62H3v3.74h4.74c1.33 0 2.21-.55 2.21-1.87 0-1.39-.93-1.87-2.11-1.87zm-.59-4.96H3v3.13h4.25c1.17 0 1.95-.51 1.95-1.61 0-1.12-.76-1.52-1.95-1.52z" />
  </svg>
);

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
            <LinkedinIcon className="w-6 h-6" />
          </a>
          <a href="https://behance.net/raajzkai" target="_blank" rel="noreferrer" className="p-4 bg-zinc-900 rounded-full hover:bg-purple-900/50 hover:text-purple-400 transition-all">
            <BehanceIcon className="w-6 h-6" />
          </a>
        </motion.div>

        <p className="mt-12 text-zinc-600 text-sm">
          © {new Date().getFullYear()} Enzo Guerreiro. {t.contact.rights}
        </p>
      </div>
    </footer>
  );
}
