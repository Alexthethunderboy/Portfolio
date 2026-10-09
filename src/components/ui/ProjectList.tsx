import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";
import { getProjectSummary, getShortTechLabel, toProjectId } from "@/lib/project";

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <>
      <section className="px-4 pb-8 pt-24 sm:pb-14 text-center sm:px-6 sm:pt-32 md:pb-20">
        <div className="surface-panel mx-auto max-w-5xl rounded-[2rem] px-5 py-8 sm:rounded-[2.5rem] sm:px-10 sm:py-16">
          <p className="meta-label text-voltage">Work</p>
          <h1 className="display-heading mt-5 text-balance text-[clamp(2.25rem,7vw,5.5rem)]">Selected work &amp; experiments.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            A mix of products, experiments, and personal spaces. Each one taught me something different.
          </p>
        </div>
      </section>

      {projects.length > 0 ? (
        <section aria-label="Projects" className="pb-16 md:pb-24">
          <div className="site-shell grid gap-5 md:grid-cols-2">
            {projects.map((project, index) => {
              const projectTitle = project.title.trim();
              const isWide = false;
              const technologies = project.techStack
                .flatMap(value => getShortTechLabel(value).split(","))
                .map(value => value.trim())
                .filter(Boolean)
                .slice(0, 4);

              return (
                <article
                  key={project.id}
                  id={toProjectId(projectTitle)}
                  className={`surface-panel min-w-0 scroll-mt-28 overflow-hidden rounded-[1.75rem] ${isWide ? "md:col-span-2" : ""}`}
                >
                  <div className={`relative overflow-hidden bg-storm ${isWide ? "aspect-[16/8]" : "aspect-[16/9]"}`}>
                    {project.thumbnail ? <Image
                      src={project.thumbnail}
                      alt={`${projectTitle} project preview`}
                      fill
                      priority={index === 0 && Boolean(project.thumbnail)}
                      sizes={isWide ? "(min-width: 768px) 76rem, 100vw" : "(min-width: 768px) 38rem, 100vw"}
                      className="object-cover object-top transition-transform duration-700 ease-tb-out hover:scale-[1.02]"
                    /> : <div className="flex h-full items-center justify-center px-6"><span className="font-display text-4xl font-bold text-white/80">{projectTitle}</span></div>}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-carbon/15 via-transparent to-transparent" />
                  </div>

                  <div className={`p-5 sm:p-8 ${isWide ? "md:grid md:grid-cols-12 md:gap-8" : ""}`}>
                    <div className={isWide ? "md:col-span-5" : ""}>
                      <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{projectTitle}</h2>
                      {technologies.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${projectTitle} technologies`}>
                          {technologies.map((technology) => (
                            <li key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
                              {technology}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div className={`mt-5 sm:mt-7 ${isWide ? "md:col-span-7 md:mt-0" : ""}`}>
                      <p className="text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
                        {getProjectSummary(projectTitle, project.oneLiner || project.description)}
                      </p>
                      {project.notes && (
                        <details className="group mt-6 border-t border-white/15 pt-4">
                          <summary className="flex min-h-11 cursor-pointer items-center justify-between font-bold text-voltage">Project notes <span aria-hidden="true" className="text-xl transition-transform group-open:rotate-45">+</span></summary>
                          <dl className="mt-5 space-y-5 text-sm leading-7 text-white/70">
                            {[ ["Aim", project.notes.aim], ["Approach", project.notes.approach], ["Scope", project.notes.scope] ].map(([label, body]) => (
                              <div key={label}><dt className="font-bold text-white">{label}</dt><dd className="mt-1">{body}</dd></div>
                            ))}
                          </dl>
                        </details>
                      )}
                      <div className="mt-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} aria-label={`View ${projectTitle} live site`} target="_blank" rel="noopener noreferrer" className="button-primary">
                            Live site <ArrowUpRight aria-hidden="true" size={16} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} aria-label={`View ${projectTitle} source code`} target="_blank" rel="noopener noreferrer" className="button-secondary">
                            <Github aria-hidden="true" size={16} /> Source
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : (
        <section className="pb-16 md:pb-24">
          <div className="site-shell">
            <div className="surface-panel rounded-[2rem] p-10 text-center">
              <h2 className="font-display text-4xl font-bold">The project list is unavailable right now.</h2>
              <p className="mx-auto mt-4 max-w-xl leading-7 text-white/[0.58]">
                My public repositories are still available on GitHub while the page reconnects.
              </p>
              <a href="https://github.com/Alexthethunderboy" target="_blank" rel="noopener noreferrer" className="button-primary mt-8">
                Visit GitHub <ArrowUpRight aria-hidden="true" size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      <section className="pb-16 md:pb-24">
        <div className="site-shell">
          <div className="surface-panel flex flex-col gap-7 rounded-[2rem] p-6 sm:p-10 md:flex-row md:items-end md:justify-between md:p-12">
            <div>
              <p className="meta-label text-voltage">Want to know more?</p>
              <h2 className="display-heading mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)]">Ask me about the work.</h2>
            </div>
            <Link href="/contact" className="button-primary shrink-0">
              Get in touch <ArrowUpRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
