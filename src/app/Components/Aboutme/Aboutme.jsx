'use client'
import React from "react";
import Image from "next/image";
import pic from "@/assets/profile-pic.png";
import Link from "next/link";
import { motion } from "framer-motion";

const Aboutme = () => {
  return (
    <motion.div className=" flex p-5 md:pt-20 justify-center items-center h-auto"
    initial={{y: '100vh'}}
    animate={{y: 0}}
    transition={{delay: 2, duration: 2}}
    >
      <div class="max-w-4xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row ">
        <div className="basis-1/2">
            <Image class="rounded-t-lg" src={pic} alt="" objectFit="cover" className="md:w-[100%]"/>
        </div>
        <div class="p-5 flex gap-2 flex-col items-center text-center justify-between basis-1/2">
          
            <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              About Me
            </h5>
          
          <p class="font-normal text-gray-700 dark:text-gray-400">
            I thrive on crafting delightful
            user experiences through clean, efficient code. With a keen eye for
            design and a love for turning ideas into interactive web solutions,
            I’m dedicated to creating seamless interfaces that engage and
            inspire. Whether it’s bringing pixel-perfect designs to life or
            optimizing performance, I’m always up for the challenge. When I’m
            not immersed in code, you’ll find me exploring new libraries,
            sipping coffee, and dreaming up the next innovative project.
          </p>
          <Link href={'/contact'}><button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Get in Touch</button></Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Aboutme;
