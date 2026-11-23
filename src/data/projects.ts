export type Language = "pt" | "en";
export type ProjectDiscipline = "motion" | "design";
export type ProjectContext = "institutional" | "authorial";
export type HomeSection = "motion-featured" | "design-showcase";

export interface ProjectCopy {
  title: string;
  shortTitle: string;
  summary: string;
  description: readonly string[];
}

export interface ImageAsset {
  src: string;
  alt: Record<Language, string>;
}

export interface VideoPreviewWindow {
  start: number;
  duration: number;
}

export type ProjectMedia =
  | { kind: "image"; image: ImageAsset }
  | { kind: "gallery"; images: readonly ImageAsset[] }
  | {
      kind: "video";
      sourceUrl: string;
      orientation: "landscape" | "portrait";
      aspectRatio: { width: number; height: number };
      preview: VideoPreviewWindow;
      posterAt?: number;
    };

export interface Project {
  id: string;
  slug: string;
  discipline: ProjectDiscipline;
  context: ProjectContext;
  year: string;
  homePlacement?: { section: HomeSection; order: number };
  grade?: string;
  highlight?: Record<Language, string>;
  roles: readonly string[];
  tools: readonly string[];
  copy: Record<Language, ProjectCopy>;
  media: ProjectMedia;
}

export type VideoProject = Project & { media: Extract<ProjectMedia, { kind: "video" }> };

const image =(src: string, pt: string, en: string): ImageAsset => ({
  src,
  alt: { pt, en },
});

export const projects: readonly Project[] = [
  {
    id: "pp1",
    grade: "#F2D61F",
    highlight: { pt: "57 mil visualizações", en: "57,000 views" },
    slug: "spider-verse-frenesi-dualidade",
    discipline: "motion",
    context: "authorial",
    year: "2024",
    homePlacement: { section: "motion-featured", order: 1 },
    roles: ["Direção de arte", "Edição", "Sound design"],
    tools: ["After Effects", "Photoshop", "FL Studio", "Magic Bullet Looks"],
    copy: {
      pt: {
        title: "Across the Spider-Verse: Frenesi e Dualidade",
        shortTitle: "Spider-Verse",
        summary: "Ritmo, ansiedade e sobrecarga sensorial conduzidos por montagem e som.",
        description: [
          "Um estudo de ritmo e intensidade emocional que traduz o caos e a sobrecarga sensorial do filme em uma montagem de alta energia.",
          "Produzi no FL Studio um mashup de “Metro Spider” e “Cut Me Up”. Masking, rotoscopia e motion tracking se integram a assets criados no Photoshop e lyrics dinâmicos.",
          "A peça alcançou 57 mil visualizações, 9.700 curtidas e quase 1.000 salvamentos.",
        ],
      },
      en: {
        title: "Across the Spider-Verse: Frenzy and Duality",
        shortTitle: "Spider-Verse",
        summary: "Rhythm, anxiety and sensory overload driven by editing and sound.",
        description: [
          "A study in rhythm and emotional intensity that translates the film’s sensory overload into a high-energy edit.",
          "I produced a custom mashup in FL Studio, then combined masking, rotoscoping, motion tracking, Photoshop assets and dynamic lyrics.",
          "The piece reached 57,000 views, 9,700 likes and almost 1,000 saves.",
        ],
      },
    },
    media: {
      kind: "video",
      sourceUrl: "https://res.cloudinary.com/amh1rowo/video/upload/q_auto,f_mp4/v1787687139/spiderverse.mp4",
      orientation: "landscape",
      aspectRatio: { width: 16, height: 9 },
      preview: { start: 27, duration: 4 },
    },
  },
  {
    id: "vid1",
    grade: "#6FC2CC",
    slug: "institucional-7-anos",
    discipline: "motion",
    context: "institutional",
    year: "2025",
    homePlacement: { section: "motion-featured", order: 2 },
    roles: ["Motion graphics", "Edição", "Direção de arte"],
    tools: ["After Effects", "Premiere Pro", "Photoshop"],
    copy: {
      pt: {
        title: "Institucional 7 Anos: Narrativa em Motion",
        shortTitle: "Institucional",
        summary: "Uma linha do tempo imersiva para quase uma década de história institucional.",
        description: [
          "O desafio era condensar quase uma década de história institucional sem perder a atenção do espectador.",
          "Construí uma linha do tempo imersiva com câmeras 3D, assets móveis e animações de shape layers, evitando o formato tradicional de slides corporativos.",
          "O resultado é um passeio visual contínuo que dá ritmo e peso à trajetória da instituição.",
        ],
      },
      en: {
        title: "7-Year Institutional Film: Motion Narrative",
        shortTitle: "Institutional",
        summary: "An immersive timeline for almost a decade of institutional history.",
        description: [
          "The challenge was to condense almost a decade of institutional history without losing the viewer halfway through.",
          "I built an immersive timeline with 3D cameras, moving assets and shape-layer animation instead of a traditional corporate slideshow.",
          "The result is a continuous visual journey that gives rhythm and weight to the institution’s history.",
        ],
      },
    },
    media: {
      kind: "video",
      sourceUrl: "https://res.cloudinary.com/amh1rowo/video/upload/q_auto,f_mp4/v1787689879/V%C3%ADdeo_Final_-_Max_Bitrate_1_1.mp4",
      orientation: "landscape",
      aspectRatio: { width: 16, height: 9 },
      preview: { start: 29, duration: 6 },
    },
  },
  {
    id: "pp2",
    grade: "#D86CCB",
    slug: "la-la-land-estetica-melancolia",
    discipline: "motion",
    context: "authorial",
    year: "2024",
    homePlacement: { section: "motion-featured", order: 3 },
    roles: ["Edição", "Direção de arte", "Sound design"],
    tools: ["After Effects", "Photoshop", "Magic Bullet Looks"],
    copy: {
      pt: {
        title: "La La Land: A Estética da Melancolia",
        shortTitle: "La La Land",
        summary: "Uma reflexão audiovisual sobre arrependimento, memória e escolhas tardias.",
        description: [
          "A peça reflete sobre arrependimento e reconhece a música “Sparks”, do Coldplay, como motor emocional da montagem.",
          "Difusão de luz e desfoque preservam a cinematografia original enquanto constroem uma atmosfera de sonho e memória.",
          "Motion tracking e masking fazem as legendas interagirem em profundidade com a cena.",
        ],
      },
      en: {
        title: "La La Land: The Aesthetic of Melancholy",
        shortTitle: "La La Land",
        summary: "An audiovisual reflection on regret, memory and choices made too late.",
        description: [
          "The piece reflects on regret and uses Coldplay’s “Sparks” as the edit’s emotional engine.",
          "Light diffusion and soft blur preserve the original cinematography while building a dreamlike atmosphere.",
          "Motion tracking and masking let captions interact with the scene in depth.",
        ],
      },
    },
    media: {
      kind: "video",
      sourceUrl: "https://res.cloudinary.com/amh1rowo/video/upload/q_auto,f_mp4/v1787687142/la_la_land.mp4",
      orientation: "landscape",
      aspectRatio: { width: 16, height: 9 },
      preview: { start: 31, duration: 6 },
    },
  },
  {
    id: "pp3",
    grade: "#E3C98F",
    slug: "naruto-manga-motion",
    discipline: "motion",
    context: "authorial",
    year: "2023",
    roles: ["Motion graphics", "Animação 2D", "Composição"],
    tools: ["Photoshop", "After Effects"],
    copy: {
      pt: {
        title: "Manga Motion: Parallax & Ironia Narrativa",
        shortTitle: "Naruto — Manga Motion",
        summary: "Quatro painéis estáticos transformados em uma cena com profundidade e atuação.",
        description: [
          "Um experimento em animação 2D que dá vida a quatro painéis estáticos de mangá.",
          "Os planos foram reconstruídos no Photoshop; expressões, corpos e cabelos ganharam movimento no After Effects.",
          "Câmeras 3D, Null Objects e desfoque criam o parallax que conduz a cena.",
        ],
      },
      en: {
        title: "Manga Motion: Parallax and Narrative Irony",
        shortTitle: "Naruto — Manga Motion",
        summary: "Four static panels transformed into a scene with depth and performance.",
        description: [
          "A 2D animation experiment that brings four static manga panels to life.",
          "The layered scenes were rebuilt in Photoshop; expressions, bodies and hair were animated in After Effects.",
          "3D cameras, null objects and focus shifts create the scene’s deep parallax.",
        ],
      },
    },
    media: {
      kind: "video",
      sourceUrl: "https://res.cloudinary.com/amh1rowo/video/upload/q_auto,f_mp4/v1787686789/naruto.mp4",
      orientation: "portrait",
      aspectRatio: { width: 9, height: 16 },
      preview: { start: 0, duration: 5 },
    },
  },
  {
    id: "pp4",
    grade: "#E5534B",
    slug: "fight-club-peso-projecao",
    discipline: "motion",
    context: "authorial",
    year: "2023",
    roles: ["Edição", "Color grading", "Motion tracking"],
    tools: ["After Effects", "Magic Bullet Looks"],
    copy: {
      pt: {
        title: "Fight Club: O Peso da Projeção",
        shortTitle: "Fight Club",
        summary: "Uma montagem crua sobre expectativa, identidade e ruptura.",
        description: [
          "Uma peça conceitual sobre a incapacidade de alcançar as próprias expectativas, tratando Tyler Durden como sintoma da mente do protagonista.",
          "Difusão, cor e luz criam uma atmosfera irreal; tracking e glitches rompem a imagem durante o refrão de “Creep”.",
          "A montagem escolhe densidade e tensão psicológica em vez de cortes rápidos.",
        ],
      },
      en: {
        title: "Fight Club: The Weight of Projection",
        shortTitle: "Fight Club",
        summary: "A raw edit about expectation, identity and rupture.",
        description: [
          "A conceptual piece about failing to reach your own expectations, treating Tyler Durden as a symptom of the protagonist’s mind.",
          "Diffusion, color and light create an unreal atmosphere while tracking and glitches rupture the image during the chorus.",
          "The edit favors density and psychological tension over rapid cuts.",
        ],
      },
    },
    media: {
      kind: "video",
      sourceUrl: "https://res.cloudinary.com/amh1rowo/video/upload/q_auto,f_mp4/v1787687152/creep_fight_club.mp4",
      orientation: "landscape",
      aspectRatio: { width: 16, height: 9 },
      preview: { start: 10, duration: 5 },
    },
  },
  {
    id: "vid2",
    grade: "#A1B8D5",
    slug: "workshop-df-previcom",
    discipline: "motion",
    context: "institutional",
    year: "2025",
    roles: ["Captação", "Edição", "Motion graphics"],
    tools: ["Premiere Pro", "After Effects"],
    copy: {
      pt: {
        title: "1º Workshop DF-Previcom: Do Play ao Render",
        shortTitle: "Workshop DF-Previcom",
        summary: "Cobertura audiovisual completa, da captação ao primeiro outro oficial da marca.",
        description: [
          "Cobertura audiovisual completa do primeiro workshop da organização, pensada para consumo rápido nas redes.",
          "Fui responsável por toda a pipeline, desde a captação no local até a montagem final.",
          "Na pós-produção, criei e animei o primeiro outro oficial da marca.",
        ],
      },
      en: {
        title: "1st DF-Previcom Workshop: From Shoot to Render",
        shortTitle: "DF-Previcom Workshop",
        summary: "A complete production, from on-site capture to the brand’s first official outro.",
        description: [
          "Complete coverage of the organization’s first workshop, designed for fast social consumption.",
          "I owned the full pipeline, from on-location capture to final editing.",
          "In post-production, I created and animated the brand’s first official outro.",
        ],
      },
    },
    media: {
      kind: "video",
      sourceUrl: "https://res.cloudinary.com/amh1rowo/video/upload/q_auto,f_mp4/v1787688159/V%C3%ADdeo_-_Workshop_o_futuro_da_DF-PREVICOM.mp4",
      orientation: "portrait",
      aspectRatio: { width: 9, height: 16 },
      preview: { start: 0, duration: 6 },
    },
  },
  {
    id: "vid3",
    slug: "conselho-deliberativo",
    discipline: "motion",
    context: "institutional",
    year: "2025",
    roles: ["Edição", "Motion graphics", "Google Earth Studio"],
    tools: ["Google Earth Studio", "After Effects", "Premiere Pro"],
    copy: {
      pt: {
        title: "Conselho Deliberativo: O Fator Retenção",
        shortTitle: "Conselho Deliberativo",
        summary: "Um hook espacial para transformar uma pauta burocrática em conteúdo de retenção.",
        description: [
          "O desafio era comunicar uma reunião de conselho sem imagens de apoio do local.",
          "A abertura no Google Earth Studio mergulha do espaço até a sede e termina em uma órbita que simula um voo de drone.",
          "A solução contornou a limitação de captação e quebrou o padrão visual do feed.",
        ],
      },
      en: {
        title: "Deliberative Council: The Retention Hook",
        shortTitle: "Deliberative Council",
        summary: "A spatial hook turning a bureaucratic topic into attention-retaining content.",
        description: [
          "The challenge was to communicate a council meeting without supporting footage from the venue.",
          "The Google Earth Studio opening dives from space to the building and ends in a simulated drone orbit.",
          "The solution overcame the capture limitation and broke the visual pattern of the feed.",
        ],
      },
    },
    media: {
      kind: "video",
      sourceUrl: "https://res.cloudinary.com/amh1rowo/video/upload/q_auto,f_mp4/v1787689778/V%C3%ADdeo_-_CLDF_CD_Itinerante.mp4",
      posterAt: 4,
      orientation: "portrait",
      aspectRatio: { width: 9, height: 16 },
      preview: { start: 0, duration: 5 },
    },
  },
  {
    id: "dc1",
    slug: "halloween-verdadeiro-medo",
    discipline: "design",
    context: "institutional",
    year: "2025",
    homePlacement: { section: "design-showcase", order: 4 },
    roles: ["Direção de arte", "Design", "Copy"],
    tools: ["Photoshop", "Illustrator"],
    copy: {
      pt: {
        title: "Halloween: O Verdadeiro Medo",
        shortTitle: "Halloween",
        summary: "Uma metáfora visual conecta a data comemorativa ao core da marca.",
        description: [
          "A proposta foge do clichê comemorativo e usa a estética do Halloween para aproximar o público do tema de previdência.",
          "A falta de planejamento financeiro se torna o verdadeiro monstro a ser evitado, conectando impacto visual e mensagem institucional.",
        ],
      },
      en: {
        title: "Halloween: The Real Fear",
        shortTitle: "Halloween",
        summary: "A visual metaphor connects the holiday to the brand’s core purpose.",
        description: [
          "The campaign escapes the usual seasonal cliché and uses Halloween imagery to connect with pension planning.",
          "A lack of financial preparation becomes the real monster to avoid, linking impact and institutional meaning.",
        ],
      },
    },
    media: {
      kind: "image",
      image: image("/images/halloween.png", "Peça de Halloween da DF-Previcom", "DF-Previcom Halloween campaign"),
    },
  },
  {
    id: "dc2",
    slug: "dia-dos-pais-composicao-profundidade",
    discipline: "design",
    context: "institutional",
    year: "2025",
    homePlacement: { section: "design-showcase", order: 5 },
    roles: ["Direção de arte", "Design", "Tratamento de imagem"],
    tools: ["Photoshop", "Illustrator"],
    copy: {
      pt: {
        title: "Dia dos Pais: Composição e Profundidade",
        shortTitle: "Dia dos Pais",
        summary: "Recortes, planos e tipografia constroem uma peça institucional acolhedora.",
        description: [
          "Máscaras de recorte na tipografia e separação de planos criam profundidade sem perder clareza.",
          "O resultado é uma peça limpa e equilibrada que preserva uma sensação de acolhimento.",
        ],
      },
      en: {
        title: "Father’s Day: Composition and Depth",
        shortTitle: "Father’s Day",
        summary: "Clipping, layering and typography create a warm institutional piece.",
        description: [
          "Typographic clipping masks and clear separation between planes create depth without sacrificing clarity.",
          "The result is a clean, balanced piece with a warm institutional tone.",
        ],
      },
    },
    media: {
      kind: "image",
      image: image("/images/dia-dos-pais-noise.png", "Peça institucional de Dia dos Pais", "Institutional Father’s Day artwork"),
    },
  },
  {
    id: "dc3",
    slug: "dia-das-criancas-educacao-conscientizacao",
    discipline: "design",
    context: "institutional",
    year: "2025",
    homePlacement: { section: "design-showcase", order: 6 },
    roles: ["Direção de arte", "Design", "Copy"],
    tools: ["Photoshop", "Illustrator"],
    copy: {
      pt: {
        title: "Dia das Crianças: Educação e Conscientização",
        shortTitle: "Dia das Crianças",
        summary: "Educação financeira e leitura imediata ocupam o centro da campanha.",
        description: [
          "Em vez de uma simples parabenização, a peça conecta a data ao pilar educacional da instituição.",
          "O layout prioriza clareza, contraste e legibilidade para tornar a mensagem acessível no feed.",
        ],
      },
      en: {
        title: "Children’s Day: Education and Awareness",
        shortTitle: "Children’s Day",
        summary: "Financial education and immediate readability sit at the center of the campaign.",
        description: [
          "Rather than a generic greeting, the campaign connects the date to the institution’s educational mission.",
          "The layout prioritizes clarity, contrast and feed readability.",
        ],
      },
    },
    media: {
      kind: "image",
      image: image("/images/post dia das crianças.png", "Peça de Dia das Crianças sobre educação financeira", "Children’s Day artwork about financial education"),
    },
  },
  {
    id: "car1",
    slug: "traducao-visual-temas-complexos",
    discipline: "design",
    context: "institutional",
    year: "2025",
    homePlacement: { section: "design-showcase", order: 1 },
    roles: ["Direção de arte", "Design editorial", "Diagramação"],
    tools: ["Photoshop", "Illustrator"],
    copy: {
      pt: {
        title: "Tradução Visual de Temas Complexos",
        shortTitle: "Conselho em linguagem visual",
        summary: "Hierarquia e respiro tornam uma estrutura estatutária compreensível.",
        description: [
          "O desafio era explicar a estrutura burocrática de um órgão estatutário de forma acessível.",
          "Hierarquia tipográfica, respiros e uma sequência direta provam que a comunicação institucional pode ser leve sem perder precisão.",
        ],
      },
      en: {
        title: "Making Complex Topics Visual",
        shortTitle: "Council, made visual",
        summary: "Hierarchy and space make a statutory structure understandable.",
        description: [
          "The challenge was to explain a bureaucratic statutory structure in an accessible way.",
          "Typographic hierarchy, generous spacing and a direct sequence keep the communication light without losing precision.",
        ],
      },
    },
    media: {
      kind: "gallery",
      images: [1, 2, 3, 4, 5].map((number) =>
        image(`/images/O-QUE-É-CD-PROJ_0${number}.png`, `Slide ${number} do carrossel sobre Conselho Deliberativo`, `Slide ${number} of the Deliberative Council carousel`),
      ),
    },
  },
  {
    id: "car2",
    slug: "educacao-financeira-leitura-fluida",
    discipline: "design",
    context: "institutional",
    year: "2025",
    homePlacement: { section: "design-showcase", order: 2 },
    roles: ["Direção de arte", "Design editorial", "Diagramação"],
    tools: ["Photoshop", "Illustrator"],
    copy: {
      pt: {
        title: "Educação Financeira: Leitura Fluida",
        shortTitle: "Educação Financeira",
        summary: "Uma composição contínua transforma informação densa em jornada guiada.",
        description: [
          "Para reter atenção em um tema denso, o carrossel foi desenhado como uma composição contínua.",
          "Uma linha guia conecta os quadros e conduz a leitura naturalmente até o call to action.",
        ],
      },
      en: {
        title: "Financial Education: A Fluid Read",
        shortTitle: "Financial Education",
        summary: "A continuous composition turns dense information into a guided journey.",
        description: [
          "To hold attention around a dense topic, the carousel was designed as one continuous composition.",
          "A visual guide connects each frame and leads naturally to the final call to action.",
        ],
      },
    },
    media: {
      kind: "gallery",
      images: [1, 2, 3, 4, 5].map((number) =>
        image(`/images/proj-educacao-financeira_0${number}.png`, `Slide ${number} do carrossel de educação financeira`, `Slide ${number} of the financial education carousel`),
      ),
    },
  },
  {
    id: "car3",
    slug: "inbound-marketing-agora-futuro",
    discipline: "design",
    context: "institutional",
    year: "2025",
    homePlacement: { section: "design-showcase", order: 3 },
    roles: ["Direção de arte", "Design editorial", "Copy"],
    tools: ["Photoshop", "Illustrator"],
    copy: {
      pt: {
        title: "Inbound Marketing: O Agora e o Futuro",
        shortTitle: "Reserva de Emergência",
        summary: "Uma narrativa didática conecta imprevistos à proteção de longo prazo.",
        description: [
          "A peça de topo de funil foi construída para desmistificar a reserva de emergência.",
          "Blocos de cor, hierarquia e a metáfora do guarda-chuva conectam uma dor imediata à proteção de longo prazo.",
        ],
      },
      en: {
        title: "Inbound Marketing: Now and Later",
        shortTitle: "Emergency Fund",
        summary: "A didactic narrative connects unexpected expenses to long-term protection.",
        description: [
          "This top-of-funnel piece was designed to demystify emergency funds.",
          "Color blocks, hierarchy and an umbrella metaphor connect an immediate pain point to long-term protection.",
        ],
      },
    },
    media: {
      kind: "gallery",
      images: [1, 2, 3, 4].map((number) =>
        image(`/images/post---reserva-de-emergencia_0${number}.png`, `Slide ${number} do carrossel sobre reserva de emergência`, `Slide ${number} of the emergency fund carousel`),
      ),
    },
  },
];

export const featuredProjects = projects
  .filter((project) => project.homePlacement?.section === "motion-featured")
  .sort((a, b) => (a.homePlacement?.order ?? 0) - (b.homePlacement?.order ?? 0));

const isLandscapeVideo = (project: Project): project is VideoProject =>
  project.media.kind === "video" && project.media.orientation === "landscape";

export const reelProjects: readonly VideoProject[] = [
  ...featuredProjects,
  ...projects.filter((project) => !project.homePlacement),
].filter(isLandscapeVideo);

export const verticalProjects: readonly VideoProject[] = projects.filter(
  (project): project is VideoProject => project.media.kind === "video" && project.media.orientation === "portrait",
);

export const designProjects = projects
  .filter((project) => project.homePlacement?.section === "design-showcase")
  .sort((a, b) => (a.homePlacement?.order ?? 0) - (b.homePlacement?.order ?? 0));

export function getPosterTime(media: VideoProject["media"]) {
  return media.posterAt ?? media.preview.start;
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const currentIndex = projects.findIndex((project) => project.slug === slug);
  if (currentIndex === -1) return undefined;
  return {
    previous: projects[(currentIndex - 1 + projects.length) % projects.length],
    next: projects[(currentIndex + 1) % projects.length],
  };
}
