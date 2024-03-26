'use client'
import React from 'react'
import mock1 from '@/assets/mockup1.png'
import Image from 'next/image';


import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export const ImgSwipe = () => {
  return (
    <div>
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
      <Image className="rounded-t-lg" src={mock1} alt="" objectFit="cover" className=""/>

      </SwiperSlide>
      <SwiperSlide>
      <Image className="rounded-t-lg" src={mock1} alt="" objectFit="cover" className="w-[100%]"/>

      </SwiperSlide>
      
      
    </Swiper>
    </div>
  );
};