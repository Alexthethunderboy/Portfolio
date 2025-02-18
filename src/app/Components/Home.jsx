'use client'
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

const Homepage = () => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = ["My name is Kelechi Alexander Ugoh", "I am a Front-end Developer"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 4000); // Change text every 4 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900">
      <ParticleBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-5 text-center z-10">
        <motion.h1 
          className="text-4xl font-bold mb-4"
          initial={{ y: '-100vh', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 120 }}
        >
          Welcome to My Portfolio
        </motion.h1>
        <div className="h-24 mb-6"> {/* Fixed height container for text transition */}
          <AnimatePresence mode="wait">
            <motion.p 
              key={textIndex}
              className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {texts[textIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.p 
          className="max-w-2xl text-lg mb-8"
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          Passionate about creating seamless web experiences, I combine technical prowess with creativity to build engaging and intuitive user interfaces.
        </motion.p>
        <motion.div
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={{ delay: 2.5, duration: 0.8, type: 'spring', stiffness: 200 }}
        >
          <a 
            href="/mainresume.pdf" 
            download='KelechiUgohResume.pdf'
            className="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-lg font-semibold text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <span className="relative px-8 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
              View Resume
            </span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Homepage;

