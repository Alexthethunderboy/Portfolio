"use client";
import React, { useState } from "react";
import mock1 from "@/assets/mockup1.png";
import mock2 from "@/assets/mockup2.png";
import mock3 from "@/assets/mockup3.png";
import mock from "@/assets/mockup.png";
import mockM1 from "@/assets/mockM1.png";
import mockM2 from "@/assets/mockM2.png";
import mockM3 from "@/assets/mockM3.png";
import mockM4 from "@/assets/mockM4.png";
import mock4 from "@/assets/mockup4.png";
import Image from "next/image";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaArrowsAltH, FaDesktop, FaHome, FaMobile } from "react-icons/fa";
import { Chart as ChartJs } from "chart.js/auto";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";



export const MyProjects = () => {
  const [show, setShow] = useState();

  const handleShow = () => {
    setShow(!show)
  };

  return (
    <div className="mx-auto my-10 flex text-white h-auto">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        // className='  w-[60%] h-[40%]'
      >
        <SwiperSlide className=" ">
          <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row md:w-[65vw] mx-auto items-center justify-center">
            <div className="basis-1/2 relative">
              <a href='https://blogg-sigma-indol.vercel.app/' target="_blank">
              {show && (
              <Image
                className="rounded-t-lg absolute top-0 "
                src={mockM1}
                alt=""
                objectFit="cover"
              />
              )}
              <Image
                className="rounded-t-lg"
                src={mock}
                alt=""
                objectFit="cover"
              />
              </a>
            </div>
            <div class="basis-1/2 p-4 h-80 md:h-23 ">
            <Bar
            className="w-60 md:h:61"
              data={{
                labels: ['Next.js', 'Tailwind', 'NextAuth'],
                datasets: [
                  {
                    label: "Percentage of usage",
                    data: [60, 35, 5],
                    backgroundColor: [
                      "rgba(114, 12, 179, 1)",
                      "rgba(41, 8, 118, 1)",
                      "rgba(107, 8, 118, 1)",
                    ]
                  },
                ]
              }}
            />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row md:w-[60vw] mx-auto items-center justify-center">
            <div className="basis-1/2 relative">
            <a href='https://insureproject.vercel.app/' target="_blank">

              {show && (
              <Image
                className="rounded-t-lg absolute top-0 "
                src={mockM2}
                alt=""
                objectFit="cover"
              />
              )}
              <Image
                className="rounded-t-lg"
                src={mock3}
                alt=""
                objectFit="cover"
              />
              </a>
            </div>
            <div class="basis-1/2 p-4 h-80 md:h-23 ">
            <Bar
            className="w-60 md:h:61"
              data={{
                labels: ['HTML', 'CSS', 'JavaScript'],
                datasets: [
                  {
                    label: "Percentage of usage",
                    data: [60, 35, 5],
                    backgroundColor: [
                      "rgba(114, 12, 179, 1)",
                      "rgba(41, 8, 118, 1)",
                      "rgba(107, 8, 118, 1)",
                    ]
                  },
                ]
              }}
            />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row md:w-[60vw] mx-auto items-center justify-center">
            <div className="basis-1/2 relative">
            <a href='https://new-ecommerce-seven.vercel.app/' target="_blank">
              {show && (
              <Image
                className="rounded-t-lg absolute top-0 "
                src={mockM3}
                alt=""
                objectFit="cover"
              />
              )}
              <Image
                className="rounded-t-lg"
                src={mock2}
                alt=""
                objectFit="cover"
              />
              </a>
            </div>
            <div class="basis-1/2 p-4 h-80 md:h-23 ">
            <Bar
            className="w-60 md:h:61"
              data={{
                labels: ['HTML', 'CSS', 'JavaScript'],
                datasets: [
                  {
                    label: "Percentage of usage",
                    data: [60, 35, 5],
                    backgroundColor: [
                      "rgba(114, 12, 179, 1)",
                      "rgba(41, 8, 118, 1)",
                      "rgba(107, 8, 118, 1)",
                    ]
                  },
                ]
              }}
            />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className=" ">
          <div class="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col md:flex-row md:w-[60vw] mx-auto items-center justify-center">
            <div className="basis-1/2 relative">
            <a href='https://sunny-three.vercel.app/' target="_blank">

              {show && (
              <Image
                className="rounded-t-lg absolute top-0"
                src={mockM4}
                alt=""
                objectFit="cover"
                
              />
              )}
              <Image
                className="rounded-t-lg"
                src={mock4}
                alt=""
                objectFit="cover"
              />
              </a>
            </div>
            <div class="basis-1/2 p-4 h-80 md:h-23 ">
            <Bar
            className="w-50  md:h:61 md:w-61"
              data={{
                labels: ['HTML', 'SASS', 'Bootstrap', 'JavaScript'],
                datasets: [
                  {
                    label: "Percentage of usage",
                    data: [60, 10, 25, 5],
                    backgroundColor: [
                      "rgba(114, 12, 179, 1)",
                      "rgba(41, 8, 118, 1)",
                      "rgba(107, 8, 118, 1)",
                    ]
                  },
                ]
              }}
            />
            </div>
          </div>
        </SwiperSlide>
       
      </Swiper>
      <div className="flex items-center justify-center gap-1 md:py-2 py-1 bg-black w-[100%] h-auto active:text-blue-900  hover:text-white cursor-pointer absolute md:bottom-[-52%] z-40" onClick={handleShow}>
                <div className=" cursor-pointer text-md flex items-center justify-center">
                  <FaDesktop className="w-[100%] h-auto px-1"/>
                </div>
                <FaArrowsAltH/>
                <div className=" cursor-pointer text-md flex items-center justify-center" >
                  <FaMobile className="w-[100%] h-auto px-1"/>
                </div>
              </div>
    </div>
  );
};
