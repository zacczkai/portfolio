"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

export interface Project {
  id: string;
  title: string;
  image?: string;
  images?: string[]; // For Instagram-style carousel posts
  description?: React.ReactNode | string;
  videoUrl?: string;
  isVertical?: boolean;
}

interface PortfolioSectionProps {
  title: string;
  description?: React.ReactNode | string;
  projects: Project[];
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
    <div className="relative w-full h-full bg-black flex flex-col">
      {/* Slider */}
      <div className="flex-1 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0 flex items-center justify-center h-full bg-black">
              <img src={src} alt={`Slide ${i + 1}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next buttons */}
      {canScrollPrev && (
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-purple-900/80 rounded-full text-white transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      {canScrollNext && (
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-black/60 hover:bg-purple-900/80 rounded-full text-white transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 py-3 bg-black/80">
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

/* ── Scroll progress bar for the main carousel ── */
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

/* ── Main component ── */
export default function PortfolioSection({ title, description, projects }: PortfolioSectionProps) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollProgress = useScrollProgress(emblaApi);
  const selectedProject = projects.find((p) => p.id === selectedId);

  // Helper to extract YouTube ID
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/
    );
    return match ? match[1] : null;
  };

  const getThumbnail = (project: Project) => {
    if (project.image) return project.image;
    if (project.images?.[0]) return project.images[0];
    const id = getYouTubeId(project.videoUrl);
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
  };

  const selectedVideoId = getYouTubeId(selectedProject?.videoUrl);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mb-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        {description && (
          <div className="text-gray-400 text-lg leading-relaxed">{description}</div>
        )}
      </motion.div>

      {/* ── Embla Carousel ── */}
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onClick={() => setSelectedId(project.id)}
              className="relative flex-shrink-0 w-72 md:w-80 h-96 rounded-2xl overflow-hidden cursor-pointer group border border-zinc-800 bg-zinc-900 select-none"
            >
              <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                <img
                  src={getThumbnail(project)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%2327272a" /><text x="50%" y="50%" font-family="Arial" font-size="6" fill="%2371717a" text-anchor="middle" dominant-baseline="middle">[ Imagem Indisponível ]</text></svg>`;
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  {t.sections.clickToExpand}
                </p>
              </div>

              {/* Show multi-image badge */}
              {project.images && project.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-zinc-700">
                  {project.images.length} slides
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Stylized progress bar ── */}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
            style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
        <span className="text-xs text-zinc-600 font-mono tabular-nums min-w-[3ch] text-right">
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/85 z-50 backdrop-blur-md cursor-pointer"
            />

            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className={`bg-zinc-900 w-full rounded-2xl overflow-hidden pointer-events-auto shadow-2xl border border-zinc-800 relative ${
                  selectedProject.isVertical
                    ? "max-w-5xl max-h-[90vh] flex flex-col md:flex-row"
                    : "max-w-3xl max-h-[90vh] flex flex-col"
                }`}
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-purple-900 text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* ── Media area ── */}
                {selectedProject.isVertical ? (
                  /* Vertical video: side-by-side layout */
                  <>
                    <div className="md:w-1/2 min-h-[300px] bg-black flex items-center justify-center py-4">
                      {selectedVideoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&loop=1&playlist=${selectedVideoId}&controls=0`}
                          className="h-full w-auto aspect-[9/16] rounded-md"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <img
                          src={getThumbnail(selectedProject)}
                          alt={selectedProject.title}
                          className="h-full w-auto aspect-[9/16] object-cover rounded-md"
                        />
                      )}
                    </div>
                    <div className="p-8 md:w-1/2 flex flex-col overflow-y-auto max-h-[90vh] custom-scrollbar">
                      <h3 className="text-3xl font-bold mb-6 text-purple-400">
                        {selectedProject.title}
                      </h3>
                      <div className="text-zinc-300 leading-relaxed space-y-4">
                        {selectedProject.description}
                      </div>
                    </div>
                  </>
                ) : selectedProject.images && selectedProject.images.length > 0 ? (
                  /* Instagram-style carousel: slider on top, text below */
                  <>
                    <div className="w-full aspect-square max-h-[55vh] bg-black">
                      <ImageSlider images={selectedProject.images} />
                    </div>
                    <div className="p-8 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">
                        {selectedProject.title}
                      </h3>
                      <div className="text-zinc-300 leading-relaxed space-y-4">
                        {selectedProject.description}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Horizontal video / single image: media on top, text below (scrollable) */
                  <>
                    <div className="w-full bg-black">
                      {selectedVideoId ? (
                        <div className="aspect-video w-full">
                          <iframe
                            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&loop=1&playlist=${selectedVideoId}&controls=0`}
                            className="w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </div>
                      ) : (
                        <img
                          src={getThumbnail(selectedProject)}
                          alt={selectedProject.title}
                          className="w-full object-contain max-h-[50vh]"
                        />
                      )}
                    </div>
                    <div className="p-8 flex flex-col overflow-y-auto flex-1 custom-scrollbar">
                      <h3 className="text-2xl font-bold mb-4 text-purple-400">
                        {selectedProject.title}
                      </h3>
                      <div className="text-zinc-300 leading-relaxed space-y-4">
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
