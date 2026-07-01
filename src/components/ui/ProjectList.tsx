'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="container mx-auto px-4 py-24 md:py-32" ref={containerRef}>
      <div className="max-w-4xl mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-silver to-obsidian-light drop-shadow-lg tracking-tighter mb-6">
            Selected Projects
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-silver text-lg md:text-xl leading-relaxed max-w-2xl">
            A focus on performance, accessibility, and robust engineering. 
            Scroll down to view technical details and case studies for each project.
          </p>
        </motion.div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-silver">
          <p className="text-xl">Loading projects...</p>
          <p className="text-sm mt-2">Make sure you&apos;ve published your projects in the Sanity Studio!</p>
        </div>
      ) : (
        <div className="relative flex flex-col w-full border-t border-white/10">
          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div 
                key={project.id}
                className="group border-b border-white/10 relative pb-12"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* List Item Header */}
                <div className="w-full py-8 md:py-12 flex flex-col items-start text-left relative z-10">
                  <div className="flex flex-col relative z-10 w-full mb-6">
                    <span className="text-neon-primary text-xs tracking-[0.2em] uppercase mb-2 block obsidian-mono opacity-60 group-hover:opacity-100 transition-opacity">
                      {project.techStack.slice(0,3).join(" • ")}
                    </span>
                    <h2 
                      className={cn(
                        "text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter transition-all duration-500 text-white",
                        isHovered ? "drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" : ""
                      )}
                    >
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                        {/* Left Column: Image & Links */}
                        <div className="lg:col-span-5 space-y-6">
                          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                            <Image
                              src={project.thumbnail}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                              {project.githubUrl && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                                >
                                  <Github size={14} /> Code
                                </a>
                              )}
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-4 py-2 bg-neon-primary text-black font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white transition-colors"
                                >
                                  <ExternalLink size={14} /> Live Site
                                </a>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-xs text-silver uppercase tracking-[0.2em] mb-3">Tech Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.techStack.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-silver uppercase tracking-wider obsidian-mono">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="lg:col-span-7 space-y-8">
                          <div>
                            <h3 className="text-2xl font-bold mb-4">{project.oneLiner}</h3>
                            <p className="text-silver leading-relaxed">
                              {project.description || "A deep dive into building scalable and beautiful web experiences. This project challenged conventional boundaries of frontend architecture."}
                            </p>
                          </div>

                          {project.star && (project.star.situation || project.star.result) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                              {project.star.situation && (
                                <div>
                                  <h4 className="text-[10px] text-neon-primary uppercase tracking-[0.2em] obsidian-mono mb-2">Situation / Challenge</h4>
                                  <p className="text-sm text-silver leading-relaxed">{project.star.situation}</p>
                                </div>
                              )}
                              {project.star.result && (
                                <div>
                                  <h4 className="text-[10px] text-neon-primary uppercase tracking-[0.2em] obsidian-mono mb-2">Outcome / Result</h4>
                                  <p className="text-sm text-silver leading-relaxed">{project.star.result}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                
                {/* Background Hover Glow */}
                <div 
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent pointer-events-none transition-opacity duration-500",
                    isHovered ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            );
          })}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-32"
      >
        <div className="p-12 rounded-3xl liquid-glass border border-white/5 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-neon-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <h2 className="text-3xl font-black mb-4 tracking-tight">Open Source Mindset</h2>
          <p className="text-silver mb-8 max-w-lg mx-auto leading-relaxed">
            I believe in building publicly and sharing knowledge. Dive into the source code of my projects to see the architecture behind the pixels.
          </p>
          <a 
            href="https://github.com/Alexthethunderboy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-neon-primary hover:text-black transition-all shadow-lg hover:shadow-neon-primary/20"
          >
            <Github size={16} /> Explore GitHub
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectList;
