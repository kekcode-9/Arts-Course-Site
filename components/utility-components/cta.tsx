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
    headerButton?: boolean;
    isLoading?: boolean;
}

export default function CTA({
    label,
    primary,
    canPlay,
    submitButton,
    longButton,
    headerButton,
    isLoading,
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

  useEffect(() => {
    const tween = isLoading && gsap.to(bgDivRef.current, {
      opacity: 0.4,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });

    return () => {
      tween && tween.revert();
    }
  }, [isLoading, bgDivRef.current])

  return (
    <button
        className={`
          relative z-10
          flex items-center justify-center 
          ${
            longButton ? 
            'w-[20rem] md:w-[30rem] h-[3.375rem]' : 
            (headerButton ? 'w-[10rem] xl:w-52 h-12' : 'w-52 h-12')
          } 
          text-xl ${primary ? 'text-neutral-dark-gray-bg' : 'text-white'} 
          cursor-pointer  
          active:scale-[1.03] transition-all
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
