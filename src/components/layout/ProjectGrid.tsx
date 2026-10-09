import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { toProjectId } from "@/lib/project";

interface ProjectSummary {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
}

export default function ProjectGrid({ projects }: { projects: ProjectSummary[] }) {
  return (
    <section aria-labelledby="selected-work-heading" className="py-12 md:py-16">
      <div className="site-shell">
        <div className="mx-auto mb-8 max-w-2xl sm:mb-12 text-center">
          <p className="meta-label text-voltage">Selected work</p>
          <h2 id="selected-work-heading" className="display-heading mt-4 text-[clamp(2.25rem,5vw,4rem)]">
            A few things I&apos;ve built.
          </h2>
          <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
            Products, experiments, and personal projects across design and technology.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.title}
                href={`/projects#${toProjectId(project.title)}`}
                className="surface-panel group flex min-w-0 flex-col overflow-hidden rounded-[1.5rem]"
              >
                {project.thumbnail ? (
                  <div className="relative aspect-[16/9] bg-storm"><Image src={project.thumbnail} alt={`${project.title} project preview`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-top" /></div>
                ) : (
                  <div className="flex aspect-[16/9] items-center justify-center border-b border-white/10 bg-storm px-6"><span className="font-display text-4xl font-bold text-white/80">{project.title}</span></div>
                )}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-5">
                  <h3 className="font-display text-3xl font-bold leading-tight">{project.title}</h3>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/[0.07] text-white/85 transition-colors group-hover:bg-voltage group-hover:text-carbon group-focus-visible:bg-voltage group-focus-visible:text-carbon">
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </span>
                </div>
                <p className="mt-3 flex-1 leading-7 text-white/70">{project.description}</p>
                {project.tags.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.tags.slice(0, 3).map((tag) => (
                      <li key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-[1.75rem] p-8 text-center">
            <p className="text-lg font-bold">The project list is taking a moment to load.</p>
            <p className="mt-2 text-white/70">Browse the repository-backed project notes on the Work page.</p>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link href="/projects" className="button-secondary">
            See all projects <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
