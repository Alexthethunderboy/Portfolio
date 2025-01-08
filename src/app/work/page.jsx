'use client'
import React from 'react'

import { motion } from 'framer-motion'
import { MyProjects } from '../Components/MyProjects'

const Work = () => {
  return (
    <section className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className='flex flex-col items-center text-white mt-10 md:mt-20 text-center mx-auto'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="font-extrabold text-transparent text-4xl md:text-7xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-5 mx-5 md:mx-auto">My Projects</h1>
        <p className="text-xl mb-10">Here are some of my works that showcase my skills and creativity</p>
      </motion.div>
      <MyProjects/>
    </section>
  )
}

export default Work

