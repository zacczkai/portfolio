"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { Download } from "lucide-react";
import { uiCopy } from "@/data/ui-copy";
import { useLanguage } from "@/context/LanguageContext";

const TABS = ["bio", "experience", "skills"] as const;
type TabKey = (typeof TABS)[number];

const ROW = "grid gap-x-6 gap-y-1 border-t border-white/15 py-4 sm:grid-cols-[10rem_minmax(0,1fr)]";

export default function About() {
  const { lang } = useLanguage();
  const copy = uiCopy[lang].about;
  const [activeTab, setActiveTab] = useState<TabKey>("bio");

  const moveTab = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const offset = event.key === "ArrowRight" ? 1 : -1;
    const next = TABS[(TABS.indexOf(activeTab) + offset + TABS.length) % TABS.length];
    setActiveTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section id="sobre" className="scroll-mt-16 border-t border-white/15 bg-sala py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:gap-16 lg:px-12 xl:px-16">
        <figure className="m-0 lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] max-h-[calc(100svh-10rem)] w-full overflow-hidden">
            <Image
              src="/images/minha foto.jpeg"
              alt={copy.photoAlt}
              fill
              sizes="(max-width: 1023px) 100vw, 36vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-snug text-penumbra">{copy.location}</figcaption>
        </figure>

        <div className="flex min-w-0 flex-col">
          <h2 className="type-display max-w-[16ch] text-balance text-[clamp(2.75rem,6vw,6.5rem)] text-projetor">{copy.title}</h2>

          <div role="tablist" aria-label={copy.label} onKeyDown={moveTab} className="mt-8 flex flex-wrap gap-6 border-b border-white/15">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  id={`tab-${tab}`}
                  aria-selected={isActive}
                  aria-controls={`tab-panel-${tab}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab)}
                  className={`-mb-px inline-flex min-h-11 items-center border-b-2 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-projetor ${isActive ? "border-projetor text-projetor" : "border-transparent text-penumbra hover:text-projetor"}`}
                >
                  {copy.tabs[tab]}
                </button>
              );
            })}
          </div>

          <div id={`tab-panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} className="mt-6 min-h-[18rem]">
            {activeTab === "bio" && (
              <div>
                <p className="max-w-[60ch] text-pretty text-lg leading-relaxed text-projetor sm:text-xl">{copy.body}</p>
                <p className="mt-6 max-w-[60ch] text-pretty text-base leading-relaxed text-projetor/70">{copy.capabilities}</p>
              </div>
            )}

            {activeTab === "experience" && (
              <div className="space-y-8">
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-projetor">{copy.experienceLabel}</h3>
                  <ol>
                    {copy.experiences.map((experience) => (
                      <li key={`${experience.company}-${experience.period}`} className={ROW}>
                        <span className="text-sm tabular-nums text-penumbra">{experience.period}</span>
                        <div>
                          <h4 className="text-base font-semibold text-projetor">
                            {experience.company}<span className="font-normal text-projetor/70">, {experience.role}</span>
                          </h4>
                          <p className="mt-1 max-w-[62ch] text-pretty text-sm leading-relaxed text-projetor/75">{experience.description}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-projetor">{copy.educationLabel}</h3>
                  <ul>
                    {copy.education.map((education) => (
                      <li key={education.institution} className={ROW}>
                        <span className="text-sm font-semibold text-projetor">{education.institution}</span>
                        <p className="text-sm leading-relaxed text-projetor/75">{education.course}, {education.status}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <dl>
                {copy.skills.map((skill) => (
                  <div key={skill.category} className={ROW}>
                    <dt className="text-sm font-semibold text-projetor">{skill.category}</dt>
                    <dd className="m-0 max-w-[62ch] text-pretty text-sm leading-relaxed text-projetor/75">{skill.items}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <a
            href="/curriculo-enzo-guerreiro.pdf"
            download="Curriculo-Enzo-Guerreiro.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex min-h-12 w-fit items-center gap-3 bg-projetor px-5 text-base font-semibold text-sala transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-projetor focus-visible:ring-offset-2 focus-visible:ring-offset-sala"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            {copy.downloadCv}
          </a>
        </div>
      </div>
    </section>
  );
}
