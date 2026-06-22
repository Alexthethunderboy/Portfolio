'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const SAMPLE_PROJECTS: Project[] = [
  {
    title: 'Enterprise FinTech Dashboard',
    description: 'A high-performance financial data visualization tool built with Next.js, React Query, and Chart.js. Features real-time WebSocket integrations.',
    link: '#',
    tags: ['Next.js', 'TypeScript', 'WebSockets']
  },
  {
    title: 'E-Commerce Storefront',
    description: 'Headless e-commerce platform using Shopify Storefront API. Includes a custom cart implementation and seamless checkout flow.',
    link: '#',
    tags: ['React', 'Shopify', 'Tailwind CSS']
  },
  {
    title: 'AI Prompt Manager',
    description: 'A productivity tool for saving and organizing AI prompts. Built with a responsive glassmorphism UI and local-first architecture.',
    link: '#',
    tags: ['Next.js', 'Framer Motion', 'Zustand']
  }
];

export default function ProjectGrid({ projects = SAMPLE_PROJECTS }: { projects?: Project[] }) {
  return (
    <section className="w-full py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white liquid-heading mb-4">Selected Work</h2>
          <p className="text-zinc-400 liquid-mono">Building premium digital experiences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <a href={project.link} className="block group h-full">
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative h-full p-8 rounded-3xl liquid-glass group-hover:bg-white/[0.08] transition-colors duration-500 flex flex-col"
                >
                  {/* Inner Glow */}
                  <div className="absolute inset-0 rounded-3xl liquid-glass-glow pointer-events-none group-hover:ring-white/[0.15] transition-colors duration-500" />
                  
                  {/* Hover Shine */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <h3 className="text-xl font-bold text-white tracking-tight">{project.title}</h3>
                    <div className="p-2 rounded-full bg-white/[0.05] group-hover:bg-white text-zinc-400 group-hover:text-black transition-all duration-300">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-8 flex-grow relative z-10 group-hover:text-zinc-300 transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest liquid-mono text-zinc-300 bg-white/[0.05] rounded-full border border-white/[0.05]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
