'use client'
import React from 'react'

import { motion } from 'framer-motion'
import Contactme from '../Components/Contactme'
import Form from '../Components/Form'

const Contact = () => {
  return (
    <div className='min-h-screen py-20 px-4 sm:px-6 lg:px-8'>
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Contactme/>
        <Form/>
      </motion.div>
    </div>
  )
}

export default Contact

