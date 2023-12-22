"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import HeaderLinks from "./header-links";
import Arrows from "./arrows";
import dynamicImports from "@/utilities/dynamic-imports";

const { HERO, COURSES_ADVERT, INSTRUCTORS } = HOME_ROUTES;

const HeroRightImage = dynamicImports(HERO, "HeroLargeRightImage", "HeroRightImage");
const CoursesRightImage = dynamicImports(COURSES_ADVERT, "CourseAdvertLargeRightImage", "CoursesRightImage");

export default function RightColumn() {
  const [showImage, setShowImage] = useState(false);
  const { state } = useContext(CourseContext);
  const { showBoth, route, lastRoute, isSplashScreen } = state;
  const divRef = useRef<HTMLDivElement | null>(null);
  const lowerDivRef = useRef<HTMLDivElement | null>(null);

  const imageContent = () => {
    switch (route) {
      case HERO:
        return HeroRightImage;
      case COURSES_ADVERT:
        return CoursesRightImage;
    }
  }

  useEffect(() => {
    //window.addEventListener('scroll', () => alert('scrolling'))
  }, [])

  useEffect(() => {
    if (lastRoute === HERO && route === HERO && !isSplashScreen) {
      gsap.to(lowerDivRef.current, {
        background: 'white',
        scaleY: 1,
        duration: 0.5,
        onComplete: () => setShowImage(true)
      })
    } else if (lastRoute !== route && route === COURSES_ADVERT && lowerDivRef.current) {
      gsap.to(lowerDivRef.current, {
        background: 'white',
        scaleY: 1.08,
        delay: (lastRoute !== HERO ? 0.5 : 0),
        duration: 0.5
      })
    } else if (lastRoute === COURSES_ADVERT) {
      const tl = gsap.timeline();
      tl.to(lowerDivRef.current, {
        background: (route !== HERO ? 'transparent' : 'white'),
        delay: 0.5,
        duration: 0.3
      })
      tl.set(lowerDivRef.current, {
        scaleY: 1
      })
    } else if (route === INSTRUCTORS) {
      setTimeout(() => {
        gsap.set(divRef.current, {
          position: 'absolute',
          zIndex: 10,
          right: 0,
          width: '33.33%'
        })
      }, 500);
    } else if (lastRoute === INSTRUCTORS) {
      setTimeout(() => {
        gsap.set(divRef.current, {
          position: 'static',
          zIndex: 0,
          width: '100%'
        })
      }, 500);
    }
  }, [route, lastRoute, isSplashScreen]);

  return (
    <div
      ref={divRef}
      className={`right-col
        flex flex-col
        w-full
        h-screen min-h-[770px]
      `}
    >
      <HeaderLinks
        hideOnLarge={false}
        height={showBoth || route === INSTRUCTORS ? "lg:h-1/6" : null}
      />
      <div
        ref={lowerDivRef}
        className={`relative basis-auto
          w-full h-full
          scale-y-0 origin-bottom
        `}
      >
        <AnimatePresence>
          {showImage && imageContent()}
        </AnimatePresence>
        <Arrows />
      </div>
    </div>
  );
}
