'use client';
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TEXTS = [
  <>My name is <br /> Kelechi Alexander Ugoh</>, 
  <>I am a Developer <br /> & Creative</>
];

const Hero = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % TEXTS.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full flex flex-col items-center justify-center p-4 text-center">
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-4xl"
      >
        <div className="relative liquid-glass rounded-[2rem] p-8 md:p-16 w-full mx-auto">
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-[2rem] liquid-glass-glow pointer-events-none" />

          <div className="relative z-10">
            <div className="h-28 md:h-44 mb-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={textIndex}
                  initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-br from-white via-cyan-100 to-purple-400 leading-[1.2] md:leading-tight liquid-heading tracking-tight drop-shadow-sm">
                    {TEXTS[textIndex]}
                  </h1>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="max-w-2xl text-zinc-300 text-sm md:text-base mb-12 mx-auto leading-relaxed liquid-mono lowercase tracking-normal">
              I&apos;m a Developer who loves building clean, high-performance web experiences that actually feel good to use. <br/> Mixing technical depth with a bit of creative flair.
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                href="/projects" 
                className="px-8 py-4 bg-white text-black font-bold text-[11px] uppercase tracking-[0.2em] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow duration-300 w-full sm:w-auto"
              >
                Explore Projects
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                href="/mainresume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/[0.15] border border-white/[0.1] text-white text-[11px] uppercase tracking-[0.2em] liquid-mono hover:bg-white/[0.2] hover:border-white/[0.2] transition-colors duration-300 rounded-full w-full sm:w-auto"
              >
                View Resume
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
