'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv: any = motion.div;

const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      <MotionDiv
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "20%", "-20%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vh] bg-neon-primary/10 rounded-full blur-[120px] mix-blend-screen"
      />
      
      <MotionDiv
        animate={{
          x: ["20%", "-20%", "20%"],
          y: ["20%", "-20%", "20%"],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[20%] right-[10%] w-[60vw] h-[60vh] bg-neon-secondary/10 rounded-full blur-[120px] mix-blend-screen"
      />

      <MotionDiv
        animate={{
          x: ["0%", "30%", "0%"],
          y: ["30%", "0%", "30%"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[50vh] bg-neon-accent/10 rounded-full blur-[120px] mix-blend-screen"
      />
    </div>
  );
};

export default AuroraBackground;
