"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface NavLink {
  id: string;
  href: string;
  label: string;
}

export default function Navbar() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const links: NavLink[] = [
    { id: "hero", href: "#hero", label: t.sections.navHome },
    { id: "datas-comemorativas", href: "#datas-comemorativas", label: t.sections.datasComemorativas },
    { id: "carrossel", href: "#carrossel", label: t.sections.carrossel },
    { id: "videos", href: "#videos", label: t.sections.videosEventos },
    { id: "projetos", href: "#projetos", label: t.sections.projects },
    { id: "contato", href: "#contato", label: t.sections.navContato },
  ];

  // IntersectionObserver to track active section
  useEffect(() => {
    const sectionIds = ["hero", "datas-comemorativas", "carrossel", "videos", "projetos", "contato"];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.1, 0.3, 0.5], rootMargin: "-64px 0px 0px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsDrawerOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    },
    []
  );

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  const activeLabel = links.find((l) => l.id === activeSection)?.label || "";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-40 bg-black/60 backdrop-blur-lg border-b border-zinc-900"
      >
        {/* ── Desktop navbar ── */}
        <div className="hidden md:block max-w-6xl mx-auto px-4">
          <ul className="flex items-center justify-center gap-8 h-14 text-sm font-medium">
            {links.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`transition-colors duration-200 ${
                    activeSection === link.id
                      ? "text-purple-400"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {link.label}
                </a>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-purple-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Mobile navbar ── */}
        <div className="md:hidden flex items-center justify-between px-4 h-14">
          {/* Logo / initials */}
          <span className="text-purple-400 font-bold text-lg tracking-tight">EG</span>

          {/* Active section indicator */}
          <motion.span
            key={activeLabel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-zinc-300 text-sm font-medium truncate max-w-[180px] text-center"
          >
            {activeLabel}
          </motion.span>

          {/* Hamburger */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 text-zinc-400 hover:text-purple-400 transition-colors"
          >
            {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-zinc-950 border-l border-zinc-800 z-50 md:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-14 border-b border-zinc-800">
                <span className="text-purple-400 font-bold text-lg">Menu</span>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 text-zinc-400 hover:text-purple-400 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer links */}
              <nav className="flex-1 py-6 px-6">
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => scrollTo(e, link.href)}
                        className={`block py-3 px-4 rounded-xl text-base font-medium transition-all ${
                          activeSection === link.id
                            ? "text-purple-400 bg-purple-500/10 border border-purple-500/20"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Drawer footer */}
              <div className="px-6 py-4 border-t border-zinc-800">
                <p className="text-xs text-zinc-600 text-center">Enzo Guerreiro © {new Date().getFullYear()}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
