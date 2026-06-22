import React from "react";
import TechStack from "@/components/layout/TechStack";
import Hero from "@/components/layout/Hero";
import ProjectGrid from "@/components/layout/ProjectGrid";
import { client } from "@/sanity/lib/client";

export const revalidate = 60;

export const metadata = {
  title: 'Home | Kelechi Alexander Ugoh',
  description: 'Enterprise-ready software engineering portfolio focusing on performance, scalability, and recruiter-centric UX.',
};

export default async function Homepage() {
  const query = `*[_type == "project"] | order(_createdAt desc)[0...3] {
    title,
    oneLiner,
    description,
    techStack,
    liveUrl,
    githubUrl
  }`;

  const sanityProjects = await client.fetch(query);

  const mappedProjects = sanityProjects.map((p: any) => ({
    title: p.title || '',
    description: p.oneLiner || p.description || '',
    link: p.liveUrl || p.githubUrl || '#',
    tags: p.techStack || []
  }));

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Hero />

      {/* Selected Projects */}
      <section className="w-full relative py-10 z-10">
        <ProjectGrid projects={mappedProjects} />
      </section>

      {/* Tech Pill Row (Recruiter UX) */}
      <section className="w-full py-20 relative z-10">
        <TechStack />
      </section>
    </div>
  );
}
