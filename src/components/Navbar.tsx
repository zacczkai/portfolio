"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LanguageToggle from "@/components/LanguageToggle";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { lang } = useLanguage();
  const copy = uiCopy[lang].nav;
  const [activeSection, setActiveSection] = useState("trabalhos");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isHome = pathname === "/";

  const links = useMemo(
    () => [
      { id: "trabalhos", label: copy.work },
      { id: "design", label: copy.design },
      { id: "arquivo", label: copy.archive },
      { id: "sobre", label: copy.about },
      { id: "contato", label: copy.contact },
    ],
    [copy],
  );

  useEffect(() => {
    if (!isHome) return;
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -58%", threshold: [0, 0.15, 0.4] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, links]);

  const closeDrawer = useCallback(() => setIsDrawerOpen(false), []);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1120px)");
    const closeOnDesktop = () => {
      if (desktop.matches) closeDrawer();
    };
    closeOnDesktop();
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, [closeDrawer]);

  useEffect(() => {
    if (!isDrawerOpen) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDrawer();
      if (event.key !== "Tab") return;
      const focusable = document.querySelectorAll<HTMLElement>("#mobile-menu button, #mobile-menu a[href]");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
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

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        aria-label={copy.menu}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-[1920px] items-center justify-between px-5 sm:px-8 lg:px-12 xl:px-16">
          <Link href="/" className="text-base font-semibold uppercase tracking-[-0.02em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300">
            Enzo Guerreiro<span className="text-lime-300">.</span>
          </Link>
          <div className="hidden items-center gap-8 min-[1120px]:flex">
            <ul className="flex items-center gap-6 xl:gap-8">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={hrefFor(link.id)}
                    aria-current={isHome && activeSection === link.id ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center border-b text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 ${isHome && activeSection === link.id ? "border-lime-300 text-white" : "border-transparent text-zinc-300 hover:text-white"}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <LanguageToggle />
          </div>
          <div className="flex items-center gap-2 min-[1120px]:hidden">
            <LanguageToggle />
            <button
              type="button"
              aria-label={isDrawerOpen ? copy.close : copy.open}
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsDrawerOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center text-white transition-colors hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
            >
              {isDrawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.button
              type="button"
              aria-label={copy.close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 z-40 bg-black/70 min-[1120px]:hidden"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={copy.menu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(25rem,92vw)] flex-col bg-[#0b0b0a] px-6 pb-8 pt-5 min-[1120px]:hidden"
            >
              <div className="flex h-12 items-center justify-between border-b border-white/10 pb-5">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-300">{copy.menu}</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  aria-label={copy.close}
                  onClick={closeDrawer}
                  className="inline-flex h-11 w-11 items-center justify-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="flex flex-1 flex-col justify-center">
                {links.map((link, index) => (
                  <motion.li key={link.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.06 }} className="border-b border-white/10">
                    <a
                      href={hrefFor(link.id)}
                      onClick={closeDrawer}
                      className="flex min-h-20 items-center justify-between text-3xl font-medium tracking-[-0.04em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                    >
                      {link.label}
                      <span className="text-sm text-lime-300">0{index + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="text-xs uppercase tracking-[0.14em] text-zinc-400">Enzo Guerreiro © {new Date().getFullYear()}</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
