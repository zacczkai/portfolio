"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const links = useMemo<NavLink[]>(() => [
    { id: "hero", href: "#hero", label: t.sections.navHome },
    { id: "datas-comemorativas", href: "#datas-comemorativas", label: t.sections.datasComemorativas },
    { id: "carrossel", href: "#carrossel", label: t.sections.carrossel },
    { id: "videos", href: "#videos", label: t.sections.videosEventos },
    { id: "projetos", href: "#projetos", label: t.sections.projects },
    { id: "contato", href: "#contato", label: t.sections.navContato },
  ], [t]);

  useEffect(() => {
    const sectionIds = links.map((link) => link.id);
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setActiveSection("hero");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i -= 1) {
        const element = document.getElementById(sectionIds[i]);
        if (element && element.getBoundingClientRect().top <= 200) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  const scrollTo = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      event.preventDefault();
      closeDrawer();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    },
    [closeDrawer]
  );

  useEffect(() => {
    if (!isDrawerOpen) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = document.querySelectorAll<HTMLElement>("#mobile-menu button, #mobile-menu a[href]");
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [closeDrawer, isDrawerOpen]);

  const activeLabel = links.find((link) => link.id === activeSection)?.label || "";

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        aria-label={t.sections.menu}
        className="fixed left-0 right-0 top-0 z-40 border-b border-zinc-900 bg-black/75 backdrop-blur-lg"
      >
        <div className="relative mx-auto hidden h-14 max-w-6xl items-center px-4 md:flex">
          <ul className="flex w-full items-center justify-center gap-5 pr-24 text-sm font-medium lg:gap-8">
            {links.map((link) => (
              <li key={link.id} className="relative shrink-0">
                <a
                  href={link.href}
                  onClick={(event) => scrollTo(event, link.href)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    activeSection === link.id ? "text-lime-300" : "text-zinc-400 hover:text-zinc-100"
                  }`}
                >
                  {link.label}
                </a>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-lime-300"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
          <LanguageToggle className="absolute right-4 top-1.5" />
        </div>

        <div className="flex h-14 items-center justify-between gap-3 px-4 md:hidden">
          <LanguageToggle className="static shrink-0" />
          <motion.span
            key={activeLabel}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-0 flex-1 truncate text-center text-sm font-medium text-zinc-300"
          >
            {activeLabel}
          </motion.span>
          <button
            type="button"
            aria-label={isDrawerOpen ? t.sections.closeMenu : t.sections.openMenu}
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsDrawerOpen((open) => !open)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
          >
            {isDrawerOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label={t.sections.closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/70 md:hidden"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-menu-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="fixed bottom-0 right-0 top-0 z-50 flex w-[min(20rem,88vw)] flex-col border-l border-zinc-800 bg-zinc-950 md:hidden"
            >
              <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-6">
                <span id="mobile-menu-title" className="text-lg font-bold text-lime-300">{t.sections.menu}</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={t.sections.closeMenu}
                  onClick={closeDrawer}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label={t.sections.menu} className="flex-1 px-6 py-6">
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <motion.li key={link.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                      <a
                        href={link.href}
                        onClick={(event) => scrollTo(event, link.href)}
                        aria-current={activeSection === link.id ? "page" : undefined}
                        className={`block rounded-xl px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 ${
                          activeSection === link.id
                            ? "border border-lime-300/20 bg-lime-300/10 text-lime-300"
                            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <p className="border-t border-zinc-800 px-6 py-4 text-center text-xs text-zinc-600">
                Enzo Guerreiro © {new Date().getFullYear()}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
