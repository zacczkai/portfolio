import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import useEmblaCarousel from "embla-carousel-react";

export interface Project {
  id: string;
  title: string;
  image?: string;
  description?: React.ReactNode | string;
  videoUrl?: string;
  isVertical?: boolean;
}

interface PortfolioSectionProps {
  title: string;
  description?: React.ReactNode | string;
  projects: Project[];
}

export default function PortfolioSection({ title, description, projects }: PortfolioSectionProps) {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [emblaRef] = useEmblaCarousel({ 
    dragFree: true,
    containScroll: "trimSnaps"
  });

  const selectedProject = projects.find((p) => p.id === selectedId);

  // Helper to extract YouTube ID
  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
    return match ? match[1] : null;
  };

  const getThumbnail = (project: Project) => {
    if (project.image) return project.image;
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {title}
        </h2>
        {description && <div className="text-gray-400 text-lg leading-relaxed">{description}</div>}
      </motion.div>

      {/* Embla Carousel */}
      <div className="overflow-hidden pb-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex gap-6">
          {projects.map((project) => (
            <motion.div
              layoutId={`card-${project.id}`}
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className="relative flex-shrink-0 w-72 md:w-80 h-96 rounded-2xl overflow-hidden cursor-pointer group border border-zinc-800 bg-zinc-900 select-none"
            >
              {/* Image / YouTube Thumbnail */}
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
              <motion.div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-zinc-300 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  {t.sections.clickToExpand}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm cursor-pointer"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`card-${selectedProject.id}`}
                className="bg-zinc-900 w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden pointer-events-auto shadow-2xl border border-zinc-800 flex flex-col md:flex-row relative"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-purple-900 text-white rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Left Side: Media */}
                <div className={`md:w-1/2 min-h-[300px] bg-black relative flex items-center justify-center ${selectedProject.isVertical ? 'py-4' : ''}`}>
                  {selectedVideoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&mute=1&loop=1&playlist=${selectedVideoId}&controls=0`}
                      className={selectedProject.isVertical ? "h-full w-auto aspect-[9/16] rounded-md overflow-hidden" : "w-full h-full object-cover min-h-[300px] md:min-h-full"}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  ) : (
                    <img 
                      src={getThumbnail(selectedProject)} 
                      alt={selectedProject.title} 
                      className={selectedProject.isVertical ? "h-full w-auto aspect-[9/16] object-cover rounded-md" : "w-full h-full object-cover"}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100"><rect width="100%" height="100%" fill="%2327272a" /><text x="50%" y="50%" font-family="Arial" font-size="6" fill="%2371717a" text-anchor="middle" dominant-baseline="middle">[ Imagem Indisponível ]</text></svg>`;
                      }}
                    />
                  )}
                </div>
                
                {/* Right Side: Details */}
                <div className="p-8 md:w-1/2 flex flex-col overflow-y-auto max-h-[90vh] custom-scrollbar">
                  <h3 className="text-3xl font-bold mb-6 text-purple-400">
                    {selectedProject.title}
                  </h3>
                  <div className="text-zinc-300 leading-relaxed space-y-4">
                    {selectedProject.description}
                  </div>
                  {selectedProject.videoUrl && !selectedVideoId && (
                    <div className="mt-6">
                       <p className="text-sm text-zinc-500 mb-2">Link do vídeo:</p>
                       <a href={selectedProject.videoUrl} target="_blank" rel="noreferrer" className="text-purple-400 underline break-all">
                         {selectedProject.videoUrl}
                       </a>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
