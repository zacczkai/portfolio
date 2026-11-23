"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { ImageAsset, Language } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";
import { useStaticMedia } from "@/hooks/useStaticMedia";

const STRIP_GUTTER = "[--strip-gutter:1.25rem] sm:[--strip-gutter:2rem] lg:[--strip-gutter:3rem] xl:[--strip-gutter:4rem]";
const CONTROL_BUTTON = "grid h-11 w-11 place-items-center border border-current/30 transition-colors hover:border-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-current/30";

interface ProjectCarouselProps {
  images: readonly ImageAsset[];
  language: Language;
  title: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  variant?: "single" | "strip";
}

function getSlideStep(viewport: HTMLDivElement) {
  return (viewport.firstElementChild as HTMLElement | null)?.offsetWidth || viewport.clientWidth;
}

export default function ProjectCarousel({
  images,
  language,
  title,
  priority = false,
  sizes = "(max-width: 1023px) 92vw, 44vw",
  className = "",
  variant = "single",
}: ProjectCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ pointerId: number; startX: number; startLeft: number; moved: boolean } | null>(null);
  const restoreSnapRef = useRef<(() => void) | null>(null);
  const reduceMotion = useStaticMedia();
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScroll, setCanScroll] = useState(true);
  const labels = uiCopy[language].case;
  const isStrip = variant === "strip";

  const goTo = useCallback((nextIndex: number) => {
    const boundedIndex = Math.max(0, Math.min(images.length - 1, nextIndex));
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.scrollTo({
      left: boundedIndex * getSlideStep(viewport),
      behavior: reduceMotion ? "auto" : "smooth",
    });
    setActiveIndex(boundedIndex);
  }, [images.length, reduceMotion]);

  const move = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    goTo(Math.round(viewport.scrollLeft / getSlideStep(viewport)) + direction);
  }, [goTo]);

  const syncActiveSlide = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport?.clientWidth) return;
    const isAtEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 2;
    const index = isAtEnd && viewport.scrollLeft > 0
      ? images.length - 1
      : Math.round(viewport.scrollLeft / getSlideStep(viewport));
    setActiveIndex(Math.max(0, Math.min(images.length - 1, index)));
  }, [images.length]);

  const startDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (event.pointerType !== "mouse" || event.button !== 0 || !viewport) return;
    if (viewport.scrollWidth <= viewport.clientWidth + 2) return;
    restoreSnapRef.current?.();
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX, startLeft: viewport.scrollLeft, moved: false };
  }, []);

  const moveDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || !viewport || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    if (!drag.moved) {
      if (Math.abs(delta) < 4) return;
      drag.moved = true;
      viewport.setPointerCapture(event.pointerId);
      viewport.style.scrollSnapType = "none";
      viewport.style.cursor = "grabbing";
    }
    viewport.scrollLeft = drag.startLeft - delta;
  }, []);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const viewport = viewportRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    dragRef.current = null;
    if (!drag.moved || !viewport) return;

    viewport.style.cursor = "";
    const step = getSlideStep(viewport);
    const delta = event.clientX - drag.startX;
    const position = viewport.scrollLeft / step;
    const target = Math.abs(delta) < step * 0.12
      ? Math.round(drag.startLeft / step)
      : delta < 0 ? Math.ceil(position) : Math.floor(position);

    let timer = 0;
    const restoreSnap = () => {
      window.clearTimeout(timer);
      viewport.removeEventListener("scrollend", restoreSnap);
      viewport.style.scrollSnapType = "";
      restoreSnapRef.current = null;
    };
    restoreSnapRef.current = restoreSnap;
    viewport.addEventListener("scrollend", restoreSnap);
    timer = window.setTimeout(restoreSnap, 700);
    goTo(target);
  }, [goTo]);

  useEffect(() => () => restoreSnapRef.current?.(), []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure =() => setCanScroll(viewport.scrollWidth > viewport.clientWidth + 2);
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      role="region"
      aria-label={title}
      aria-roledescription={language === "pt" ? "carrossel" : "carousel"}
      className={`relative ${isStrip ? STRIP_GUTTER : ""} ${className}`}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        onScroll={syncActiveSlide}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            move(-1);
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            move(1);
          }
        }}
        className={`scrollbar-none flex snap-x snap-mandatory overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-current ${canScroll ? "cursor-grab select-none" : ""} ${isStrip ? "scroll-px-[var(--strip-gutter)] px-[var(--strip-gutter)]" : ""}`}
      >
        {images.map((asset, index) => (
          <figure
            key={asset.src}
            role="group"
            aria-roledescription={labels.slide}
            aria-label={`${labels.slide} ${index + 1} ${labels.of} ${images.length}`}
            className={`relative m-0 aspect-[4/5] overflow-hidden snap-always ${isStrip ? "w-[min(82vw,calc(72svh*0.8),38rem)] shrink-0 snap-start" : "min-w-full snap-center"}`}
          >
            <Image
              src={asset.src}
              alt={asset.alt[language]}
              fill
              priority={priority && index === 0}
              sizes={sizes}
              draggable={false}
              className="object-contain"
            />
          </figure>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {labels.slide} {activeIndex + 1} {labels.of} {images.length}
      </p>
      {canScroll && (
        <div className={`mt-4 flex items-center justify-between gap-4 ${isStrip ? "px-[var(--strip-gutter)]" : ""}`}>
          <p className="text-sm tabular-nums" aria-hidden="true">
            {activeIndex + 1} {labels.of} {images.length}
          </p>
          {!isStrip && (
            <div className="flex items-center gap-1.5" aria-label={language === "pt" ? "Selecionar slide" : "Select slide"}>
              {images.map((asset, index) => (
                <button
                  key={asset.src}
                  type="button"
                  aria-label={`${labels.slide} ${index + 1}`}
                  aria-current={activeIndex === index ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className="group grid h-11 w-6 place-items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
                >
                  <span className={`block h-1 bg-current transition-[width,opacity] ${activeIndex === index ? "w-6" : "w-2 opacity-35 group-hover:opacity-70"}`} />
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <button type="button" aria-label={labels.previousSlide} disabled={activeIndex === 0} onClick={() => move(-1)} className={CONTROL_BUTTON}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" aria-label={labels.nextSlide} disabled={activeIndex === images.length - 1} onClick={() => move(1)} className={CONTROL_BUTTON}>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
