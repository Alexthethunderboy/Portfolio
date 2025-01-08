'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import icon from '@/assets/thunderboyIcon.png'; // Corrected import statement
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/work', label: 'Work' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-transparent text-white z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
          >
            <Link href="/">
              <Image
                src={icon}
                alt="lightning icon"
                width={150}
                height={50}
                priority
                className="cursor-pointer"
              />
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`hover:bg-purple-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                    pathname.replace(/\/$/, '') === item.href.replace(/\/$/, '')
                      ? 'bg-purple-600 text-white'
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hire Me Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 transform hover:scale-105"
            >
              Hire me!
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-purple-800 focus:ring-white"
            >
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-gray-900 bg-opacity-90"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block hover:bg-purple-600 text-white px-3 py-2 rounded-md text-base font-medium ${
                    pathname.replace(/\/$/, '') === item.href.replace(/\/$/, '')
                      ? 'bg-purple-600'
                      : ''
                  }`}
                  onClick={() => {
                    toggleMenu()
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={toggleMenu}
                className="block w-full text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4"
              >
                Hire me!
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar;
