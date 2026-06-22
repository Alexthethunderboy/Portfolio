'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '@/data/portfolio';
import { cn } from '@/lib/utils';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Springs for smooth cursor tracking
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to viewport
      cursorX.set(e.clientX - 150); // Offset by half image width (300/2)
      cursorY.set(e.clientY - 100); // Offset by half image height (200/2)
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

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
            Click on any project to expand its technical details and case study.
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
          {/* Floating Image Cursor */}
          <motion.div
            className="pointer-events-none fixed z-50 overflow-hidden rounded-xl border border-white/20 shadow-2xl hidden md:block"
            style={{
              x: cursorX,
              y: cursorY,
              width: 300,
              height: 200,
              opacity: hoveredIndex !== null && expandedIndex === null ? 1 : 0,
              scale: hoveredIndex !== null && expandedIndex === null ? 1 : 0.8,
            }}
            transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.2 } }}
          >
            <AnimatePresence mode="wait">
              {hoveredIndex !== null && (
                <motion.div
                  key={hoveredIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={projects[hoveredIndex].thumbnail}
                    alt={projects[hoveredIndex].title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-neon-primary/20 mix-blend-overlay" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {projects.map((project, index) => {
            const isHovered = hoveredIndex === index;
            const isExpanded = expandedIndex === index;

            return (
              <div 
                key={project.id}
                className="group border-b border-white/10 relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* List Item Header */}
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full py-8 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between text-left relative z-10"
                >
                  <div className="flex flex-col relative z-10">
                    <span className="text-neon-primary text-xs tracking-[0.2em] uppercase mb-2 block obsidian-mono opacity-60 group-hover:opacity-100 transition-opacity">
                      {project.techStack.slice(0,3).join(" • ")}
                    </span>
                    <h2 
                      className={cn(
                        "text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter transition-all duration-500",
                        isHovered && !isExpanded
                          ? "text-neon-primary drop-shadow-[0_0_15px_rgba(var(--neon-primary),0.5)]"
                          : "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)]"
                      )}
                      style={{
                        WebkitTextFillColor: isExpanded ? 'white' : (isHovered ? 'currentColor' : 'transparent'),
                        WebkitTextStroke: isExpanded ? '0px' : undefined
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>
                  
                  <div className={cn(
                    "hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-white/20 transition-all duration-500",
                    isHovered ? "bg-white text-black rotate-0 scale-100" : "text-white -rotate-45 scale-90 opacity-50",
                    isExpanded && "rotate-90 bg-neon-primary border-neon-primary text-black scale-100 opacity-100"
                  )}>
                    <ArrowRight size={24} />
                  </div>
                </button>

                {/* Mobile Thumbnail */}
                <div className="md:hidden w-full h-48 relative rounded-xl overflow-hidden mb-6 opacity-80" style={{ display: isExpanded ? 'none' : 'block' }}>
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-12 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
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
                    </motion.div>
                  )}
                </AnimatePresence>
                
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
