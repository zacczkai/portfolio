"use client";

import { motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useCallback, useRef, useState, type CSSProperties } from "react";
import ReelTake from "@/components/reel/ReelTake";
import ReelTimeline from "@/components/reel/ReelTimeline";
import { useLanguage } from "@/context/LanguageContext";
import { reelProjects } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";
import { useStaticMedia } from "@/hooks/useStaticMedia";
import { getActiveTake, getTakeScrollProgress } from "@/lib/reel";

export default function CinemaReel() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].reel;
  const sectionRef = useRef<HTMLElement>(null);
  const isStatic = useStaticMedia();
  const isInView = useInView(sectionRef, { margin: "-40% 0px 0px 0px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const time = useMotionValue(reelProjects[0].media.preview.start);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const position = useTransform(scrollYProgress, [0, 1], [0, reelProjects.length]);
  const openingOpacity = useTransform(position, [0.06, 0.3], [1, 0]);
  const openingY = useTransform(position, [0.06, 0.3], ["0%", "-5%"]);

  useMotionValueEvent(position, "change", (value) => {
    setActiveIndex(getActiveTake(value, reelProjects.length));
  });

  const goToTake = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * getTakeScrollProgress(index, reelProjects.length), behavior: "smooth" });
  }, []);

  const style = {
    "--reel-takes": reelProjects.length,
    "--grade": reelProjects[activeIndex].grade,
  } as CSSProperties;

  return (
    <section ref={sectionRef} id="trabalhos" data-static={isStatic || undefined} style={style} className="reel relative bg-sala">
      <div className="reel-stage sticky top-0 h-svh overflow-hidden">
        <motion.div
          className="reel-opening pointer-events-none absolute inset-x-0 top-0 bottom-[var(--reel-console)] z-30 flex flex-col justify-end overflow-hidden px-5 pb-4 sm:px-8 lg:px-12 xl:px-16"
          style={{ opacity: openingOpacity, y: openingY }}
        >
          <div className="reel-card [text-shadow:0_2px_24px_rgba(0,0,0,.6)]">
            <div className="mb-3 flex items-end justify-between gap-6 lg:mb-5">
              <p className="max-w-[24ch] text-balance text-xl font-medium leading-tight text-projetor sm:text-2xl lg:text-3xl">{uiCopy[lang].hero.title}</p>
              <p className="hidden shrink-0 text-base text-projetor/80 sm:block">{copy.role}</p>
            </div>
            <h1 className="reel-name text-[25.6vw] font-bold uppercase leading-[0.8] text-projetor [font-stretch:75%] sm:whitespace-nowrap sm:text-[length:min(17.2vw,42svh)]">
              Enzo <br className="sm:hidden" />Guerreiro
            </h1>
          </div>
        </motion.div>

        {reelProjects.map((project, index) => (
          <ReelTake
            key={project.id}
            project={project}
            index={index}
            isLast={index === reelProjects.length - 1}
            language={lang}
            isActive={index === activeIndex}
            isPlaying={isInView && index === activeIndex}
            isStatic={isStatic}
            position={position}
            time={time}
            viewLabel={copy.view}
          />
        ))}

        <ReelTimeline
          takes={reelProjects}
          language={lang}
          activeIndex={activeIndex}
          position={position}
          time={time}
          label={copy.timeline}
          goToLabel={copy.goTo}
          ofLabel={uiCopy[lang].case.of}
          onSelect={goToTake}
        />
      </div>
    </section>
  );
}
