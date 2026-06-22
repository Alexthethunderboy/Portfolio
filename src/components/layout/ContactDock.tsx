'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

const CONTACT_LINKS = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/Alexthethunderboy',
    color: 'hover:text-white',
    ring: 'hover:ring-white/20'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/kelechiugoh',
    color: 'hover:text-blue-400',
    ring: 'hover:ring-blue-400/20'
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:kelechialexanderugoh@gmail.com',
    color: 'hover:text-purple-400',
    ring: 'hover:ring-purple-400/20'
  },
];

const ContactDock = () => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <div className="pointer-events-auto relative">
          <div className="flex items-center gap-1 p-2 liquid-glass rounded-full">
            {/* Inner Glow for the Dock */}
            <div className="absolute inset-0 rounded-full liquid-glass-glow pointer-events-none" />
            
            {CONTACT_LINKS.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative group block p-4 transition-all duration-300 rounded-full",
                    "text-zinc-400 hover:text-white hover:bg-white/[0.1]"
                  )}
                >
                  <link.icon size={20} strokeWidth={1.5} />
                  
                  {/* Tooltip */}
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 liquid-glass rounded-xl text-white text-[9px] uppercase tracking-[0.2em] liquid-mono opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    {link.name}
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactDock;
