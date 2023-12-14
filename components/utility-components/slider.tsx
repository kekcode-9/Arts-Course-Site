'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type SliderProps = {
  imageFile: string;
  total: number;
}

export default function Slider({
  imageFile,
  total
}: SliderProps) {
    const [index, setIndex] = useState(0);
    const MotionImage = motion(Image);

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((index+1)%total);
      }, 3000)

      return () => {
        clearInterval(interval);
      }
    }, [index])

  return (
    <motion.div
      className='relative w-full h-full'
      initial={{}}
      animate={{}}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5
        }
      }}
    >
      <AnimatePresence>
        <MotionImage 
          key={index}
          src={`/${imageFile}-${index}.webp`}
          alt='drawing-in-studio-1'
          quality={100}
          fill
          objectFit='cover'
          loading='lazy'
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 2
          }}
        />
      </AnimatePresence>
    </motion.div>
  )
}
