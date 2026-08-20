"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Contact from "@/components/Contact";
import LanguageToggle from "@/components/LanguageToggle";
import PortfolioSection, { Project } from "@/components/PortfolioSection";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  // Mock data for the sections
  const datasComemorativas: Project[] = [
    { id: "dc1", title: "Campanha Dia das Mães", image: "/images/dc1.jpg", description: "Post comemorativo para o Dia das Mães com foco emocional." },
    { id: "dc2", title: "Post Natal", image: "/images/dc2.jpg", description: "Design temático de natal para redes sociais." },
    { id: "dc3", title: "Dia do Consumidor", image: "/images/dc3.jpg", description: "Promoção especial de dia do consumidor." },
  ];

  const carrossel: Project[] = [
    { id: "car1", title: "Dicas de Marketing", image: "/images/car1.jpg", description: "Carrossel educativo sobre funil de vendas." },
    { id: "car2", title: "Lançamento de Produto", image: "/images/car2.jpg", description: "Sequência de imagens para lançamento." },
    { id: "car3", title: "Tutorial Passo a Passo", image: "/images/car3.jpg", description: "Carrossel interativo explicando o uso do produto." },
  ];

  const videos: Project[] = [
    { id: "vid1", title: "Cobertura Expo 2026", image: "/images/vid1.jpg", description: "Aftermovie do evento principal da empresa.", videoUrl: "https://youtube.com/..." },
    { id: "vid2", title: "Entrevistas Bastidores", image: "/images/vid2.jpg", description: "Reels cobrindo os bastidores da feira.", videoUrl: "https://youtube.com/..." },
    { id: "vid3", title: "Teaser Palestra", image: "/images/vid3.jpg", description: "Vídeo curto chamando para o palco principal.", videoUrl: "https://youtube.com/..." },
  ];

  const projetosPessoais: Project[] = [
    { id: "pp1", title: "Rebranding Marca X", image: "/images/pp1.jpg", description: "Projeto conceitual de rebranding." },
    { id: "pp2", title: "Key Visual Festival", image: "/images/pp2.jpg", description: "Estudo de direção de arte para um festival de música." },
    { id: "pp3", title: "Campanha 3D", image: "/images/pp3.jpg", description: "Estudos utilizando software 3D para publicidade." },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-[#f3f4f6]">
      <LanguageToggle />
      <Hero />
      <About />
      
      {/* Portfolio Sections */}
      <div className="py-12">
        <h2 className="text-center text-zinc-500 uppercase tracking-widest font-semibold mb-4">{t.sections.internship}</h2>
        <PortfolioSection title={t.sections.datasComemorativas} projects={datasComemorativas} />
        <PortfolioSection title={t.sections.carrossel} projects={carrossel} />
        <PortfolioSection title={t.sections.videosEventos} projects={videos} />
      </div>

      <div className="py-12 border-t border-zinc-900 bg-black/50">
        <h2 className="text-center text-zinc-500 uppercase tracking-widest font-semibold mb-4">Projetos</h2>
        <PortfolioSection title={t.sections.projetosPessoais} projects={projetosPessoais} />
      </div>

      <Contact />
    </main>
  );
}
