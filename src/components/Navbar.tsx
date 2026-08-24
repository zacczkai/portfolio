"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { t } = useLanguage();

  const links = [
    { href: "#datas-comemorativas", label: t.sections.datasComemorativas },
    { href: "#carrossel", label: t.sections.carrossel },
    { href: "#videos", label: t.sections.videosEventos },
    { href: "#projetos", label: t.sections.projects },
    { href: "#contato", label: "Contato" }, // Adding a simple translation later or keeping it simple
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-md border-b border-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex items-center justify-center gap-4 md:gap-8 h-16 overflow-x-auto whitespace-nowrap scrollbar-hide text-sm font-medium">
          {links.map((link) => (
            <li key={link.href}>
              <a 
                href={link.href} 
                onClick={(e) => scrollTo(e, link.href)}
                className="text-zinc-400 hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
