"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import dynamicImports from "@/utilities/dynamic-imports";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import gsap from "gsap";
import Typography from "./typography";
import constants from "@/utilities/constants/constants";
import { HeaderSection } from "../home/hero";

const { HERO, COURSES_ADVERT, RESOURCES_ADVERT, INSTRUCTORS } = HOME_ROUTES;

const HeroApplySection = dynamicImports("hero", "ApplySection");
const CoursesMiddleCol = dynamicImports(COURSES_ADVERT, "MiddleColumn", "CoursesMiddleCol");
const ResourcesWrapper = dynamicImports(RESOURCES_ADVERT, "ResourcesWrapper", "ResourcesWrapper");

const { NAME_HEADER } = constants;

function SplashScreen() {
  const { state } = useContext(CourseContext);
  const { isSplashScreen } = state;
  return (
      <Typography isHeader={true} isSplash={isSplashScreen} additionalClasses="relative z-20" >
        {NAME_HEADER}
      </Typography>
  )
}

type MiddleColumnProps = {
  position?: string;
  flex?: string;
  additionalClasses?: string;
};

export default function MiddleColumn({
  position,
  flex,
  additionalClasses
}: MiddleColumnProps) {
  const [ showUpperContent, setShowUpperContent ] = useState(true);
  const [ showLowerContent, setShowLowerContent] = useState(false);
  const { state } = useContext(CourseContext);
  const { route, lastRoute, isSplashScreen } = state;
  const divRef = useRef<HTMLDivElement | null>(null);
  const upperDivRef = useRef<HTMLDivElement | null>(null);
  const lowerDivRef = useRef<HTMLDivElement | null>(null);

  const divContent = () => {
    switch (route) {
      case HERO:
        return <SplashScreen/>;
      case COURSES_ADVERT:
        return CoursesMiddleCol;
      case RESOURCES_ADVERT:
        return ResourcesWrapper;
      default:
        return <HeaderSection/>;
    }
  };

  useEffect(() => {
    if (lowerDivRef.current && !isSplashScreen) {
      gsap.to(lowerDivRef.current, {
        scaleY: 1,
        duration: 0.5,
        onComplete: () => {
          setShowLowerContent(true);
        }
      })
    }
  }, [lowerDivRef.current, isSplashScreen]);

  useEffect(() => {
    if (upperDivRef.current && lowerDivRef.current) {
      if (lastRoute === HERO && route === COURSES_ADVERT) {
        setShowUpperContent(false);
        setShowLowerContent(false);
        const tl = gsap.timeline();
        tl.to(lowerDivRef.current, {
          scaleY: 0,
          transformOrigin: 'bottom',
          duration: 0.5,
          onComplete: () => {
            gsap.set(lowerDivRef.current, {
              display: 'none'
            });
          }
        });
        tl.to(upperDivRef.current, {
          height: '100%',
          onComplete: () => {
            setShowUpperContent(true);
          }
        });
      } else if (lastRoute === COURSES_ADVERT && route === HERO) {
        setShowUpperContent(false);
        const tl = gsap.timeline();
        tl.set(lowerDivRef.current, {
          display: 'flex',
        });
        tl.to(upperDivRef.current, {
          height: '50%',
          delay: 0.5,
          onComplete: () => {
            setShowUpperContent(true);
          }
        })
        tl.to(lowerDivRef.current, {
          scaleY: 1,
          duration: 0.5,
          onComplete: () => {
            setShowLowerContent(true);
          }
        });
      } else if (route === INSTRUCTORS) {
        gsap.to(divRef.current, {
          display: 'none',
          delay: 0.5
        })
      } else if (lastRoute === INSTRUCTORS) {
        const tl = gsap.timeline();
        tl.set(divRef.current, {
          display: 'block',
          opacity: 0
        })
        .to(divRef.current, {
          opacity: 1,
          delay: 1
        })
      }
    }
  }, [lastRoute, route])

  return (
    <div
      ref={divRef}
      className={`middle-col
      ${position}
      ${flex}
      w-full 
      h-full min-h-[770px]
      ${additionalClasses}
      overflow-clip
      `}
    >
      <div
        ref={upperDivRef}
        className={`div-middle-upper
          relative z-10
          flex ${route !== HERO && "flex-col"} items-center justify-center 
          ${
            route === COURSES_ADVERT
              ? "gap-6 lg:gap-8"
              : route === RESOURCES_ADVERT && "gap-2"
          }
          w-full 
          h-1/2
      `}
      >
        <AnimatePresence mode="wait">
          {showUpperContent && route !== INSTRUCTORS && divContent()}
        </AnimatePresence>
      </div>
      <div
        ref={lowerDivRef}
        className={`div-middle-lower
          flex items-center justify-center
          w-full h-1/2 
          bg-burnt-orange
          scale-y-0 origin-bottom
      `}
      >
        {route === HERO && showLowerContent && HeroApplySection}
      </div>
    </div>
  );
}
