"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].about;
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <section id="sobre" className="scroll-mt-16 bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:px-12 xl:px-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] max-h-[48rem] overflow-hidden bg-[#11110f]"
        >
          <Image src="/images/minha foto.jpeg" alt={copy.photoAlt} fill sizes="(max-width: 1023px) 100vw, 38vw" className="object-cover object-top grayscale-[15%]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.45),transparent_45%)]" />
        </motion.div>
        <div className="lg:pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-lime-300">{copy.label}</p>
          <h2 className="mt-4 max-w-[14ch] text-balance text-[clamp(2.8rem,5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-white">{copy.title}</h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">{copy.body}</p>
          <p className="mt-10 max-w-3xl border-t border-white/10 pt-6 text-sm uppercase leading-loose tracking-[0.12em] text-zinc-400">{copy.capabilities}</p>
        </div>
      </div>
    </section>
  );
}
