"use client";

import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function LiquidBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 100, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-obsidian">
      {/* Heavy Blur Layer */}
      <div className="absolute inset-0 backdrop-blur-[100px] z-10" />

      {/* Subtle Logo Background */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <Image 
          src="/assets/thunderboyIcon.png" 
          alt="Thunderboy Logo" 
          width={800} 
          height={800} 
          className="object-contain w-[80vw] max-w-[800px]"
        />
      </div>

      {/* Blob 1: Deep Blue (Top Left, Slow Animation) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/50 mix-blend-screen filter blur-[100px] animate-blob" />

      {/* Blob 2: Rich Teal (Bottom Right, Reverse Slow Animation) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-900/40 mix-blend-screen filter blur-[120px] animate-blob-reverse" />

      {/* Blob 3: Deep Purple (Center, subtle movement) */}
      <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-purple-900/40 mix-blend-screen filter blur-[100px] animate-blob" style={{ animationDelay: '5s' }} />

      {/* Blob 4: Mouse Follower (Cyan Highlight) */}
      <motion.div
        className="absolute w-[30vw] h-[30vw] rounded-full bg-neon-primary/20 mix-blend-screen filter blur-[100px]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
