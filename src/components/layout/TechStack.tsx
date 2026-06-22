'use client';
import React from 'react';
import { motion } from 'framer-motion';
import {
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiTypescript,
    SiNodedotjs,
    SiFramer,
    SiPrisma,
    SiMongodb
} from 'react-icons/si';

const TECH_STACK = [
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Framer Motion', icon: SiFramer, color: '#E10098' },
    { name: 'Prisma', icon: SiPrisma, color: '#2D3748' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
];

const TechStack = () => {
    return (
        <div className="w-full py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <p className="text-center text-zinc-400 text-[10px] tracking-[0.4em] uppercase liquid-mono mb-12">
                    Specialized Technical Stack // 001
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {TECH_STACK.map((tech) => (
                        <motion.div
                            key={tech.name}
                            whileHover={{ y: -5, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative group cursor-default"
                        >
                            <div className="liquid-glass rounded-full px-5 py-3 flex items-center gap-3 transition-colors duration-300 group-hover:bg-white/[0.1] group-hover:border-white/[0.2]">
                                <div className="absolute inset-0 rounded-full liquid-glass-glow pointer-events-none" />
                                <tech.icon
                                    className="text-xl text-zinc-400 transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                    style={{ color: 'var(--icon-color)' } as React.CSSProperties}
                                />
                                <span className="text-zinc-300 text-[11px] uppercase tracking-widest liquid-mono group-hover:text-white transition-colors duration-300">
                                    {tech.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* Inject hover color styles */}
            <style jsx>{`
                ${TECH_STACK.map(tech => `
                    div:hover > div > svg {
                        --icon-color: ${tech.color};
                    }
                `).join('')}
                svg {
                    --icon-color: inherit;
                }
            `}</style>
        </div>
    );
};

export default TechStack;
