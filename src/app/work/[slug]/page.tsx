import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { getCaseStudies, getCaseStudy } from "@/lib/get-projects";
import { getProjectSummary, getShortTechLabel, refinePortfolioCopy, toProjectId } from "@/lib/project";
import { SITE } from "@/data/site";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

const STAR_SECTIONS = [
  ["situation", "Situation"],
  ["task", "Task"],
  ["action", "Action"],
  ["result", "Result"],
] as const;

export async function generateStaticParams() {
  return (await getCaseStudies()).map(project => ({ slug: toProjectId(project.title) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCaseStudy(slug);
  if (!project) return {};

  const title = project.title.trim();
  const description = getProjectSummary(title, project.oneLiner || project.description);
  const url = `${SITE.url}/work/${slug}`;
  const image = project.thumbnail
    ? { url: project.thumbnail, alt: `${title} project preview` }
    : { url: `${SITE.url}/brand/social/thunderboy-share.png`, width: 1200, height: 630, alt: "Thunderboy — Creative Technologist" };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} — ${SITE.name}`, description, url, siteName: SITE.name, type: "article", locale: "en_NG", images: [image] },
    twitter: { card: "summary_large_image", title: `${title} — ${SITE.name}`, description, images: [image] },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = await getCaseStudy(slug);
  if (!project) notFound();

  const title = project.title.trim();
  const technologies = project.techStack
    .flatMap(value => getShortTechLabel(value).split(","))
    .map(value => value.trim())
    .filter(Boolean);
  const sections = STAR_SECTIONS
    .map(([key, label]) => ({ key, label, body: refinePortfolioCopy(project.star[key]) }))
    .filter(section => section.body);

  return (
    <article className="pb-16 pt-24 sm:pt-32 md:pb-24">
      <div className="site-shell">
        <Link href={`/projects#${slug}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/70 transition-colors hover:text-voltage">
          <ArrowLeft aria-hidden="true" size={16} /> All work
        </Link>

        <header className="surface-panel mt-4 overflow-hidden rounded-[2rem]">
          <div className="p-5 sm:p-10 md:p-12">
            <p className="meta-label text-voltage">Case study</p>
            <h1 className="display-heading mt-5 text-balance text-[clamp(2.25rem,7vw,5.5rem)]">{title}</h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              {getProjectSummary(title, project.oneLiner || project.description)}
            </p>
            {technologies.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${title} technologies`}>
                {technologies.map(technology => (
                  <li key={technology} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/70">
                    {technology}
                  </li>
                ))}
              </ul>
            )}
            {(project.liveUrl || project.githubUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a href={project.liveUrl} aria-label={`View ${title} live site`} target="_blank" rel="noopener noreferrer" className="button-primary">
                    Live site <ArrowUpRight aria-hidden="true" size={16} />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} aria-label={`View ${title} source code`} target="_blank" rel="noopener noreferrer" className="button-secondary">
                    <Github aria-hidden="true" size={16} /> Source
                  </a>
                )}
              </div>
            )}
          </div>
          {project.thumbnail && (
            <div className="relative aspect-[16/9] border-t border-white/10 bg-storm">
              <Image src={project.thumbnail} alt={`${title} project preview`} fill priority sizes="(min-width: 1280px) 76rem, 100vw" className="object-cover object-top" />
            </div>
          )}
        </header>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {sections.map(section => (
            <section key={section.key} aria-labelledby={`${section.key}-heading`} className="surface-panel rounded-[1.75rem] p-5 sm:p-8">
              <h2 id={`${section.key}-heading`} className="font-display text-3xl font-bold leading-tight">{section.label}</h2>
              <p className="mt-4 whitespace-pre-line leading-7 text-white/75">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="surface-panel mt-5 flex flex-col gap-7 rounded-[2rem] p-6 sm:p-10 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            <p className="meta-label text-voltage">Want to know more?</p>
            <h2 className="display-heading mt-4 max-w-3xl text-[clamp(2.25rem,5vw,4rem)]">Ask me about {title}.</h2>
          </div>
          <Link href="/contact" className="button-primary shrink-0">
            Get in touch <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
