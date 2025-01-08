'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCode, FaLightbulb, FaPuzzlePiece, FaPersonBooth } from "react-icons/fa";
import {
  IoLogoCss3,
  IoLogoHtml5,
  IoLogoJavascript,
  IoLogoReact,
  IoLogoSass,
} from "react-icons/io5";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

const AboutMe = () => {
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
    <div className="min-h-screen text-white py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 ">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Image 
              src={<FaPersonBooth/>}
              alt="Profile Picture" 
              width={400} 
              height={400} 
              className="rounded-full w-[290px] md:w-[400px] shadow-2xl border-4 border-purple-500"
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6 blur-mobile"
          >
            <h1 className="text-4xl font-bold mb-4">About Me</h1>
            <p className="text-lg">
              My name is Kelechi Alexander Ugoh, and I&apos;m a front-end developer with a strong focus on creating intuitive, user-centered designs. My journey in coding has always been driven by the desire to build meaningful experiences that combine both functionality and creativity. I specialize in React and Next.js, always striving to push the boundaries of what&apos;s possible on the web.
            </p>
            <p className="text-lg">
              My approach is a mix of problem-solving, clean code, and constant innovation, all aimed at delivering polished, seamless digital experiences. I believe in the power of design to not just communicate but to inspire, and I&apos;m always looking for new ways to evolve and challenge myself in this fast-paced field.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-20"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[ 
            { icon: FaCode, title: "Clean Code", description: "Writing efficient, maintainable, and readable code" },
            { icon: FaLightbulb, title: "Innovative Solutions", description: "Crafting creative solutions to complex problems" },
            { icon: FaPuzzlePiece, title: "Continuous Learning", description: "Always expanding my skills and knowledge" }
          ].map((item, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-800 to-blue-800 p-6 rounded-lg shadow-lg">
              <item.icon className="text-4xl text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
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
    </div>
  );
};

export default AboutMe;
