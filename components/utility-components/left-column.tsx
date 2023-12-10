"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CourseContext, homeRoutesType, HOME_ROUTES } from "@/utilities/store";
import dynamicImports from "@/utilities/dynamic-imports";

const { 
    HERO, 
    COURSES_ADVERT, 
    RESOURCES_ADVERT, 
    INSTRUCTORS 
} = HOME_ROUTES;

export default function LeftColumn() {
  const [showContent, setShowContent] = useState(false);
  const { state } = useContext(CourseContext);
  const { route, lastRoute } = state;
  const divRef = useRef<HTMLDivElement | null>(null);
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
      const tl = gsap.timeline();
      // scale upper div to realize the assigned height
      tl.to(upperDivRef.current, {
        scaleY: 1,
        transformOrigin: 'top',
        duration: 0.5
      });
      // set div height to 50% and initial scaleY to 0
      gsap.set(lowerDivRef.current, {
        height: '50%',
        scaleY: 0
      })
      divRef.current && tl.set(divRef.current, {
        backgroundColor: 'white'
      })
      // scale lower div to realize the assigned height
      setTimeout(() => {
        gsap.to(lowerDivRef.current, {
          scaleY: 1,
          duration: 0.5
        });
        setShowContent(true);
      }, 120);
    }
  }, [upperDivRef.current, lowerDivRef.current])

  useEffect(() => {
    if (lastRoute !== route) {
      if (lastRoute === HERO && route === COURSES_ADVERT) {
        setShowContent(false);
        // when navigating from hero to courses_advert
        // first scale upperdiv to 0 height for smooth transition
        gsap.to(upperDivRef.current, {
          transformOrigin: 'top',
          scaleY: 0,
          onComplete: () => {
            // onces scaled to 0, remove it from DOM so lower div can expand
            gsap.set(upperDivRef.current, {
              display: 'none'
            })
          }
        });

        // scale up lower div to realize the assigned height, which is the screen height
        gsap.to(lowerDivRef.current, {
          height: '100vh',
          onComplete: () => {
            setShowContent(true);
          }
        })
      } else if (lastRoute === COURSES_ADVERT && route === HERO) {
        setShowContent(false);
        gsap.set(upperDivRef.current, {
          display: 'flex',
          scaleY: 0
        })
        gsap.to(upperDivRef.current, {
          transformOrigin: 'top',
          scaleY: 1
        });

        gsap.to(lowerDivRef.current, {
          height: '50%',
          onComplete: () => {
            setShowContent(true);
          }
        })
      }
    }
  }, [lowerDivRef.current, route, lastRoute]);

  return (
    <div
      ref={divRef}
      className={`relative
        w-full h-screen
      `}
    >
      <div
        ref={upperDivRef}
        className="div-left-upper
          flex justify-center
          w-full h-1/2
          lg:pt-[7.75rem]
          bg-burnt-orange 
          scale-y-0"
      >
        {route === HERO && dynamicImports("hero", "ObjectiveSection")}
      </div>
      <div
        ref={lowerDivRef}
        className={`div-left-lower
          absolute bottom-0
          ${
          route === RESOURCES_ADVERT &&
          "flex flex-col items-center justify-around"
          }
          w-full 
          origin-bottom
          ${(route === HERO || route === COURSES_ADVERT) ? 'bg-white' : 'bg-neutral-dark-gray-bg'}
        `}
      >
        {showContent && divLowerContent()}
      </div>
    </div>
  );
}
