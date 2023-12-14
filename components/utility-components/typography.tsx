'use client'
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

type TypographyProps = {
    children: React.ReactNode;
    additionalClasses?: string;
    isHeader: boolean;
    size?: string;
    isSplash?: boolean;
    animateEntrance?: boolean;
}

export default function Typography({
    children,
    additionalClasses,
    isHeader,
    size,
    isSplash,
    animateEntrance
}: TypographyProps) {
    const headerRef = useRef<HTMLHeadingElement | null>(null);
    const pRef = useRef<HTMLParagraphElement | null>(null);

    useEffect(() => {
        if (pRef.current, animateEntrance) {
            gsap.fromTo(pRef.current, {
                translateY: '20px',
                opacity: 0
            }, {
                translateY: '0px',
                opacity: 1,
                duration: 0.3
            })
        }
    }, [pRef, animateEntrance])

    useEffect(() => {
        if (headerRef.current && isHeader && isSplash) {
            gsap.fromTo(headerRef.current, {
                translateY: '50px',
                opacity: 0
            }, {
                translateY: '0px',
                opacity: 1,
                duration: 1
            })
        }
    }, [headerRef.current, isHeader, isSplash]);

  return !isHeader ? (
    <p
        ref={pRef}
        className={`
        ${size || 'text-base md:text-lg lg:text-xl'}
        ${additionalClasses}
        ${animateEntrance && 'opacity-0'}
        `}
    >
        {children}
    </p>
  ) : (
    <h1
        ref={headerRef}
        className={`
        ${size || 'text-[2rem] md:text-[2.5rem] font-medium'}
        ${additionalClasses}
        ${isSplash && 'opacity-0'}
        `}
    >
        {children}
    </h1>
  )
}
