import About from "@/components/About";
import Contact from "@/components/Contact";
import DesignShowcase from "@/components/DesignShowcase";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProjectArchive from "@/components/ProjectArchive";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-[#f5f5f0]">
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <DesignShowcase />
      <ProjectArchive />
      <About />
      <Contact />
    </main>
  );
}
