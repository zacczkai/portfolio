import type { Language, Project, ProjectContext, ProjectDiscipline } from "./projects";

export const uiCopy = {
  pt: {
    nav: {
      work: "Motion",
      design: "Design",
      archive: "Arquivo",
      about: "Sobre",
      contact: "Contato",
      menu: "Menu principal",
      open: "Abrir menu",
      close: "Fechar menu",
    },
    hero: {
      eyebrow: "ENZO GUERREIRO — MOTION & DIREÇÃO DE ARTE",
      title: "Imagens que carregam o ritmo da ideia.",
      description: "Direção de arte, edição e motion para histórias que precisam ser sentidas antes de serem explicadas.",
      workCta: "Ver motion",
      designCta: "Ver design",
      availability: "Disponível para projetos e oportunidades",
      reelLabel: "Showreel selecionado",
    },
    reel: {
      role: "Motion e direção de arte",
      view: "Ver projeto",
      timeline: "Linha do tempo dos projetos",
      goTo: "Ir para",
    },
    verticals: {
      title: "Cortes verticais.",
      description: "Três peças mostradas no formato de celular em que foram feitas.",
      open: "Ver projeto",
    },
    featured: {
      label: "Trabalhos selecionados",
      title: "Movimento como linguagem.",
      open: "Abrir projeto",
    },
    design: {
      label: "Design & carrosséis",
      title: "Ideias que continuam quando o vídeo para.",
      description: "Direção de arte, composição e narrativa editorial pensadas para a experiência real do feed.",
      carouselLabel: "Carrossel editorial",
      slideUnit: "lâminas",
      staticTitle: "Peças estáticas, presença imediata.",
      open: "Abrir case",
    },
    archive: {
      label: "Arquivo",
      title: "Todos os trabalhos.",
      description: "Motion e design em um só índice.",
      open: "Ver case",
    },
    about: {
      label: "Sobre",
      title: "Estratégia no conceito. Precisão na execução.",
      body: "Estudante de Publicidade e Propaganda com experiência em comunicação corporativa, design de interfaces e desenvolvimento de produtos digitais, unindo criatividade, dados e tecnologia para resolver problemas complexos e criar narrativas visuais eficientes.",
      capabilities: "Direção de arte, motion graphics, edição, sound design, color grading e branding.",
      photoAlt: "Retrato de Enzo Guerreiro",
      tabs: {
        bio: "Visão",
        experience: "Trajetória",
        skills: "Habilidades",
      },
      downloadCv: "Baixar Currículo (PDF)",
      location: "Brasília, DF. Disponível para projetos remotos ou presenciais.",
      educationLabel: "Formação Acadêmica",
      experienceLabel: "Experiência Profissional",
      experiences: [
        {
          period: "2026 — Presente",
          role: "Fundador",
          company: "Alpha Investimentos",
          description: "Desenvolvimento de ponta a ponta de produto digital fintech. Visão de negócios, ideação, branding, UX e aplicação prática de IA generativa em processos operacionais.",
        },
        {
          period: "2025 — Presente",
          role: "Estagiário de Comunicação",
          company: "DF-PREVICOM",
          description: "Planejamento mensal e anual, gestão de e-mail marketing, produção audiovisual para redes e suporte na captação de eventos corporativos.",
        },
        {
          period: "2024 — 2025",
          role: "Estagiário de Comunicação",
          company: "Infraero Aeroportos",
          description: "Gravação e edição de vídeos de endomarketing, videoaulas para universidade corporativa e criação de artes para comunicação interna.",
        },
        {
          period: "2023 — 2025",
          role: "Professor de Inglês",
          company: "Wizard by Pearson",
          description: "Planejamento e ministração de aulas de inglês presenciais e online.",
        },
      ],
      education: [
        {
          institution: "IDP",
          course: "Publicidade e Propaganda",
          status: "Cursando 6º semestre (Matutino)",
        },
        {
          institution: "UnB",
          course: "Estatística",
          status: "Cursado de 2021 a 2023",
        },
      ],
      skills: [
        {
          category: "Design & Audiovisual",
          items: "Photoshop, Illustrator, Premiere Pro, After Effects, Figma",
        },
        {
          category: "Inovação & Produtividade",
          items: "Aplicação prática de IA Generativa (ChatGPT, Claude) em fluxos de trabalho",
        },
        {
          category: "Marketing Estratégico",
          items: "RD Station, CRM, Pacote Office, Trello",
        },
        {
          category: "Idiomas",
          items: "Inglês Avançado/Fluente (C2), Português (Nativo)",
        },
      ],
    },
    contact: {
      label: "Contato",
      title: "Tem uma história que precisa ganhar movimento?",
      cta: "Vamos conversar",
      rights: "Todos os direitos reservados.",
    },
    case: {
      back: "Voltar aos trabalhos",
      project: "Projeto",
      role: "Atuação",
      tools: "Ferramentas",
      fullVideo: "Reprodução completa do projeto",
      previous: "Anterior",
      next: "Próximo",
      unavailable: "A prévia não pôde ser carregada.",
      loadingVideo: "Carregando informações do vídeo…",
      videoError: "Não foi possível carregar o vídeo.",
      retry: "Tentar novamente",
      slide: "Slide",
      of: "de",
      previousSlide: "Slide anterior",
      nextSlide: "Próximo slide",
    },
  },
  en: {
    nav: {
      work: "Motion",
      design: "Design",
      archive: "Archive",
      about: "About",
      contact: "Contact",
      menu: "Main menu",
      open: "Open menu",
      close: "Close menu",
    },
    hero: {
      eyebrow: "ENZO GUERREIRO — MOTION & ART DIRECTION",
      title: "Images that carry the rhythm of an idea.",
      description: "Art direction, editing and motion for stories that need to be felt before they are explained.",
      workCta: "View motion",
      designCta: "View design",
      availability: "Available for projects and opportunities",
      reelLabel: "Selected showreel",
    },
    reel: {
      role: "Motion and art direction",
      view: "View project",
      timeline: "Project timeline",
      goTo: "Go to",
    },
    verticals: {
      title: "Vertical cuts.",
      description: "Three pieces shown in the phone format they were made for.",
      open: "View project",
    },
    featured: {
      label: "Selected work",
      title: "Movement as a language.",
      open: "Open project",
    },
    design: {
      label: "Design & carousels",
      title: "Ideas that continue when motion stops.",
      description: "Art direction, composition and editorial narratives designed for the real feed experience.",
      carouselLabel: "Editorial carousel",
      slideUnit: "slides",
      staticTitle: "Static work, immediate presence.",
      open: "Open case",
    },
    archive: {
      label: "Archive",
      title: "All work.",
      description: "Motion and design in a single index.",
      open: "View case",
    },
    about: {
      label: "About",
      title: "Strategy in the concept. Precision in the execution.",
      body: "Advertising student experienced in corporate communications, interface design and digital product development — combining creativity, data and technology to solve complex problems and create high-impact visual narratives.",
      capabilities: "Art direction, motion graphics, editing, sound design, color grading and branding.",
      photoAlt: "Portrait of Enzo Guerreiro",
      tabs: {
        bio: "Vision",
        experience: "Experience",
        skills: "Skills",
      },
      downloadCv: "Download Resume (PDF)",
      location: "Brasília, Brazil. Available for remote and on-site projects.",
      educationLabel: "Academic Background",
      experienceLabel: "Professional Experience",
      experiences: [
        {
          period: "2026 — Present",
          role: "Founder",
          company: "Alpha Investimentos",
          description: "End-to-end development of a fintech digital product. Business vision, ideation, branding, visual identity, UX design and practical AI workflow automation.",
        },
        {
          period: "2025 — Present",
          role: "Communications Intern",
          company: "DF-PREVICOM",
          description: "Communication planning, email marketing, audiovisual social media content and corporate event support.",
        },
        {
          period: "2024 — 2025",
          role: "Communications Intern",
          company: "Infraero Aeroportos",
          description: "Filming and editing internal marketing videos, corporate e-learning and internal communication visual assets.",
        },
        {
          period: "2023 — 2025",
          role: "English Teacher",
          company: "Wizard by Pearson",
          description: "Planning and teaching in-person and online English classes.",
        },
      ],
      education: [
        {
          institution: "IDP",
          course: "Advertising and Marketing",
          status: "6th semester (Morning)",
        },
        {
          institution: "UnB",
          course: "Statistics",
          status: "Attended 2021 to 2023",
        },
      ],
      skills: [
        {
          category: "Design & Audiovisual",
          items: "Photoshop, Illustrator, Premiere Pro, After Effects, Figma",
        },
        {
          category: "Innovation & Productivity",
          items: "Practical use of Generative AI (ChatGPT, Claude) in creative workflows",
        },
        {
          category: "Strategic Marketing",
          items: "RD Station, CRM, Office Suite, Trello",
        },
        {
          category: "Languages",
          items: "Fluent English (C2), Native Portuguese",
        },
      ],
    },
    contact: {
      label: "Contact",
      title: "Have a story that needs to move?",
      cta: "Let’s talk",
      rights: "All rights reserved.",
    },
    case: {
      back: "Back to work",
      project: "Project",
      role: "Role",
      tools: "Tools",
      fullVideo: "Full project playback",
      previous: "Previous",
      next: "Next",
      unavailable: "The preview could not be loaded.",
      loadingVideo: "Loading video information…",
      videoError: "The video could not be loaded.",
      retry: "Try again",
      slide: "Slide",
      of: "of",
      previousSlide: "Previous slide",
      nextSlide: "Next slide",
    },
  },
} satisfies Record<Language, object>;

export const disciplineLabels: Record<Language, Record<ProjectDiscipline, string>> = {
  pt: {
    motion: "Motion",
    design: "Design",
  },
  en: {
    motion: "Motion",
    design: "Design",
  },
};

export const contextLabels: Record<Language, Record<ProjectContext, string>> = {
  pt: { authorial: "autoral", institutional: "institucional" },
  en: { authorial: "original", institutional: "institutional" },
};

const roleLabels: Record<Language, Record<string, string>> = {
  pt: {},
  en: {
    "Direção de arte": "Art direction",
    "Edição": "Editing",
    "Animação 2D": "2D animation",
    "Composição": "Compositing",
    "Captação": "Filming",
    "Tratamento de imagem": "Image retouching",
    "Design editorial": "Editorial design",
    "Diagramação": "Layout design",
  },
};

export function localizeRole(language: Language, role: string) {
  return roleLabels[language][role] ?? role;
}

export function getProjectLabel(language: Language, project: Pick<Project, "discipline" | "context">) {
  return `${disciplineLabels[language][project.discipline]} ${contextLabels[language][project.context]}`;
}
