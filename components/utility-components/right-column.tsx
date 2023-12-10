"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import HeaderLinks from "./header-links";
import Arrows from "./arrows";
import dynamicImports from "@/utilities/dynamic-imports";
import { CourseAdvertLargeRightImage } from "../home/courses-advert";
import { HeroLargeRightImage } from "../home/hero";

const { HERO, COURSES_ADVERT, INSTRUCTORS } = HOME_ROUTES;

export default function RightColumn() {
  const { state } = useContext(CourseContext);
  const { showBoth, route, lastRoute } = state;
  const lowerDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastRoute === HERO && route === HERO) {
      gsap.to(lowerDivRef.current, {
        scaleY: 1,
        duration: 0.5
      })
    } else if (lastRoute !== route && route === COURSES_ADVERT && lowerDivRef.current) {
      gsap.to(lowerDivRef.current, {
        scaleY: 1.08,
        duration: 0.5
      })
    } else if (lastRoute === COURSES_ADVERT) {
      gsap.to(lowerDivRef.current, {
        scaleY: 1,
        duration: 0.5
      })
    }
  }, [route, lastRoute]);

  return (
    <div
      className={`
        ${route === INSTRUCTORS && "absolute z-10 right-0"}
        flex flex-col 
        ${route === INSTRUCTORS ? "w-[33.33%]" : "w-full"} 
        h-screen
      `}
    >
      <HeaderLinks
        hideOnLarge={false}
        height={showBoth || route === INSTRUCTORS ? "lg:h-1/6" : null}
      />
      <div
        ref={lowerDivRef}
        className={`relative -z-9 basis-auto
          w-full h-full
          ${(route === COURSES_ADVERT || route === HERO) ? "bg-white" : ""}
          scale-y-0 origin-bottom
        `}
      >
        <AnimatePresence>
          {
            route === HERO ? 
            dynamicImports(HERO, "HeroLargeRightImage")
            : route === COURSES_ADVERT && dynamicImports(COURSES_ADVERT, "CourseAdvertLargeRightImage")
          }
        </AnimatePresence>
        <Arrows />
      </div>
    </div>
  );
}
