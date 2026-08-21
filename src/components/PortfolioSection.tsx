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

      {/* Prev / Next */}
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

      {/* Dots */}
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
  const [canScroll, setCanScroll] = useState(false);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
    setCanScroll(emblaApi.canScrollNext() || emblaApi.canScrollPrev());
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

  return { progress, canScroll };
}

/* ── Main component ── */
export default function PortfolioSection({ title, description, projects }: PortfolioSectionProps) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    align: projects.length <= 3 ? "center" : "start",
  });

  const { progress: scrollProgress, canScroll } = useScrollProgress(emblaApi);
  const selectedProject = projects.find((p) => p.id === selectedId);

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    // Handle shorts URLs
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
    const id = getYouTubeId(project.videoUrl);
    return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
  };

  const selectedVideoId = getYouTubeId(selectedProject?.videoUrl);

  // Determine if the project has only a single image (no video, no carousel)
  const isSingleImage = selectedProject && !selectedVideoId && !selectedProject.images?.length;

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 400, damping: 15 } }}
              onClick={() => setSelectedId(project.id)}
              className="relative flex-shrink-0 w-72 md:w-80 h-96 rounded-2xl overflow-hidden cursor-pointer group border border-zinc-800 bg-zinc-900 select-none"
            >
              <div className="absolute inset-0 bg-zinc-800">
                <img
                  src={getThumbnail(project)}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:via-purple-900/10 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  {t.sections.clickToExpand}
                </p>
              </div>

              {project.images && project.images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full border border-zinc-700">
                  {project.images.length} slides
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Progress bar (only when scrollable) ── */}
      {canScroll && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex items-center gap-3"
        >
          <div className="flex-1 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full"
              style={{ width: `${Math.max(scrollProgress * 100, 8)}%` }}
            />
          </div>
        </motion.div>
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
                  /* ── INSTAGRAM CAROUSEL: narrow modal, image fills width ── */
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
                  /* ── SINGLE IMAGE: narrow modal, no black bars ── */
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
                  /* ── HORIZONTAL VIDEO: video on top, text below ── */
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
