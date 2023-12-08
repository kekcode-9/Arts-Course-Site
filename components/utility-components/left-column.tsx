"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { CourseContext, homeRoutesType, HOME_ROUTES } from "@/utilities/store";
import dynamicImports from "@/utilities/dynamic-imports";

const { 
    HERO, 
    COURSES_ADVERT, 
    RESOURCES_ADVERT, 
    INSTRUCTORS 
} = HOME_ROUTES;

export default function LeftColumn() {
  const [lastRoute, setLastRoute] = useState<homeRoutesType>(HERO);
  const { state } = useContext(CourseContext);
  const { route } = state;
  const upperDivRef = useRef<HTMLDivElement | null>(null);
  const lowerDivRef = useRef<HTMLDivElement | null>(null);

  const divLowerContent = () => {
    switch (route) {
      case HERO:
        return dynamicImports(HERO, "HeroLargeLeftColImage");
      case COURSES_ADVERT:
        return dynamicImports(COURSES_ADVERT, "CoursesAdvertLargeLeftCol");
      case RESOURCES_ADVERT:
        return dynamicImports(RESOURCES_ADVERT, "ResourcesAdvertLargeLeftCol");
      case INSTRUCTORS:
        return dynamicImports(INSTRUCTORS, 'InstructorLargeLeft');
      default:
        return dynamicImports(HERO, "HeroLargeLeftColImage");
    }
  };

  useEffect(() => {
    if (upperDivRef.current && lowerDivRef.current) {
      gsap.to(upperDivRef.current, {
        scaleY: 1,
        duration: 0.5
      });
      setTimeout(() => {
        gsap.to(lowerDivRef.current, {
          scaleY: 1,
          duration: 0.5
        });
      }, 120);
    }
  }, [upperDivRef.current, lowerDivRef.current])

  // useEffect(() => {
  //   if (lastRoute !== route) {
  //     if (lastRoute === HERO && route === COURSES_ADVERT) {
  //       gsap.to(lowerDivRef.current, {
  //         transformOrigin: 'bottom',
  //         scaleY: 1,
  //         duration: 0.5
  //       });
  //     } else if (lastRoute === COURSES_ADVERT && route === HERO) {
  //       gsap.from(lowerDivRef.current, {
  //         transformOrigin: 'top',
  //         scaleY: 1,
  //         duration: 0.25
  //       })
  //     }
  //     setLastRoute(route);
  //   }
  // }, [lowerDivRef.current, route, lastRoute]);

  return (
    <div
      className={`
        w-full h-screen
      `}
    >
      <AnimatePresence>
        {
          route === HERO && (
          <motion.div
            ref={upperDivRef}
            className="div-left-upper
              flex justify-center
              w-full h-1/2
              lg:pt-[7.75rem]
              bg-burnt-orange 
              scale-y-0 origin-top"
          >
            {route === HERO && dynamicImports("hero", "ObjectiveSection")}
          </motion.div>
        )}
      </AnimatePresence>
      <div
        ref={lowerDivRef}
        className={`div-left-lower
          relative
          ${
          route === RESOURCES_ADVERT &&
          "flex flex-col items-center justify-around"
          }
          w-full 
          ${(route === HERO) ? "h-1/2" : "h-screen"}
          scale-y-0 ${route === HERO ? 'origin-bottom' : 'origin-top'} bg-white
        `}
      >
          {divLowerContent()}
      </div>
    </div>
  );
}
