import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudy from "@/components/CaseStudy";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/data/projects";
import { getCloudinaryPosterUrl } from "@/lib/cloudinary";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const copy = project.copy.pt;
  const image = project.media.kind === "video"
    ? getCloudinaryPosterUrl(project.media.sourceUrl, project.media.preview.start, 1600)
    : project.media.kind === "gallery"
      ? project.media.images[0].src
      : project.media.image.src;

  return {
    title: `${copy.shortTitle} | Enzo Guerreiro`,
    description: copy.summary,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: `${copy.shortTitle} | Enzo Guerreiro`,
      description: copy.summary,
      url: `/projetos/${project.slug}`,
      type: "article",
      images: [{ url: image, alt: copy.title }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const adjacent = getAdjacentProjects(slug);
  if (!project || !adjacent) notFound();

  return <CaseStudy project={project} previous={adjacent.previous} next={adjacent.next} />;
}
