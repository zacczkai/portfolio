"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

export interface Project {
  id: string;
  title: string;
  image?: string;
  images?: string[];
  description?: React.ReactNode | string;
  videoUrl?: string;
  isVertical?: boolean;
}

interface PortfolioSectionProps {
  title: string;
  description?: React.ReactNode | string;
  projects: Project[];
}

/* ── YouTube thumbnail with fallback cascade ── */
function YTThumbnail({
  videoId,
  alt,
  className,
}: {
  videoId: string;
  alt: string;
  className?: string;
}) {
  const fallbacks = [
    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    `https://img.youtube.com/vi/${videoId}/0.jpg`,
  ];
  const [srcIndex, setSrcIndex] = useState(0);

  return (
    <Image
      src={fallbacks[srcIndex]}
      alt={alt}
      fill
      sizes="(max-width: 768px) 286px, 320px"
      className={className}
      onLoad={(e) => {
        if ((e.target as HTMLImageElement).naturalWidth === 120 && srcIndex < fallbacks.length - 1) {
          setSrcIndex((i) => i + 1);
        }
      }}
      onError={() => {
        if (srcIndex < fallbacks.length - 1) {
          setSrcIndex((i) => i + 1);
        }
      }}
    />
  );
}

/* ── Instagram-style image slider inside modal ── */
function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = window.requestAnimationFrame(onSelect);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      window.cancelAnimationFrame(frame);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full bg-zinc-950 flex flex-col">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 flex items-center justify-center bg-zinc-950">
              <Image
                src={src}
                alt={`${title} — ${t.sections.slide} ${i + 1}`}
                width={1080}
                height={1350}
                sizes="(max-width: 768px) 100vw, 512px"
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {canScrollPrev && (
        <button
          type="button"
          aria-label={t.sections.previousSlide}
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-lime-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollNext && (
        <button
          type="button"
          aria-label={t.sections.nextSlide}
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-lime-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center justify-center gap-1.5 py-3">
          {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`${t.sections.slide} ${i + 1}`}
            aria-current={i === selectedIndex ? "true" : undefined}
            onClick={() => emblaApi?.scrollTo(i)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
          >
            <span className={`rounded-full transition-all duration-300 ${i === selectedIndex ? "h-2.5 w-2.5 bg-lime-300" : "h-1.5 w-1.5 bg-zinc-600"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Scroll progress hook ── */
function useScrollProgress(emblaApi: ReturnType<typeof useEmblaCarousel>[1]) {
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const frame = window.requestAnimationFrame(onScroll);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  return progress;
}

function ProjectDescription({ description, projectId }: { description?: React.ReactNode | string; projectId: string }) {
  if (typeof description !== "string") {
    return <div id={`project-${projectId}-description`} className="space-y-3 text-sm leading-relaxed text-zinc-300">{description}</div>;
  }

  return (
    <div id={`project-${projectId}-description`} className="space-y-3 text-sm leading-relaxed text-zinc-300">
      {description.split(/\n\n+/).map((paragraph, index) => <p key={`${projectId}-${index}`}>{paragraph}</p>)}
    </div>
  );
}

/* ── Shared card renderer ── */
function ProjectCard({
  project,
  index,
  onClick,
  getThumbnail,
  getYouTubeId,
  clickLabel,
}: {
  project: Project;
  index: number;
  onClick: () => void;
  getThumbnail: (p: Project) => string;
  getYouTubeId: (url?: string) => string | null;
  clickLabel: string;
}) {
  const ytId = getYouTubeId(project.videoUrl);
  const thumb = getThumbnail(project);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 15 } }}
      className="group relative h-96 w-72 flex-shrink-0 select-none overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 md:w-80"
    >
      <div className="absolute inset-0 bg-zinc-800">
        {ytId ? (
          <YTThumbnail videoId={ytId} alt={project.title} className="object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : thumb ? (
          <Image
            src={thumb}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 286px, 320px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-all duration-500 group-hover:via-lime-300/10" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="mb-1 text-xl font-bold text-white transition-colors duration-300 group-hover:text-lime-300">
          {project.title}
        </h3>
        <p className="translate-y-0 text-xs text-zinc-300 transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          {clickLabel}
        </p>
      </div>

      {project.images && project.images.length > 1 && (
        <div className="absolute right-4 top-4 rounded-full border border-zinc-700 bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
          {project.images.length} slides
        </div>
      )}
      <button
        type="button"
        aria-label={`${project.title}. ${clickLabel}`}
        onClick={onClick}
        className="absolute inset-0 z-10 cursor-pointer rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 focus-visible:ring-inset"
      />
    </motion.article>
  );
}

/* ── Main component ── */
export default function PortfolioSection({ title, description, projects }: PortfolioSectionProps) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });
  const [isScrollable, setIsScrollable] = useState(true);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousModalFocusRef = useRef<HTMLElement | null>(null);

  const scrollProgress = useScrollProgress(emblaApi);
  const selectedProject = projects.find((p) => p.id === selectedId);

  // Check if embla can scroll and update arrow state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const canScroll = emblaApi.canScrollNext() || emblaApi.canScrollPrev();
    const frame = window.requestAnimationFrame(() => {
      setIsScrollable(canScroll);
      onSelect();
    });
    emblaApi.on("select", onSelect);
    const handleReInit = () => {
      const cs = emblaApi.canScrollNext() || emblaApi.canScrollPrev();
      setIsScrollable(cs);
      onSelect();
    };
    emblaApi.on("reInit", handleReInit);
    return () => {
      window.cancelAnimationFrame(frame);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", handleReInit);
    };
  }, [emblaApi, onSelect]);

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const shortsMatch = url.match(/youtube\.com\/shorts\/([^?&]+)/);
    if (shortsMatch) return shortsMatch[1];
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]{11})/
    );
    return match ? match[1] : null;
  };

  const isCloudinaryVideo = (url?: string) => {
    return url ? url.includes("cloudinary.com/") && url.includes("/video/") : false;
  };

  const getThumbnail = (project: Project) => {
    if (project.image) return project.image;
    if (project.images?.[0]) return project.images[0];
    if (isCloudinaryVideo(project.videoUrl)) {
      return project.videoUrl!
        .replace(/\.(mp4|ts|webm)$/, '.jpg')
        .replace('f_mp4', 'f_auto');
    }
    return "";
  };

  const selectedVideoId = getYouTubeId(selectedProject?.videoUrl);
  const isCloudinary = isCloudinaryVideo(selectedProject?.videoUrl);
  const isSingleImage = selectedProject && !selectedVideoId && !isCloudinary && !selectedProject.images?.length;

  useEffect(() => {
    if (!selectedId) return;

    previousModalFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => modalRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedId(null);
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>("button, a[href], iframe, video[controls]");
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
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousModalFocusRef.current?.focus();
    };
  }, [selectedId]);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className={`mb-8 ${!isScrollable ? "text-center" : ""}`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {description && (
          <div className={`text-gray-400 text-lg leading-relaxed ${!isScrollable ? "max-w-3xl mx-auto" : ""}`}>{description}</div>
        )}
      </motion.div>

      {/* ── Cards layout ── */}
      {isScrollable ? (
        /* Scrollable: Embla carousel with desktop arrows */
        <div className="relative group/carousel">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedId(project.id)}
                  getThumbnail={getThumbnail}
                  getYouTubeId={getYouTubeId}
                  clickLabel={t.sections.viewProcess}
                />
              ))}
            </div>
          </div>

          {/* Desktop navigation arrows */}
          {canScrollPrev && (
            <button
              onClick={() => emblaApi?.scrollPrev()}
              aria-label={t.sections.previousSlide}
              type="button"
              className="hidden md:flex absolute left-0 top-1/2 z-10 h-11 w-11 -translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-lime-300/15 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 group-hover/carousel:translate-x-0 group-hover/carousel:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollNext && (
            <button
              onClick={() => emblaApi?.scrollNext()}
              aria-label={t.sections.nextSlide}
              type="button"
              className="hidden md:flex absolute right-0 top-1/2 z-10 h-11 w-11 translate-x-2 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-lime-300/15 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300 group-hover/carousel:translate-x-0 group-hover/carousel:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 h-[2px] bg-zinc-800 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full rounded-full bg-lime-300"
              style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
            />
          </motion.div>
        </div>
      ) : (
        /* Not scrollable: centered flex layout */
        <div className="flex flex-wrap justify-center gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedId(project.id)}
              getThumbnail={getThumbnail}
              getYouTubeId={getYouTubeId}
              clickLabel={t.sections.viewProcess}
            />
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.button
              type="button"
              tabIndex={-1}
              aria-label={t.sections.close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-50 cursor-pointer bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`project-${selectedProject.id}-title`}
                aria-describedby={`project-${selectedProject.id}-description`}
                tabIndex={-1}
                    className={`relative pointer-events-auto flex max-h-[90vh] overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-lg ${
                  selectedProject.isVertical
                    ? "w-full max-w-5xl max-h-[90vh] flex flex-col md:flex-row"
                    : selectedProject.images?.length
                    ? "w-full max-w-lg max-h-[90vh] flex flex-col"
                    : isSingleImage
                    ? "w-full max-w-lg max-h-[90vh] flex flex-col"
                    : "w-full max-w-3xl max-h-[90vh] flex flex-col"
                }`}
              >
                <button
                  type="button"
                  aria-label={t.sections.close}
                  onClick={() => setSelectedId(null)}
                  className="absolute right-4 top-4 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-lime-300/20 hover:text-lime-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-300"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* ── VERTICAL VIDEO: side-by-side ── */}
                {selectedProject.isVertical ? (
                  <>
                    <div className="md:w-1/2 min-h-[300px] bg-black flex items-center justify-center py-4">
                      {selectedVideoId ? (
                        <iframe
                          title={selectedProject.title}
                          src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&loop=1&playlist=${selectedVideoId}&controls=0`}
                          className="h-full w-auto aspect-[9/16] rounded-md"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : isCloudinary ? (
                        <video 
                          src={selectedProject.videoUrl} 
                          autoPlay 
                          loop 
                          muted 
                          playsInline 
                          controls
                          preload="metadata"
                          poster={getThumbnail(selectedProject)}
                          className="h-full w-auto aspect-[9/16] rounded-md object-contain max-h-[80vh]"
                        />
                      ) : null}
                    </div>
                    <div className="p-8 md:w-1/2 flex flex-col overflow-y-auto max-h-[90vh] custom-scrollbar">
                      <h3 id={`project-${selectedProject.id}-title`} className="text-2xl font-bold mb-4 text-lime-300">
                        {selectedProject.title}
                      </h3>
                      <ProjectDescription description={selectedProject.description} projectId={selectedProject.id} />
                    </div>
                  </>
                ) : selectedProject.images && selectedProject.images.length > 0 ? (
                  /* ── INSTAGRAM CAROUSEL ── */
                  <>
                    <ImageSlider images={selectedProject.images} title={selectedProject.title} />
                    <div className="p-6 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 id={`project-${selectedProject.id}-title`} className="text-xl font-bold mb-3 text-lime-300">
                        {selectedProject.title}
                      </h3>
                      <ProjectDescription description={selectedProject.description} projectId={selectedProject.id} />
                    </div>
                  </>
                ) : isSingleImage ? (
                  /* ── SINGLE IMAGE ── */
                  <>
                    <Image
                      src={getThumbnail(selectedProject)}
                      alt={selectedProject.title}
                      width={1080}
                      height={1350}
                      sizes="(max-width: 768px) 100vw, 512px"
                      className="h-auto w-full"
                    />
                    <div className="p-6 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 id={`project-${selectedProject.id}-title`} className="text-xl font-bold mb-3 text-lime-300">
                        {selectedProject.title}
                      </h3>
                      <ProjectDescription description={selectedProject.description} projectId={selectedProject.id} />
                    </div>
                  </>
                ) : (
                  /* ── HORIZONTAL VIDEO ── */
                  <>
                    <div className="w-full bg-black">
                      {selectedVideoId ? (
                        <div className="aspect-video w-full">
                        <iframe
                          title={selectedProject.title}
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&loop=1&playlist=${selectedVideoId}&controls=0`}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </div>
                      ) : isCloudinary ? (
                        <div className="aspect-video w-full">
                          <video 
                            src={selectedProject.videoUrl} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            controls
                            preload="metadata"
                            poster={getThumbnail(selectedProject)}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : null}
                    </div>
                    <div className="p-8 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 id={`project-${selectedProject.id}-title`} className="text-2xl font-bold mb-4 text-lime-300">
                        {selectedProject.title}
                      </h3>
                      <ProjectDescription description={selectedProject.description} projectId={selectedProject.id} />
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
