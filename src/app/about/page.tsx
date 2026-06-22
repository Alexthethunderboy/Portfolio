'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Code2, Lightbulb, Zap, Rocket } from 'lucide-react';
import TechStack from '@/components/layout/TechStack';
import { cn } from '@/lib/utils';

const PHILOSOPHY = [
  { 
    icon: Code2, 
    title: "Clean Architecture", 
    description: "I prioritize modularity and type safety to build maintainable, enterprise-scale applications.",
    color: "text-blue-400"
  },
  { 
    icon: Lightbulb, 
    title: "User-Centric Design", 
    description: "Every line of code I write is optimized for the end-user's experience and accessibility.",
    color: "text-yellow-400"
  },
  { 
    icon: Zap, 
    title: "Performance First", 
    description: "Obsessed with Lighthouse scores and Core Web Vitals to ensure instantaneous interactions.",
    color: "text-purple-400"
  }
];

const AboutPage = () => {
  return (
    <div className="flex flex-col">
      {/* Intro Section */}
      <section className="container mx-auto px-4 py-24 mb-12">
        <div className="grid md:grid-cols-5 gap-16 items-center">
          {/* Text Content */}
          <div className="md:col-span-3">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="mb-8">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Engineering digital experiences with <span className="text-purple-500">precision</span> and <span className="text-blue-500">intent</span>.
                </h1>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  Hi, I&apos;m <span className="text-white font-medium">Kelechi Alexander Ugoh</span>. I&apos;m a Front-end Developer who loves building things that look great and work flawlessly under the hood. I spend most of my time in the React ecosystem—working closely with Next.js and TypeScript to turn complex problems into smooth, everyday experiences.
                </p>
                <p>
                  For me, it&apos;s never just about getting the code to run. I care deeply about the &quot;how.&quot; How can we make this load instantly? How do we ensure anyone can easily use it? How do we write this so it&apos;s easy to build upon tomorrow? These are the questions that keep me excited to write code every day.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Profile Photo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="md:col-span-2 relative group">
              <div className="relative aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden rounded-[2.5rem] border-2 border-white/5 group-hover:border-purple-500/50 transition-all duration-500">
                <Image 
                  src="/assets/profile-pic.jpg" 
                  alt="Kelechi Alexander Ugoh" 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/40 to-transparent" />
              </div>
              {/* Background elements */}
              <div className="absolute -z-10 -top-8 -right-8 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full" />
              <div className="absolute -z-10 -bottom-8 -left-8 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Row */}
      <TechStack />

      {/* Philosophy Section */}
      <section className="container mx-auto px-4 py-32">
        <h2 className="text-3xl font-bold mb-16 text-center md:text-left">Engineering Philosophy</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {PHILOSOPHY.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-8 rounded-3xl bg-[#0a0a1a] border border-white/5 hover:border-purple-500/30 transition-all duration-300 h-full">
                <item.icon className={cn("w-12 h-12 mb-6", item.color)} />
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GitHub Activity Pulse */}
      <section className="container mx-auto px-4 py-32 mb-12">
        <div className="relative p-1 rounded-3xl bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-transparent">
          <div className="p-12 rounded-3xl bg-[#030014] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3 justify-center md:justify-start">
                <Rocket className="text-purple-500" />
                Active Engineering
              </h2>
              <p className="text-gray-400 max-w-md">
                I maintain a consistent commit history, always iterating on side projects and contributing to the open-source community.
              </p>
            </div>
            
            <a 
              href="https://github.com/Alexthethunderboy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all group"
            >
              <span className="group-hover:text-purple-400 transition-colors tracking-widest font-bold text-sm uppercase">View Activity on GitHub</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
