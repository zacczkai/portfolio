"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import type { ImageAsset, Language } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";

interface ProjectCarouselProps {
  images: readonly ImageAsset[];
  language: Language;
  title: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}

export default function ProjectCarousel({
  images,
  language,
  title,
  priority = false,
  sizes = "(max-width: 1023px) 92vw, 44vw",
  className = "",
}: ProjectCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const reduceMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(0);
  const labels = uiCopy[language].case;

  const goTo = useCallback((nextIndex: number) => {
    const boundedIndex = Math.max(0, Math.min(images.length - 1, nextIndex));
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      left: boundedIndex * viewport.clientWidth,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(boundedIndex);
  }, [images.length, reduceMotion]);

  const syncActiveSlide = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport?.clientWidth) return;
    setActiveIndex(Math.max(0, Math.min(images.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth))));
  }, [images.length]);

  return (
    <section
      role="region"
      aria-label={title}
      aria-roledescription={language === "pt" ? "carrossel" : "carousel"}
      data-cursor={language === "pt" ? "ARRASTAR" : "DRAG"}
      className={`relative ${className}`}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        onScroll={syncActiveSlide}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            goTo(activeIndex - 1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            goTo(activeIndex + 1);
          }
        }}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto bg-[#11110f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#050505]"
      >
        {images.map((asset, index) => (
          <figure
            key={asset.src}
            role="group"
            aria-roledescription={labels.slide}
            aria-label={`${labels.slide} ${index + 1} ${labels.of} ${images.length}`}
            className="relative aspect-[4/5] min-w-full snap-center snap-always overflow-hidden bg-[#11110f]"
          >
            <Image
              src={asset.src}
              alt={asset.alt[language]}
              fill
              priority={priority && index === 0}
              sizes={sizes}
              className="object-contain"
            />
          </figure>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="font-mono text-xs tabular-nums text-zinc-300" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </p>
        <p className="sr-only" aria-live="polite">
          {labels.slide} {activeIndex + 1} {labels.of} {images.length}
        </p>
        <div className="flex items-center gap-1.5" aria-label={language === "pt" ? "Selecionar slide" : "Select slide"}>
          {images.map((asset, index) => (
            <button
              key={asset.src}
              type="button"
              aria-label={`${labels.slide} ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              onClick={() => goTo(index)}
              className="group grid h-11 w-6 place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
            >
              <span className={`block h-1 transition-[width,background-color] ${activeIndex === index ? "w-6 bg-lime-300" : "w-2 bg-zinc-600 group-hover:bg-zinc-300"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label={labels.previousSlide}
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
            className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors hover:border-lime-300 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label={labels.nextSlide}
            disabled={activeIndex === images.length - 1}
            onClick={() => goTo(activeIndex + 1)}
            className="grid h-11 w-11 place-items-center border border-white/20 text-white transition-colors hover:border-lime-300 hover:text-lime-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
