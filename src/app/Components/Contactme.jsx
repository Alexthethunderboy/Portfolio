"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaClone, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TiTick } from "react-icons/ti";
import { motion } from "framer-motion";

const Contactme = () => {
  const [clipboardState, setClipboardState] = useState(false);
  const changeIcon = () => {
    setClipboardState(!clipboardState);
  };

  return (
    <div className="mb-20">
      <motion.div 
        className="flex flex-col justify-center gap-5"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Hello, <br /> Let&#8217;s connect
        </motion.h1>

        <motion.p
          className="text-gray-300 text-lg mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Thank you for visiting my portfolio! Whether you have a project
          idea, a collaboration proposal, or just want to say hello, I&apos;d love
          to hear from you. Feel free to reach out or connect with me on
          social media. Let&apos;s create something amazing together!
        </motion.p>

        <motion.div
          className="text-gray-300 flex items-center gap-2 mb-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <IoLocation className="text-2xl text-purple-400" />
          <span>Lagos, Nigeria.</span>
        </motion.div>
      </motion.div>

      <motion.div 
        className="flex flex-wrap gap-6 items-center text-white text-4xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <Link href="https://www.linkedin.com/in/thunderboy" target="_blank" className="hover:text-purple-400 transition-colors">
          <FaLinkedin />
        </Link>
        <Link href="https://github.com/Alexthethunderboy" target="_blank" className="hover:text-purple-400 transition-colors">
          <FaGithub />
        </Link>
        <div className="flex items-center gap-4">
          <Link href="mailto:alexthegreatdeveloper@gmail.com" target="_blank" className="hover:text-purple-400 transition-colors">
            <IoMdMail />
          </Link>
          <div className="flex items-center gap-2 bg-white bg-opacity-10 rounded-full px-4 py-2">
            <input
              type="text"
              value="alexthegreatdeveloper@gmail.com"
              className="bg-transparent text-sm outline-none"
              readOnly
            />
            <CopyToClipboard
              text="alexthegreatdeveloper@gmail.com"
              onCopy={() => setClipboardState(true)}
            >
              <button onClick={changeIcon} className="text-xl">
                {clipboardState ? <TiTick className="text-green-400"/> : <FaClone />}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contactme;

