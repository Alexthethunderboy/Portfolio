import React from 'react';
import WorkContent from './WorkContent';
import { client } from '@/sanity/lib/client';
import { Project } from '@/data/portfolio';

import { urlForImage } from '@/sanity/lib/image';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function WorkPage() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    oneLiner,
    description,
    techStack,
    liveUrl,
    githubUrl,
    thumbnail,
    star
  }`;

  const sanityProjects = await client.fetch(query);

  // Map Sanity schema to our internal Project interface
  const projects: Project[] = sanityProjects.map((p: any) => ({
    id: p._id,
    title: p.title || '',
    oneLiner: p.oneLiner || '',
    description: p.description || '',
    techStack: p.techStack || [],
    liveUrl: p.liveUrl || '',
    githubUrl: p.githubUrl || '',
    thumbnail: p.thumbnail ? urlForImage(p.thumbnail).url() : '/assets/1.png',
    star: p.star || { situation: '', task: '', action: '', result: '' }
  }));

  return <WorkContent projects={projects} />;
}
