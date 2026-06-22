'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Mail } from 'lucide-react';
import icon from '@/assets/thunderboyIcon.png';

const Footer = () => {
    return (
        <footer className="border-t border-white/5 bg-obsidian py-16">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex flex-col gap-4">
                        <Image
                            src={icon}
                            alt="Logo"
                            width={120}
                            height={30}
                            className="h-6 w-auto brightness-150 grayscale opacity-40 hover:opacity-100 transition-opacity"
                        />
                        <p className="text-silver text-[10px] uppercase tracking-[0.2em] obsidian-mono">
                            Built with passion and code.
                        </p>
                    </div>

                    <div className="flex items-center gap-8">
                        <a
                            href="https://github.com/Alexthethunderboy/Portfolio"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-silver hover:text-metallic transition-all duration-300 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] obsidian-mono"
                        >
                            <Github size={16} />
                            Source Code
                        </a>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex gap-4">
                            <a href="https://linkedin.com/in/kelechiugoh" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="mailto:kelechiugoh@example.com" className="text-gray-400 hover:text-white transition-colors">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[9px] uppercase tracking-[0.2em] obsidian-mono text-silver/40">
                    <p>© {new Date().getFullYear()} Kelechi Alexander Ugoh. Handcrafted in 2026</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
