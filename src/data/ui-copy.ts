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
      staticLabel: "Peça estática",
      open: "Abrir case",
    },
    archive: {
      label: "Arquivo",
      title: "Outros trabalhos, o mesmo rigor.",
      description: "Design institucional, conteúdo editorial e experimentos audiovisuais organizados sem ruído.",
      open: "Ver case",
    },
    about: {
      label: "Sobre",
      title: "Estratégia no conceito. Precisão na execução.",
      body: "Sou estudante de Publicidade e atuo entre design, audiovisual e estratégia. Gosto de transformar temas densos em mensagens claras — do primeiro frame ao acabamento de cor, ritmo e som.",
      capabilities: "Direção de arte · Motion graphics · Edição · Sound design · Color grading · Branding",
      photoAlt: "Retrato de Enzo Guerreiro",
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
      staticLabel: "Static artwork",
      open: "Open case",
    },
    archive: {
      label: "Archive",
      title: "Different formats, the same rigor.",
      description: "Institutional design, editorial content and audiovisual experiments organized without noise.",
      open: "View case",
    },
    about: {
      label: "About",
      title: "Strategy in the concept. Precision in the execution.",
      body: "I study Advertising and work across design, audiovisual and strategy. I turn dense subjects into clear messages — from the first frame to the final pass of color, rhythm and sound.",
      capabilities: "Art direction · Motion graphics · Editing · Sound design · Color grading · Branding",
      photoAlt: "Portrait of Enzo Guerreiro",
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
