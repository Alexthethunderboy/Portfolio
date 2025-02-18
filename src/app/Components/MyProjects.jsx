"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCube } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { FaDesktop, FaMobile, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Import project images
import mock1 from "@/assets/mockup1.png";
import mock1_0 from "@/assets/5.png";
import shopD from "@/assets/6.png";
import shopM from "@/assets/4.png";
import spotD from "@/assets/7.png";
import spotM from "@/assets/3.png";
import jrunM from "@/assets/2.png";
import jrunD from "@/assets/8.png";
import mock2 from "@/assets/mockup2.png";
import mock3 from "@/assets/mockup3.png";
import mock from "@/assets/mockup.png";
import mockM1 from "@/assets/mockM1.png";
import mockM1_0 from "@/assets/1.png";
import mockM2 from "@/assets/mockM2.png";
import mockM3 from "@/assets/mockM3.png";
import mockM4 from "@/assets/mockM4.png";
import mock4 from "@/assets/mockup4.png";

export const MyProjects = () => {
  const [showMobile, setShowMobile] = useState(false);

  const projects = [
    {
      name: "Shopper",
      description: "A modern, full-stack e-commerce platform.",
      desktopImage: shopD,
      mobileImage: shopM,
      link: "https://shopper-chi-six.vercel.app/",
      github: "https://github.com/Alexthethunderboy/shopper",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Prisma", "Shadcn UI"],
    },
    {
      name: "JRUN",
      description: "JRun is a platform that connects clients with service providers for various tasks such as cleaning, laundry, car wash, and more. ",
      desktopImage: jrunD,
      mobileImage: jrunM,
      link: "https://jrun-nu.vercel.app/",
      github: "https://github.com/Alexthethunderboy/JRUN",
      technologies: ["Next.js", "Tailwind CSS", "MongoDb", "NextAuth"],
    },
    {
      name: "Weather App",
      description: "A modern weather application with real-time updates and intuitive UI.",
      desktopImage: mock1_0,
      mobileImage: mockM1_0,
      link: "https://thunderweather.vercel.app/",
      github: "https://github.com/Alexthethunderboy/weatherApp",
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "OpenweatherAPI"],
    },
    {
      name: "Spotify Playlist Generator",
      description: "Music Playlist Generator is a web application that allows users to create personalized playlists based on their musical preferences.",
      desktopImage: spotD,
      mobileImage: spotM,
      link: "https://playlistgenerator.vercel.app/",
      github: "https://github.com/Alexthethunderboy/playlistgenerator",
      technologies: ["Next.js", "Tailwind CSS", "Spotify API"],
    },
    {
      name: "Blog Platform",
      description: "A feature-rich blogging platform with user authentication and dynamic content.",
      desktopImage: mock,
      mobileImage: mockM1,
      link: "https://new-blog-deploy.vercel.app",
      github: "https://github.com/yourusername/blog-platform",
      technologies: ["Next.js", "Tailwind CSS", "NextAuth"],
    },
    {
      name: "Insurance Project",
      description: "A sleek insurance company website with interactive elements and smooth animations.",
      desktopImage: mock3,
      mobileImage: mockM2,
      link: "https://insureproject.vercel.app/",
      github: "https://github.com/yourusername/insurance-project",
      technologies: ["HTML", "CSS", "JavaScript"],
    },
    {
      name: "E-commerce Solution",
      description: "A fully-featured e-commerce platform with product management and secure checkout.",
      desktopImage: mock2,
      mobileImage: mockM3,
      link: "https://new-ecommerce-seven.vercel.app/",
      github: "https://github.com/yourusername/ecommerce-solution",
      technologies: ["React", "Node.js", "MongoDB"],
    },
    {
      name: "Sunny Landing Page",
      description: "A vibrant and responsive landing page for a fictional company.",
      desktopImage: mock4,
      mobileImage: mockM4,
      link: "https://sunny-three.vercel.app/",
      github: "https://github.com/yourusername/sunny-landing",
      technologies: ["HTML", "SASS", "Bootstrap", "JavaScript"],
    },
  ];

  return (
    <div className="mx-auto my-10 text-white">
      <Swiper
        modules={[Navigation, Pagination, EffectCube]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        effect="cube"
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index}>
            <motion.div 
              className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl shadow-2xl overflow-hidden">
              <div className="relative aspect-video">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={showMobile ? 'mobile' : 'desktop'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={showMobile ? project.mobileImage : project.desktopImage}
                      alt={project.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{project.name}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-600 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-x-4">
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                    >
                      <FaExternalLinkAlt className="mr-2" /> Visit
                    </a>
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300"
                    >
                      <FaGithub className="mr-2" /> GitHub
                    </a>
                  </div>
                  <motion.button
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors duration-300"
                    onClick={() => setShowMobile(!showMobile)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {showMobile ? <FaDesktop /> : <FaMobile />}
                    <span className="ml-2">{showMobile ? "Desktop" : "Mobile"}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

