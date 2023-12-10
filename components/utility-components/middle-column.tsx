"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import dynamicImports from "@/utilities/dynamic-imports";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import gsap from "gsap";

const { HERO, COURSES_ADVERT, RESOURCES_ADVERT, INSTRUCTORS } = HOME_ROUTES;

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
  const [ showUpperContent, setShowUpperContent ] = useState(false);
  const [ showLowerContent, setShowLowerContent] = useState(false);
  const { state } = useContext(CourseContext);
  const { route, lastRoute } = state;
  const upperDivRef = useRef<HTMLDivElement | null>(null);
  const lowerDivRef = useRef<HTMLDivElement | null>(null);

  const divContent = () => {
    switch (route) {
      case HERO:
        return dynamicImports(HERO, "HeaderSection");
      case COURSES_ADVERT:
        return dynamicImports(COURSES_ADVERT, "MiddleColumn");
      case RESOURCES_ADVERT:
        return dynamicImports(RESOURCES_ADVERT, "ResourcesWrapper");
      default:
        return dynamicImports(HERO, "HeroLargeMiddleCol");
    }
  };

  useEffect(() => {
    if (upperDivRef.current && lowerDivRef.current) {
      setTimeout(() => {
        gsap.to(upperDivRef.current, {
          scaleY: 1,
          duration: 0.5,
          onComplete: () => {
            setShowUpperContent(true);
          }
        });
      }, 100);

      gsap.to(lowerDivRef.current, {
        scaleY: 1,
        duration: 0.5,
        onComplete: () => {
          setShowLowerContent(true);
        }
      })
    }
  }, [upperDivRef.current, lowerDivRef.current]);

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
      } if (lastRoute === COURSES_ADVERT && route === HERO) {
        setShowUpperContent(false);
        const tl = gsap.timeline();
        tl.set(lowerDivRef.current, {
          display: 'flex',
        });
        tl.to(upperDivRef.current, {
          height: '50%',
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
      }
    }
  }, [lastRoute, route])

  return (
    <div
      className={`
            ${route === INSTRUCTORS && "hidden"}
            ${position}
            ${flex}
            w-full h-full
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
          ${/*route === HERO ? "h-1/2" : "h-full"*/'h-1/2'}
          ${route === RESOURCES_ADVERT && "bg-black"}
          scale-y-0 origin-top
      `}
      >
        {showUpperContent && divContent()}
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
        {route === HERO && showLowerContent && dynamicImports("hero", "ApplySection")}
      </div>
    </div>
  );
}
