'use client'
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

type CTAProps = {
    label: string;
    primary: boolean;
    canPlay?: boolean | null;
    submitButton?: boolean;
    longButton?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CTA({
    label,
    primary,
    canPlay,
    submitButton,
    longButton,
    onClick
}: CTAProps) {
  const bgDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bgDivRef.current) {
      gsap.to(bgDivRef.current, {
        scaleY: 1,
        transformOrigin: 'top',
        delay: 0.2,
        duration: 0.5
      })
    }
  }, [bgDivRef.current, canPlay])

  return (
    <button
        className={`
          relative z-10
          flex items-center justify-center 
          ${longButton ? 'w-[20rem] md:w-[30rem] h-[3.375rem]' : 'w-52 h-12'} 
          text-xl ${primary ? 'text-neutral-dark-gray-bg' : 'text-white'} 
          cursor-pointer 
        `}
        type={submitButton ? 'submit' : 'button'}
        onClick={(e) => {
          onClick && onClick(e);
        }}
    >
      {label}
      <motion.div 
        className={`absolute -z-[2]
        w-full h-full
        ${primary ? 'bg-neutral-dark-gray-bg' : 'bg-white'}
        `} 
        exit={{
          scaleY: 0,
          transformOrigin: 'top',
          transition: {
            duration: 0.5
          }
        }}
      />
      <motion.div 
        ref={bgDivRef}
        className={`absolute -z-[1]
        w-full h-full
        scale-y-0
        ${primary ? 'bg-white' : 'bg-burnt-orange'}
        `} 
        exit={{
          scaleY: 0,
          transformOrigin: 'top',
          transition: {
            duration: 0.3
          }
        }}
      />
    </button>
  )
}
