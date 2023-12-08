"use client";
import React, { useContext, useEffect, useRef } from "react";
import gsap from "gsap";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import HeaderLinks from "./header-links";
import Arrows from "./arrows";
import dynamicImports from "@/utilities/dynamic-imports";

const { HERO, COURSES_ADVERT, INSTRUCTORS } = HOME_ROUTES;

export default function RightColumn() {
  const { state } = useContext(CourseContext);
  const { showBoth, route } = state;
  const lowerDivRef = useRef<HTMLDivElement | null>(null);

  const imageContent = () => {
    switch (route) {
      case HERO:
        return dynamicImports(HERO, "HeroLargeRightImage");
      case COURSES_ADVERT:
        return dynamicImports(COURSES_ADVERT, "CourseAdvertLargeRightImage");
      default:
        return <></>;
    }
  };

  useEffect(() => {
    if (lowerDivRef.current) {
      setTimeout(() => {
        gsap.to(lowerDivRef.current, {
          scaleY: 1,
          duration: 0.5
        });
      }, 120);
    }
  }, [lowerDivRef.current])

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
        className={`relative basis-auto
          w-full h-full
          ${route === COURSES_ADVERT ? "bg-white" : ""}
          scale-y-0 origin-bottom
        `}
      >
        {
            imageContent()
        }
        <Arrows/>
      </div>
    </div>
  );
}
