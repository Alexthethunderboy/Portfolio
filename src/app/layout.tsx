import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import LiquidBackground from "@/components/layout/LiquidBackground";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import ContactDock from "@/components/layout/ContactDock";
import { Metadata } from 'next';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio-seven-xi-62.vercel.app'),
  title: 'Kelechi Alexander Ugoh | Software Engineer Showcase',
  description: 'Enterprise-ready software engineering portfolio focusing on performance, scalability, and recruiter-centric UX.',
  openGraph: {
    title: 'Kelechi Alexander Ugoh | Software Engineer',
    description: 'Specializing in high-performance Next.js and TypeScript applications.',
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} relative min-h-screen bg-obsidian text-metallic selection:bg-neon-primary/30 overflow-x-hidden font-sans`}>
        <CustomCursor />
        <LiquidBackground />
        <Navbar />
        <main className="relative z-10 pt-16">
          {children}
        </main>
        <ContactDock />
        <Footer />
        <ToastContainer theme="dark" position="bottom-right" toastClassName="!bg-carbon !border !border-white/10 !text-metallic !font-sans" />
      </body>
    </html>
  );
}
