'use client'
import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

type DownArrowRectProps = {
    up: boolean;
    onClick: (() => void) | undefined;
  }  

export default function DownArrowRect({
    up,
    onClick
}: DownArrowRectProps) {
  const rectRef = useRef<SVGRectElement | null>(null);
  const arrowRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (rectRef.current) {
      gsap.fromTo([rectRef.current], {
        scaleY: 0
      }, {
        scaleY: 1,
        delay: 0.3,
        duration: 0.5
      })
    }
  }, [rectRef.current]);

  return (
    <svg className='cursor-pointer' onClick={onClick} width="40" height="68" viewBox="0 0 40 68" fill="none" transform={up ? 'rotate(-180)' : 'rotate(0)'} xmlns="http://www.w3.org/2000/svg">
        <rect ref={rectRef} width="40" height="68" fill="#772F06"/>
        <path ref={arrowRef} d="M19.2929 54.7071C19.6834 55.0976 20.3166 55.0976 20.7071 54.7071L27.0711 48.3431C27.4616 47.9526 27.4616 47.3195 27.0711 46.9289C26.6805 46.5384 26.0474 46.5384 25.6569 46.9289L20 52.5858L14.3431 46.9289C13.9526 46.5384 13.3195 46.5384 12.9289 46.9289C12.5384 47.3195 12.5384 47.9526 12.9289 48.3431L19.2929 54.7071ZM19 14L19 54L21 54L21 14L19 14Z" fill="white"/>
    </svg>

  )
}
