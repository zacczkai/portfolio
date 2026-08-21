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
    { 
      id: "dc1", 
      title: "Halloween: O Verdadeiro Medo", 
      image: "/images/halloween.png", 
      description: (
        <>
          <p><strong>Conceito:</strong> Fuga do clichê comemorativo. O objetivo foi aproveitar a estética da data para engajar o público com o core business da marca (previdência), transformando a falta de planejamento financeiro no verdadeiro "monstro" a ser evitado.</p>
        </>
      ) 
    },
    { 
      id: "dc2", 
      title: "Dia dos Pais: Composição e Profundidade", 
      image: "/images/dia dos pais noise.png", 
      description: (
        <>
          <p><strong>Execução:</strong> Foco em layout e manipulação de imagem. Utilização de máscaras de recorte na tipografia e separação de planos para criar uma peça institucional limpa, equilibrada e que transmite acolhimento.</p>
        </>
      ) 
    },
    { 
      id: "dc3", 
      title: "Dia das Crianças: Educação e Conscientização", 
      image: "/images/post dia das crianças.png", 
      description: (
        <>
          <p><strong>Conceito:</strong> Uma abordagem tática que une a data comemorativa ao pilar educacional da instituição. Em vez de uma simples parabenização, a peça utiliza uma linguagem visual direta e acessível para provocar uma reflexão nos pais sobre a importância de introduzir a educação financeira desde a infância. O layout foi construído para priorizar a clareza da mensagem e a legibilidade no feed.</p>
        </>
      ) 
    },
  ];

  const carrossel: Project[] = [
    { 
      id: "car1", 
      title: "Tradução Visual de Temas Complexos", 
      image: "/images/O-QUE-É-CD-PROJ_01.png",
      images: [
        "/images/O-QUE-É-CD-PROJ_01.png",
        "/images/O-QUE-É-CD-PROJ_02.png",
        "/images/O-QUE-É-CD-PROJ_03.png",
        "/images/O-QUE-É-CD-PROJ_04.png",
        "/images/O-QUE-É-CD-PROJ_05.png",
      ],
      description: (
        <>
          <p><strong>Conceito:</strong> O desafio era explicar a estrutura burocrática de um órgão estatutário de forma acessível. A solução focou em um design limpo, priorizando a hierarquia tipográfica e o uso inteligente de respiros visuais, provando que a comunicação institucional pode ser leve e direta.</p>
        </>
      )
    },
    { 
      id: "car2", 
      title: "Educação Financeira: Leitura Fluida", 
      image: "/images/proj-educacao-financeira_01.png",
      images: [
        "/images/proj-educacao-financeira_01.png",
        "/images/proj-educacao-financeira_02.png",
        "/images/proj-educacao-financeira_03.png",
        "/images/proj-educacao-financeira_04.png",
        "/images/proj-educacao-financeira_05.png",
      ],
      description: (
        <>
          <p><strong>Conceito:</strong> Para reter a atenção em um tema denso, a estratégia foi utilizar um carrossel em formato contínuo. A composição visual e a linha guia conectam os quadros, transformando blocos de texto em uma jornada dinâmica que conduz o usuário até o call to action final.</p>
        </>
      )
    },
  ];

  const videos: Project[] = [
    { id: "vid1", title: "Cobertura Expo 2026", image: "/images/vid1.jpg", description: "Aftermovie do evento principal da empresa.", videoUrl: "https://youtu.be/EWkf893ZfOM" },
    { id: "vid2", title: "Entrevistas Bastidores", image: "/images/vid2.jpg", description: "Reels cobrindo os bastidores da feira.", videoUrl: "https://youtu.be/TL-fPjRIhWk" },
    { id: "vid3", title: "Teaser Palestra", image: "/images/vid3.jpg", description: "Vídeo curto chamando para o palco principal.", videoUrl: "https://youtu.be/ZmBwy3QiHJs" },
  ];

  const projetosPessoais: Project[] = [
    { 
      id: "pp1", 
      title: "Across the Spider-Verse: Frenesi e Dualidade", 
      videoUrl: "https://youtu.be/EWkf893ZfOM",
      description: (
        <>
          <p><strong>Softwares utilizados:</strong> After Effects, Photoshop, FL Studio e Magic Bullet Looks.</p>
          <p><strong>O Projeto:</strong> Um estudo de ritmo e intensidade emocional. O objetivo desta peça foi traduzir o caos, a ansiedade e a sobrecarga sensorial que marcam a estética do filme, fugindo de abordagens tradicionais e apostando em uma montagem de alta energia.</p>
          <p><strong>Processo Criativo & Sound Design:</strong> A trilha não é incidental, mas a espinha dorsal da narrativa. Para criar a atmosfera exata, produzi um mashup no FL Studio mesclando "Metro Spider" e "Cut Me Up". A escolha se alinha ao subtexto do filme: o álbum de Metro Boomin explora a dualidade entre heróis e vilões, enquanto a faixa de Wacotron aborda a imposição de respeito no próprio território, um paralelo direto com o arco de pertencimento de Miles Morales. A virada musical na edição marca a transição de uma ansiedade explosiva para uma angústia contemplativa.</p>
          <p><strong>Execução Técnica:</strong> A identidade visual foi construída com um trabalho minucioso de masking, rotoscopia e motion tracking no After Effects, integrado a assets desenvolvidos no Photoshop, como os balões de diálogo com lyrics dinâmicos, texturas e substituição de fundos. O color grading buscou respeitar a paleta vibrante da animação original, ganhando peso através do Magic Bullet Looks. A fluidez dos cortes e keyframes gerou uma retenção orgânica de alto impacto, alcançando 57 mil visualizações, 9.700 curtidas e quase 1.000 salvamentos.</p>
        </>
      )
    },
    { 
      id: "pp2", 
      title: "La La Land: A Estética da Melancolia", 
      videoUrl: "https://youtu.be/TL-fPjRIhWk",
      description: (
        <>
          <p><strong>Softwares utilizados:</strong> After Effects, Photoshop e Magic Bullet Looks.</p>
          <p><strong>O Projeto:</strong> Uma reflexão audiovisual sobre arrependimento e a dor de reconhecer o próprio erro no fim de um relacionamento. A escolha da faixa "Sparks" (Coldplay) se deu por um vídeo que viralizou na época da produção do vídeo, que mostrava a emoção do Chris Martin ao cantar essa música logo após terminar com Dakota Johnson. A canção dialoga diretamente com as escolhas dos protagonistas do filme.</p>
          <p><strong>Processo Criativo & Sound Design:</strong> A cinematografia original de La La Land é irretocável, e em vez de alterar o color grading, o trabalho visual focou em adicionar difusão de luz e vinhetas de desfoque, simulando o efeito óptico de um filtro Black Mist para construir uma atmosfera de sonho e memória (dreamy look). O verdadeiro motor da edição é o sound design, onde os cortes e ações do filme foram sincronizados com a cadência da música.</p>
          <p><strong>Execução Técnica:</strong> A imersão do espectador foi aprofundada através de motion tracking e masking, permitindo que as legendas interagissem volumetricamente com a cena, ora sobrepondo, ora se escondendo atrás de objetos. Para o clímax do refrão, desenvolvi uma animação com textura grunge (mesclando Photoshop e After Effects) para simbolizar os "sparks". A peça gerou grande identificação orgânica, resultando em 1.802 visualizações e excelente taxa de salvamentos e compartilhamentos.</p>
        </>
      )
    },
    { 
      id: "pp3", 
      title: "Manga Motion: Parallax & Ironia Narrativa", 
      videoUrl: "https://youtu.be/ey7NhBkqtCA",
      isVertical: true,
      description: (
        <>
          <p><strong>Softwares utilizados:</strong> Photoshop e After Effects.</p>
          <p><strong>O Projeto:</strong> Um experimento técnico em motion graphics e animação 2D. O desafio foi dar vida e fluidez a quatro painéis estáticos de mangá, utilizando o diálogo irônico da música "Hit the Road Jack" para ilustrar a dinâmica unilateral e muitas vezes cômica entre os personagens Sasuke e Sakura.</p>
          <p><strong>Processo Criativo & Rigging:</strong> O projeto exigiu uma pré-produção minuciosa de assets. No Photoshop, cada painel foi desmembrado: fundos foram separados, fios de cabelo recortados individualmente e os cenários ou fundos de cabeça precisaram ser redesenhados digitalmente para garantir que não houvesse falhas visuais durante o movimento (clean plating).</p>
          <p><strong>Execução Técnica:</strong> A animação tomou forma no After Effects. Expressões, olhos e movimentos corporais foram animados manualmente via Puppet Tool, enquanto o movimento orgânico do cabelo foi construído com scripts de Hair Rig. A cereja do bolo é o senso extremo de profundidade 3D (efeito parallax): utilizando câmeras 3D e Null Objects, a navegação da cena passa por pedras no primeiro plano que entram e saem de desfoque. A paleta foi aquecida e lens flares foram adicionados para simular luz solar agressiva. O engajamento foi de: 9.200 visualizações, 411 curtidas, 111 salvamentos e 25 compartilhamentos.</p>
        </>
      )
    },
    { 
      id: "pp4", 
      title: "Fight Club: O Peso da Projeção", 
      videoUrl: "https://youtu.be/ZmBwy3QiHJs",
      description: (
        <>
          <p><strong>Softwares utilizados:</strong> After Effects e Magic Bullet Looks.</p>
          <p><strong>O Projeto:</strong> Uma peça conceitual e mais crua, sobre a incapacidade de alcançar as próprias expectativas. O foco não era a complexidade de cortes rápidos, mas sim a construção de uma atmosfera psicológica pesada, revelando a figura de Tyler Durden exatamente pelo que ele é: uma ilusão sintomática da mente do protagonista.</p>
          <p><strong>Processo Criativo & Execução Técnica:</strong> Para reforçar a sensação de irrealidade, o tratamento de cor e luz abusou da difusão, mantendo a estética onírica (dreamy) para isolar o personagem principal de seu ambiente. A estabilidade visual é quebrada propositalmente durante o refrão da faixa "Creep", utilizando motion tracking alinhado a efeitos de glitch desenhados para simbolizar a ruptura mental e a falha na projeção de identidade. Mesmo sendo uma peça mais densa e conceitual, a narrativa visual capturou a atenção de 1.185 espectadores.</p>
        </>
      )
    }
  ];

  const projetosPessoaisIntro = (
    <>
      Esta seleção de projetos autorais não nasceu de uma estratégia de viralização, mas sim como um espaço de pura experimentação narrativa e visual. Ao longo dos últimos anos, utilizei recortes da cultura pop para testar limites de edição, color grading e sound design sem as amarras de um briefing tradicional.<br/><br/>
      O foco nunca foi o volume de postagens, mas sim a precisão técnica e a liberdade para ditar ritmos, construir atmosferas e explorar ferramentas avançadas de pós-produção. As postagens foram todas feitas em um TikTok criado especificamente para isso, com o nome de <a href="http://tiktok.com/@zacc.an" target="_blank" className="text-purple-400 underline">@zacc.an</a>. Ao todo, foram cerca de 15 vídeos em mais de 5 anos.
    </>
  );

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
        <PortfolioSection title="Projetos Autorais de Audiovisual" description={projetosPessoaisIntro} projects={projetosPessoais} />
      </div>

      <Contact />
    </main>
  );
}
