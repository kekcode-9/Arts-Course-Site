'use client'
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

type CTAProps = {
    label: string;
    primary: boolean;
    canPlay?: boolean | null;
    submitButton?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CTA({
    label,
    primary,
    canPlay,
    submitButton,
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
        relative
        flex items-center justify-center 
        w-52 
        h-[48px] 
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
        className={`absolute -z-20
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
        className={`absolute -z-10
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
