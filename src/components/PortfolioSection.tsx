"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

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
    <img
      src={fallbacks[srcIndex]}
      alt={alt}
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
function ImageSlider({ images }: { images: string[] }) {
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
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
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
              <img src={src} alt={`Slide ${i + 1}`} className="w-full h-auto" />
            </div>
          ))}
        </div>
      </div>

      {canScrollPrev && (
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-purple-900/80 rounded-full text-white transition-colors z-10 backdrop-blur-sm"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-black/50 hover:bg-purple-900/80 rounded-full text-white transition-colors z-10 backdrop-blur-sm"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center justify-center gap-1.5 py-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "w-2.5 h-2.5 bg-purple-500"
                : "w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-400"
            }`}
          />
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
    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  return progress;
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 15 } }}
      onClick={onClick}
      className="relative flex-shrink-0 w-72 md:w-80 h-96 rounded-2xl overflow-hidden cursor-pointer group border border-zinc-800 bg-zinc-900 select-none"
    >
      <div className="absolute inset-0 bg-zinc-800">
        {ytId ? (
          <YTThumbnail videoId={ytId} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : thumb ? (
          <img
            src={thumb}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
          />
        ) : null}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-purple-900/10 transition-all duration-500" />
      <div className="absolute bottom-0 left-0 p-6 w-full">
        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          {clickLabel}
        </p>
      </div>

      {project.images && project.images.length > 1 && (
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-zinc-700">
          {project.images.length} slides
        </div>
      )}
    </motion.div>
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
    setIsScrollable(canScroll);
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      const cs = emblaApi.canScrollNext() || emblaApi.canScrollPrev();
      setIsScrollable(cs);
      onSelect();
    });
    return () => {
      emblaApi.off("select", onSelect);
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

  const getThumbnail = (project: Project) => {
    if (project.image) return project.image;
    if (project.images?.[0]) return project.images[0];
    return "";
  };

  const selectedVideoId = getYouTubeId(selectedProject?.videoUrl);
  const isSingleImage = selectedProject && !selectedVideoId && !selectedProject.images?.length;

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
                  clickLabel={t.sections.clickToExpand}
                />
              ))}
            </div>
          </div>

          {/* Desktop navigation arrows */}
          {canScrollPrev && (
            <button
              onClick={() => emblaApi?.scrollPrev()}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 hover:bg-purple-900/80 text-white rounded-full transition-all backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 -translate-x-2 group-hover/carousel:translate-x-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {canScrollNext && (
            <button
              onClick={() => emblaApi?.scrollNext()}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/70 hover:bg-purple-900/80 text-white rounded-full transition-all backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 translate-x-2 group-hover/carousel:translate-x-0"
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
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
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
              clickLabel={t.sections.clickToExpand}
            />
          ))}
        </div>
      )}

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/85 z-50 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className={`bg-zinc-900 rounded-2xl overflow-hidden pointer-events-auto shadow-2xl border border-zinc-800 relative ${
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
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-purple-900 text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* ── VERTICAL VIDEO: side-by-side ── */}
                {selectedProject.isVertical ? (
                  <>
                    <div className="md:w-1/2 min-h-[300px] bg-black flex items-center justify-center py-4">
                      {selectedVideoId && (
                        <iframe
                          src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&loop=1&playlist=${selectedVideoId}&controls=0`}
                          className="h-full w-auto aspect-[9/16] rounded-md"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      )}
                    </div>
                    <div className="p-8 md:w-1/2 flex flex-col overflow-y-auto max-h-[90vh] custom-scrollbar">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">
                        {selectedProject.title}
                      </h3>
                      <div className="text-zinc-300 leading-relaxed space-y-3 text-sm">
                        {selectedProject.description}
                      </div>
                    </div>
                  </>
                ) : selectedProject.images && selectedProject.images.length > 0 ? (
                  /* ── INSTAGRAM CAROUSEL ── */
                  <>
                    <ImageSlider images={selectedProject.images} />
                    <div className="p-6 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 className="text-xl font-bold mb-3 text-purple-400">
                        {selectedProject.title}
                      </h3>
                      <div className="text-zinc-300 leading-relaxed space-y-3 text-sm">
                        {selectedProject.description}
                      </div>
                    </div>
                  </>
                ) : isSingleImage ? (
                  /* ── SINGLE IMAGE ── */
                  <>
                    <img
                      src={getThumbnail(selectedProject)}
                      alt={selectedProject.title}
                      className="w-full h-auto"
                    />
                    <div className="p-6 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 className="text-xl font-bold mb-3 text-purple-400">
                        {selectedProject.title}
                      </h3>
                      <div className="text-zinc-300 leading-relaxed space-y-3 text-sm">
                        {selectedProject.description}
                      </div>
                    </div>
                  </>
                ) : (
                  /* ── HORIZONTAL VIDEO ── */
                  <>
                    <div className="w-full bg-black">
                      {selectedVideoId && (
                        <div className="aspect-video w-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&loop=1&playlist=${selectedVideoId}&controls=0`}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">
                        {selectedProject.title}
                      </h3>
                      <div className="text-zinc-300 leading-relaxed space-y-3 text-sm">
                        {selectedProject.description}
                      </div>
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
