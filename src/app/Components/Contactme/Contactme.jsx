'use client'

import Link from "next/link";
import React, { useState } from "react";
import { FaClone, FaGithub, FaLinkedin, FaLocationArrow, FaMailBulk, FaRegClone } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoClipboard, IoLocation } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";

const Contactme = () => {
    const [clipboardState, setClipboardState] = useState(false);
    const changeIcon = () => {
        setClipboardState(!clipboardState)
    }

  return (
    <div>
      <div className="flex flex-col justify-center gap-5 mt-5 md:mt-20">
        <div>
          <motion.h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 1, duration: 2}}
          >
            Hello, <br /> Let's connect
          </motion.h1>
        </div>

        <div>
          <motion.p className="text-gray-500 "
          initial={{x: '100vw'}}
          animate={{x: 0}}
          transition={{delay: 2, duration: 2}}
          >
            Thank you for visiting my portfolio! Whether you have a project
            idea, a collaboration proposal, or just want to say hello, I’d love
            to hear from you. Feel free to reach out or connect with me on
            social media. Let’s create something amazing together!
          </motion.p>
        </div>
        <div>
            <motion.h1 className="text-gray-500 flex items-center gap-1"
            initial={{x: '-100vw'}}
            animate={{x: 0}}
            transition={{delay: 2, duration: 2}}
            ><span><IoLocation/></span><span>Lagos, Nigeria.</span></motion.h1>
        </div>
       
        
      </div>
       <div className="flex flex-col md:flex-row gap-5 mt-5 md:gap-10 md:mt-10 text-white text-bold text-7xl md:items-center">
          <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 3, duration: 2}}
          >
            <Link href="https://www.linkedin.com/in/thunderboy" target="_blank"><FaLinkedin /></Link>
          </motion.div>
          <motion.div
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 3.5, duration: 2}}
          >
            <Link href="https://github.com/Alexthethunderboy" target="_blank"><FaGithub /></Link>
          </motion.div>
          <motion.div className="flex gap-2 flex-col md:flex-row md:items-center "
          initial={{scale: 0}}
          animate={{scale: 1}}
          transition={{delay: 4, duration: 2}}
          >
            <Link href="mailto:alexthegreatdeveloper@gmail.com " target="_blank" ><IoMdMail /></Link>
            <div className="flex items-center gap-1 rounded bg-gray-900 text-gray-500 text-sm p-2 ">
               <input type="text" value={'alexthegreatdeveloper@gmail.com'} className="outline-none  bg-gray-900 md:w-60"/>
               
               <CopyToClipboard
        text="alexthegreatdeveloper@gmail.com"
        onCopy={() => setClipboardState(true)}
      >
        <button onClick={{changeIcon}}>
          {clipboardState ? <TiTick/> : <FaClone/>}  
        </button>
      </CopyToClipboard>
            </div>
            
          </motion.div>
        </div>
      </div>
  );
};

export default Contactme;
