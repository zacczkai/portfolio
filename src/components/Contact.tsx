"use client";

import { ArrowUpRight } from "lucide-react";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].contact;

  return (
    <footer id="contato" className="scroll-mt-16 border-t border-white/10 bg-lime-300 text-black">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12 xl:px-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em]">{copy.label}</p>
        <h2 className="mt-5 max-w-[14ch] text-balance text-[clamp(3.2rem,7vw,6rem)] font-semibold leading-[0.88] tracking-[-0.04em]">{copy.title}</h2>
        <a
          href="mailto:enzoguerreiro05@gmail.com"
          className="mt-10 inline-flex min-h-14 items-center gap-4 border-b-2 border-black pb-2 text-lg font-semibold uppercase tracking-[0.1em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 focus-visible:ring-offset-lime-300"
        >
          {copy.cta}<ArrowUpRight className="h-5 w-5" />
        </a>
        <div className="mt-20 flex flex-col gap-6 border-t border-black/25 pt-7 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6 font-medium">
            <a className="underline-offset-4 hover:underline" href="https://www.linkedin.com/in/enzo-guerreiro-568a4b233/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="underline-offset-4 hover:underline" href="https://behance.net/raajzkai" target="_blank" rel="noreferrer">Behance</a>
            <a className="underline-offset-4 hover:underline" href="https://tiktok.com/@zacc.an" target="_blank" rel="noreferrer">TikTok</a>
          </div>
          <p>© {new Date().getFullYear()} Enzo Guerreiro. {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}
