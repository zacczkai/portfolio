"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ProjectCarousel from "@/components/ProjectCarousel";
import { designProjects } from "@/data/projects";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

const GUTTER = "mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16";
const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sala focus-visible:ring-offset-2 focus-visible:ring-offset-mesa";

export default function DesignShowcase() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].design;
  const carousels = designProjects.filter((project) => project.media.kind === "gallery");
  const staticPosts = designProjects.filter((project) => project.media.kind === "image");

  return (
    <section id="design" className="scroll-mt-16 bg-mesa text-sala">
      <header className={`${GUTTER} grid gap-6 pb-14 pt-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,.6fr)] lg:items-end lg:gap-12 lg:pb-20 lg:pt-32`}>
        <h2 className="type-display max-w-[15ch] text-balance text-[clamp(3.25rem,8vw,8.5rem)]">{copy.title}</h2>
        <p className="max-w-[38ch] text-pretty text-lg leading-snug text-black/70 lg:justify-self-end lg:pb-2">{copy.description}</p>
      </header>

      {carousels.map((project, index) => {
        if (project.media.kind !== "gallery") return null;
        const projectCopy = project.copy[lang];
        return (
          <article key={project.id} className="border-t border-black/15 py-10 lg:py-14">
            <div className={`${GUTTER} mb-6 grid gap-2 lg:grid-cols-[clamp(16rem,30vw,32rem)_minmax(0,1fr)_auto] lg:items-center lg:gap-10`}>
              <h3 className="type-display text-balance text-[clamp(2rem,3.4vw,3.5rem)]">{projectCopy.shortTitle}</h3>
              <div className="max-w-[56ch]">
                <p className="text-pretty text-base leading-snug">{projectCopy.summary}</p>
                <p className="mt-0.5 text-sm text-black/60">{copy.carouselLabel}, {project.media.images.length} {copy.slideUnit}.</p>
              </div>
              <Link
                href={`/projetos/${project.slug}`}
                className={`inline-flex min-h-11 w-fit items-center gap-2 font-semibold underline decoration-2 underline-offset-4 ${FOCUS}`}
              >
                {copy.open}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <ProjectCarousel
              images={project.media.images}
              language={lang}
              title={projectCopy.title}
              priority={index === 0}
              sizes="(max-width: 1023px) 82vw, 38rem"
              variant="strip"
            />
          </article>
        );
      })}

      <div className="border-t border-black/15 py-14 lg:py-20">
        <div className={GUTTER}>
          <h3 className="type-display max-w-[16ch] text-balance text-[clamp(2.5rem,5vw,5.5rem)]">{copy.staticTitle}</h3>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {staticPosts.map((project) => {
              if (project.media.kind !== "image") return null;
              return (
                <article key={project.id}>
                  <Link href={`/projetos/${project.slug}`} className={`group block ${FOCUS}`}>
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={project.media.image.src}
                        alt={project.media.image.alt[lang]}
                        fill
                        sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 46vw, 30vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="mt-3 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-semibold leading-tight">{project.copy[lang].shortTitle}</h4>
                        <p className="mt-1 text-pretty text-sm leading-snug text-black/65">{project.copy[lang].summary}</p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
