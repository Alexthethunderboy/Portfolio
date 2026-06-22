'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard = ({ project, className }: ProjectCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={cn(
        "group relative animated-border-card rounded-3xl overflow-hidden transition-all duration-500",
        className
      )}>
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image 
            src={project.thumbnail} 
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-90" />
          
          {/* Links Overlay */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-metallic hover:border-neon-primary hover:text-neon-primary transition-all duration-300"
            >
              <Github size={16} />
            </a>
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] text-metallic hover:border-neon-primary hover:text-neon-primary transition-all duration-300"
            >
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-wrap gap-3 mb-6">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="text-[9px] uppercase tracking-[0.2em] obsidian-mono text-silver/60">
                {"//"} {tech}
              </span>
            ))}
          </div>

          <h3 className="text-xl obsidian-heading mb-3 group-hover:text-neon-primary transition-colors duration-400">
            {project.title}
          </h3>
          <p className="text-silver text-xs mb-8 leading-relaxed obsidian-mono lowercase tracking-normal">
            {project.oneLiner}
          </p>

          {/* STAR Grid */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div>
              <span className="text-[9px] text-neon-primary uppercase tracking-[0.2em] obsidian-mono block mb-2">Situation</span>
              <p className="text-[10px] text-silver leading-relaxed line-clamp-2">{project.star.situation}</p>
            </div>
            <div>
              <span className="text-[9px] text-neon-primary uppercase tracking-[0.2em] obsidian-mono block mb-2">Outcome</span>
              <p className="text-[10px] text-silver leading-relaxed line-clamp-2">{project.star.result}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
