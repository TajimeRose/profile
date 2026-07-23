import type { Metadata } from "next";
import Link from "next/link";

import { ProjectMedia } from "@/components/projects/project-media";
import { Container } from "@/components/ui/container";
import { projects } from "@/content/projects";

const projectGroups = [
  {
    stage: "university" as const,
    label: "BU Projects",
    description: "University projects developed while studying Computer Science at Bangkok University.",
  },
  {
    stage: "vocational" as const,
    label: "ปวช. Projects",
    description: "Projects developed during vocational study before university.",
  },
];

export const metadata: Metadata = {
  title: "Work",
  description:
    "Frontend and creative web projects by Wongsathon Witthayakhom (TajimeRose).",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main-content">
      <section className="py-20 sm:py-28">
        <Container>
          <p className="font-mono text-xs font-semibold tracking-[0.1em] text-ember-700">
            WORK
          </p>
          <h1 className="display-balance mt-5 max-w-[12ch] font-display text-6xl leading-[0.96] font-[520] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
            Projects I&apos;ve designed and built.
          </h1>
          <p className="mt-7 max-w-[44rem] text-xl leading-9 text-ink-600">
            Responsive interfaces and practical web experiences—each developed from a real
            problem and documented honestly.
          </p>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container className="space-y-24 lg:space-y-32">
          {projectGroups.map((group) => {
            const groupedProjects = projects.filter(
              (project) => project.educationStage === group.stage,
            );

            if (groupedProjects.length === 0) return null;

            return (
              <section key={group.stage} aria-labelledby={`${group.stage}-projects-title`}>
                <header className="mb-12 grid gap-4 border-t border-line-200 pt-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                  <div>
                    <p className="font-mono text-xs font-semibold tracking-[0.1em] text-ember-700">
                      EDUCATION / {String(groupedProjects.length).padStart(2, "0")}
                    </p>
                    <h2
                      id={`${group.stage}-projects-title`}
                      className="mt-3 font-display text-4xl font-[520] tracking-[-0.045em] sm:text-5xl"
                    >
                      {group.label}
                    </h2>
                  </div>
                  <p className="max-w-[42rem] text-lg leading-8 text-ink-600">
                    {group.description}
                  </p>
                </header>

                <div className="space-y-20 lg:space-y-28">
                  {groupedProjects.map((project, index) => (
                    <article
                      key={project.slug}
                      className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
                    >
                      <div
                        className={
                          index % 2 === 1
                            ? "lg:order-2 lg:col-span-7"
                            : "lg:col-span-7"
                        }
                      >
                        <ProjectMedia
                          media={project.media[0]}
                          sizes="(min-width: 1024px) 58vw, calc(100vw - 2.5rem)"
                        />
                      </div>
                      <div
                        className={
                          index % 2 === 1
                            ? "lg:order-1 lg:col-span-5"
                            : "lg:col-span-5"
                        }
                      >
                        <p className="font-mono text-xs font-semibold text-ember-700">
                          {project.educationLabel} / {project.statusLabel}
                        </p>
                        <h3 className="mt-4 font-display text-5xl font-[520] tracking-[-0.05em]">
                          {project.title}
                        </h3>
                        <p className="mt-4 text-xl leading-8 text-ink-700">
                          {project.oneLiner}
                        </p>
                        <p className="mt-5 leading-7 text-ink-600">{project.cardCopy}</p>
                        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-600">
                          <span>{project.role}</span>
                          <span>{project.year}</span>
                        </div>
                        <Link
                          href={`/work/${project.slug}`}
                          className="mt-7 inline-flex min-h-11 items-center font-semibold text-ember-700 underline decoration-ember-500/40 underline-offset-8 hover:text-ink-900"
                        >
                          Read case study
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </Container>
      </section>
    </main>
  );
}
