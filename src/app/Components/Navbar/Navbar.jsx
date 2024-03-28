'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import icon from '@/assets/thunderboyIcon.png'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaHamburger } from 'react-icons/fa'


const Navbar = () => {
    const [show, setShow] = useState();
    const handleShow = () => {
        setShow(!show);
    }
  return (
    <div className='bg-gradient-to-r from-black to-blue-500 '>
        <nav className='flex justify-between md:p-10 p-5 bg-transparent text-white items-center '>
            <motion.div
            initial={{x: '-100vw'}}
            animate={{x: 0}}
            transition={{ delay: 2, duration: 5, type: 'spring', stiffness: 120}}
            >
                <Link href={'/'}><Image src={icon} alt='lightning icon' width={150}/></Link>
            </motion.div>
            <div className='md:hidden'>
                {show && (
                    <motion.ul className='flex flex-col gap-10 absolute top-16 right-0 z-50 bg-gradient-to-r from-black to-blue-500 items-center w-screen py-10'
                    initial={{x: '-100vw'}}
                    animate={{x: 0}}
                    >
                    <Link href={'/'}><li className='hover:text-pink-300 outline-blue-900 rounded' onClick={handleShow}
                    >Home</li></Link>
                    <Link href={'/about'}><li className='hover:text-pink-300'onClick={handleShow}>About</li></Link>
                    <Link href={'/work'}><li className='hover:text-pink-300' onClick={handleShow}>Work</li></Link>
                    <Link href={'/contact'}><li className='hover:text-pink-300' onClick={handleShow}>Contact</li></Link>
                    <Link href={'/contact'} onClick={handleShow}><button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Hire me!</button></Link>
                    
                </motion.ul>
                )}
            </div>
            <div className=' hidden md:block'>
                <ul className='flex gap-16 items-center'>
                    <Link href={'/'}><li className='hover:text-pink-300 '>Home</li></Link>
                    <Link href={'/about'}><li className='hover:text-pink-300' >About</li></Link>
                    <Link href={'/work'}><li className='hover:text-pink-300'>Work</li></Link>
                    <Link href={'/contact'}><li className='hover:text-pink-300'>Contact</li></Link>
                </ul>

            </div>
            <motion.div className='text-xl md:hidden cursor-pointer' onClick={handleShow}
             initial={{ x: 0 }}
             animate={{
                scale: [1, 2, 2, 1, 1],
                // rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
            //  transition={{ delay: 3, duration: 5, type: 'spring', stiffness: 120}}
            transition={{ repeat: Infinity, repeatDelay: 5, duration: 1}}
            >
                <FaHamburger/>
            </motion.div>
            <div className='hidden md:block'>
            <Link href={'/contact'}><button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-semibold">Hire me!</button></Link>   
            
            </div>
        </nav>
    </div>
  )
}

export default Navbar