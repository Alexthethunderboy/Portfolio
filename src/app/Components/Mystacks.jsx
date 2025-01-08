'use client'
import React from "react";
import {
  IoLogoCss3,
  IoLogoHtml5,
  IoLogoJavascript,
  IoLogoReact,
  IoLogoSass,
} from "react-icons/io5";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { motion } from "framer-motion";

const Mystacks = () => {
  const skills = [
    { icon: IoLogoHtml5, name: "HTML5", color: "text-orange-500" },
    { icon: IoLogoCss3, name: "CSS3", color: "text-blue-500" },
    { icon: IoLogoSass, name: "SASS", color: "text-pink-500" },
    { icon: IoLogoJavascript, name: "JavaScript", color: "text-yellow-400" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-600" },
    { icon: IoLogoReact, name: "React", color: "text-cyan-400" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-teal-400" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
  ];

  return (
    <section className="mt-20 py-20 bg-gradient-to-r from-gray-800 to-blue-800 rounded-3xl shadow-2xl">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl md:text-7xl font-extrabold text-center mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            My Skills
          </span>
        </motion.h2>
        <motion.p 
          className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-300"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          I&apos;ve honed my skills in essential languages, frameworks, and libraries while staying current with the latest technologies.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-700 to-blue-700 rounded-xl backdrop-filter backdrop-blur-lg hover:from-gray-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <skill.icon className={`text-6xl mb-4 ${skill.color}`} />
              <h3 className="text-xl font-semibold">{skill.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mystacks;

