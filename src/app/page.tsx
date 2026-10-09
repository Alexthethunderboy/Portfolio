import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/layout/Hero";
import ProjectGrid from "@/components/layout/ProjectGrid";
import TechStack from "@/components/layout/TechStack";
import { getProjects } from "@/lib/get-projects";
import { SITE } from "@/data/site";
import { getProjectSummary, getShortTechLabel } from "@/lib/project";

export const revalidate = 60;

export const metadata: Metadata = {
  title: { absolute: `${SITE.preferredName} — ${SITE.descriptor}` },
  description: SITE.description,
  alternates: { canonical: "/" },
};

async function getSelectedProjects() {
  return (await getProjects()).slice(0, 4).map(project => ({
    title: project.title,
    description: getProjectSummary(project.title, project.oneLiner || project.description),
    tags: project.techStack.flatMap(value => getShortTechLabel(value).split(",")).map(value => value.trim()).filter(Boolean),
    thumbnail: project.thumbnail,
  }));
}

export default async function Homepage() {
  const projects = await getSelectedProjects();

  return (
    <>
      <Hero />
      <ProjectGrid projects={projects} />
      <TechStack />

      <section className="pb-16 md:pb-24">
        <div className="site-shell">
          <div className="surface-panel grid gap-8 rounded-[2rem] p-6 sm:p-10 md:grid-cols-12 md:items-end md:p-12">
            <div className="md:col-span-8">
              <p className="meta-label text-voltage">Have something in mind?</p>
              <h2 className="display-heading mt-4 text-balance text-[clamp(2.25rem,5vw,4rem)]">
                Tell me what you&apos;re working on.
              </h2>
            </div>
            <div className="md:col-span-4">
              <p className="mb-7 leading-7 text-white/60">
                Send me the idea, the problem, or even the rough version. We can start from there.
              </p>
              <Link href="/contact" className="button-primary">
                Get in touch <ArrowUpRight aria-hidden="true" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
