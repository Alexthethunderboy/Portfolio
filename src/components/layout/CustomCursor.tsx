'use client';
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

const CustomCursor = () => {
    const [isPointer, setIsPointer] = useState(false);

    const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            const target = e.target as HTMLElement;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON'
            );
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    return (
        <motion.div
            style={{
                x: cursorX,
                y: cursorY,
                position: 'fixed',
                top: 0,
                left: 0,
                translateX: '-50%',
                translateY: '-50%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        >
            <motion.div
                animate={{
                    scale: isPointer ? 1.2 : 1,
                    rotate: isPointer ? 45 : 0,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <div className="relative w-8 h-8 hidden md:flex items-center justify-center">
                    {/* Crosshair Lines */}
                    <div className={cn(
                        "absolute w-full h-[1px] transition-colors duration-300",
                        isPointer ? "bg-neon-primary" : "bg-white/20"
                    )} />
                    <div className={cn(
                        "absolute h-full w-[1px] transition-colors duration-300",
                        isPointer ? "bg-neon-primary" : "bg-white/20"
                    )} />
                    
                    {/* Inner Dot */}
                    <div className={cn(
                        "w-1 h-1 transition-all duration-300",
                        isPointer ? "bg-neon-primary scale-150 shadow-[0_0_10px_rgba(57,255,20,0.5)]" : "bg-white"
                    )} />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
