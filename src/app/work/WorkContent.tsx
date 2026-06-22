'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/data/portfolio';
import ProjectCard from '@/components/ui/ProjectCard';

interface WorkContentProps {
  projects: Project[];
}

const WorkContent: React.FC<WorkContentProps> = ({ projects }) => {
  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="max-w-4xl mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Selected Projects
            </h1>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            A focus on performance, accessibility, and robust engineering. 
            These projects are dynamically fetched from Sanity CMS.
          </p>
        </motion.div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl">Loading projects...</p>
          <p className="text-sm mt-2">Make sure you&apos;ve published your projects in the Sanity Studio!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              className={index % 3 === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
      )}

      {/* GitHub Call to Action */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="mt-32 p-12 rounded-3xl bg-[#0a0a1a] border border-white/5 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Want to see the source?</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            I believe in open-source and clean version control. Explore my GitHub to see the architecture behind these projects.
          </p>
          <a 
            href="https://github.com/Alexthethunderboy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-purple-500 hover:text-white transition-colors"
          >
            Explore GitHub
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default WorkContent;
