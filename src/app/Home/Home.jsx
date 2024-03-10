'use client'
import React from "react";
import styles from "./Home.module.css";
import { motion } from "framer-motion";



const Homepage = () => {
  return (
    <div className={styles.homediv}>
      <div className="text-white p-5 h-[80%] flex flex-col gap-6 justify-center items-center text-center">
        <motion.h1 className="text-2xl font-semibold"
        initial={{ y: '-100vh' }}
        animate={{ y: 0}}
        transition={{ delay: 2, duration: 2, type: 'spring', stiffness: 200}}
        >Welcome</motion.h1>
        <motion.p className="text-3xl md:text-5xl font-bold"
          initial={{ x: '100vw' }}
          animate={{ x: 0}}
          transition={{ delay: 2, duration: 2, type: 'spring'}}
        >
          I am Front-end Developer
        </motion.p>
        <motion.p className="md:w-[30rem] text-center"
          initial={{ x: '-100vw' }}
          animate={{ x: 0}}
          transition={{ delay: 2, duration: 2}}
        >
          Passionate front-end developer with a flair for creating seamless web
          experiences. Combining technical prowess with creativity.
        </motion.p>
        <motion.a href="/myResume.pdf" download='KelechiugohResume.pdf'
          initial={{ y: '100vh' }}
          animate={{ y: 0}}
          transition={{ delay: 2, duration: 2, type: 'spring', stiffness: 200}}
        >
        <button class="relative inline-flex items-center justify-center p-1 mb-2 me-2 overflow-hidden text-md font-semibold text-gray-900 rounded-xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            View Resume
          </span>
        </button>
        </motion.a>
      </div>
    </div>
  );
};

export default Homepage;
