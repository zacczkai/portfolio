import Hero from "@/components/Hero";
import About from "@/components/About";
import VideoGallery from "@/components/VideoGallery";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f3f4f6]">
      <Hero />
      <About />
      <VideoGallery />
      <Contact />
    </main>
  );
}
