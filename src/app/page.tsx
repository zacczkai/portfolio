import About from "@/components/About";
import Contact from "@/components/Contact";
import DesignShowcase from "@/components/DesignShowcase";
import Navbar from "@/components/Navbar";
import ProjectArchive from "@/components/ProjectArchive";
import VerticalCuts from "@/components/VerticalCuts";
import CinemaReel from "@/components/reel/CinemaReel";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-sala text-projetor">
      <Navbar />
      <CinemaReel />
      <VerticalCuts />
      <DesignShowcase />
      <ProjectArchive />
      <About />
      <Contact />
    </main>
  );
}
