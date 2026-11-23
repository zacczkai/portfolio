"use client";

import { ArrowUpRight } from "lucide-react";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

const EMAIL = "enzoguerreiro05@gmail.com";
const SOCIAL_LINK = "inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-projetor";

export default function Contact() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].contact;

  return (
    <footer id="contato" className="scroll-mt-16 border-t border-white/15 bg-sala text-projetor">
      <div className="mx-auto max-w-[1600px] px-5 pb-6 pt-20 sm:px-8 sm:pt-28 lg:px-12 xl:px-16">
        <h2 className="type-display max-w-[16ch] text-balance text-[length:clamp(3.25rem,min(11vw,20svh),13rem)]">{copy.title}</h2>
        <a
          href={`mailto:${EMAIL}`}
          className="group mt-10 inline-flex min-h-14 flex-wrap items-center gap-x-4 gap-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-projetor"
        >
          <span className="inline-flex items-center gap-2 text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold underline decoration-2 underline-offset-8">
            {copy.cta}<ArrowUpRight className="h-6 w-6 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
          <span className="break-all text-base text-penumbra sm:text-lg">{EMAIL}</span>
        </a>
        <div className="mt-20 flex flex-col gap-2 border-t border-white/15 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6 font-medium">
            <a className={SOCIAL_LINK} href="https://www.linkedin.com/in/enzo-guerreiro-568a4b233/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className={SOCIAL_LINK} href="https://behance.net/raajzkai" target="_blank" rel="noreferrer">Behance</a>
            <a className={SOCIAL_LINK} href="https://tiktok.com/@zacc.an" target="_blank" rel="noreferrer">TikTok</a>
          </div>
          <p className="text-penumbra">© {new Date().getFullYear()} Enzo Guerreiro. {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
}
