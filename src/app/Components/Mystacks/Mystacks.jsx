'use client'
import React from "react";
import {
  IoLogoCss3,
  IoLogoHtml5,
  IoLogoJavascript,
  IoLogoReact,
  IoLogoSass,
} from "react-icons/io5";
import { SiNextdotjs, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

const Mystacks = () => {
  return (
    <section className="mx-auto mt-20 text-center p-20">
      <div className="flex flex-col gap-5 justify-center items-center">
        <motion.h1 className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2"
        initial={{ x: '10vw' }}
        whileInView={{ x: 0}}
        transition={{duration: 2}}
       
        >My Skills</motion.h1>
        <motion.p className="max-w-xl text-xl"
        initial={{ x: '-10vw' }}
        whileInView={{ x: 0}}
        transition={{duration: 2}}
        // viewport={{ once: true }}
        >I have spent my years honing my skills in important languages, frameworks and libraries while keeping up to date with the latest technologies</motion.p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-0 text-7xl text-center mx-auto justify-between mt-10">
        <motion.div className="flex flex-col gap-2 items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        initial={{ x: '10vw' }}
          whileInView={{ x: 0}}
          transition={{duration: 2}}
          // viewport={{ once: true }}
        >
          <IoLogoHtml5 />
          <h1 className="text-xl">HTML5</h1>
        </motion.div>
        <motion.div className="flex flex-col gap-2 items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        initial={{ x: '10vw' }}
          whileInView={{ x: 0}}
          transition={{duration: 2}}
          // viewport={{ once: true }}
        >
          <IoLogoCss3 />
          <h1 className="text-xl">CSS3</h1>
        </motion.div>
        <motion.div className="flex flex-col gap-2 items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        initial={{ x: '-10vw' }}
          whileInView={{ x: 0}}
          transition={{duration: 2}}
          // viewport={{ once: true }}
        >
          <IoLogoSass />
          <h1 className="text-xl">SASS</h1>
        </motion.div>
        <motion.div className="flex flex-col gap-2 items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        initial={{ y: '-10vh' }}
          whileInView={{ y: 0}}
          transition={{duration: 2}}
          // viewport={{ once: true }}
        >
          <IoLogoJavascript />
          <h1 className="text-xl">JAVASCRIPT</h1>
        </motion.div>
        <motion.div className="flex flex-col gap-2 items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        initial={{ x: '10vw' }}
          whileInView={{ x: 0}}
          transition={{duration: 2}}
          // viewport={{ once: true }}
        >
          <IoLogoReact />
          <h1 className="text-xl">REACT</h1>
        </motion.div>
        <motion.div className="flex flex-col gap-2 items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        initial={{ x: '10vw' }}
          whileInView={{ x: 0}}
          transition={{duration: 2}}
          // viewport={{ once: true }}
        >
          <SiTailwindcss />
          <h1 className="text-xl">TAILWIND</h1>
        </motion.div>
        <motion.div className="flex flex-col items-center gap-2 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        initial={{ x: '10vw' }}
          whileInView={{ x: 0}}
          transition={{duration: 2}}
          // viewport={{ once: true }}
        >
          <SiNextdotjs />
          <h1 className="text-xl">NEXT</h1>
        </motion.div>
        
      </div>
    </section>
  );
};

export default Mystacks;
