'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const MotionDiv: any = motion.div;

const MENU_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/contact', label: 'Contact' },
];

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const AnimatedMenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <Path
      animate={isOpen ? "open" : "closed"}
      initial={false}
      variants={{
        closed: { d: "M 4 6 L 20 6" },
        open: { d: "M 6 18 L 18 6" }
      }}
      transition={{ duration: 0.3 }}
    />
    <Path
      d="M 4 12 L 20 12"
      animate={isOpen ? "open" : "closed"}
      initial={false}
      variants={{
        closed: { opacity: 1 },
        open: { opacity: 0 }
      }}
      transition={{ duration: 0.3 }}
    />
    <Path
      animate={isOpen ? "open" : "closed"}
      initial={false}
      variants={{
        closed: { d: "M 4 18 L 20 18" },
        open: { d: "M 6 6 L 18 18" }
      }}
      transition={{ duration: 0.3 }}
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
      <motion.div 
        className={cn(
          "relative flex items-center justify-center p-3 md:px-6 md:py-3 rounded-full transition-all duration-500 pointer-events-auto",
          "md:min-w-[400px]",
          scrolled || isOpen
            ? "liquid-glass shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]" 
            : "backdrop-blur-md bg-white/[0.02] border border-white/[0.05]"
        )}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow effect on the container */}
        <div className="absolute inset-0 rounded-full liquid-glass-glow pointer-events-none" />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 relative w-full justify-between z-10">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 liquid-mono group"
            >
              {pathname === item.href && (
                <MotionDiv
                  layoutId="active-nav-pill"
                  className="absolute inset-0 bg-white/[0.12] rounded-full backdrop-blur-md border border-white/[0.1]"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              {/* Shine reflection on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <motion.span 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "relative z-10 transition-colors duration-300 block",
                  pathname === item.href ? "text-white font-bold" : "text-zinc-400 group-hover:text-white"
                )}
              >
                {item.label}
              </motion.span>
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center justify-center md:hidden z-10">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-zinc-300 hover:text-white transition-colors flex items-center justify-center p-1 w-8 h-8 focus:outline-none"
            aria-label="Toggle menu"
          >
            <AnimatedMenuIcon isOpen={isOpen} />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 -top-6 -left-4 -right-4 z-[-1] bg-obsidian/80 md:hidden flex flex-col items-center justify-center h-[100vh] w-[100vw] pointer-events-auto"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-purple-900/10 pointer-events-none" />
            
            {/* Logo inside overlay */}
            <MotionDiv
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="absolute top-8 left-6"
            >
              <span className="text-[12px] font-bold text-white/50 tracking-[0.3em] uppercase">
                K.A.U
              </span>
            </MotionDiv>

            <div className="flex flex-col items-center space-y-8 relative z-10">
              {MENU_ITEMS.map((item, i) => (
                <MotionDiv
                  key={item.href}
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-5xl font-black tracking-tight transition-all duration-300 liquid-heading block",
                      pathname === item.href 
                        ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
                        : "text-zinc-600 hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                </MotionDiv>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
