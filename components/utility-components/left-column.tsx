"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import dynamicImports from "@/utilities/dynamic-imports";

const { HERO, COURSES_ADVERT, RESOURCES_ADVERT, INSTRUCTORS } = HOME_ROUTES;

const HeroLeftImage = dynamicImports(HERO, "HeroLargeLeftColImage");
const CoursesLeftCol = dynamicImports(
  COURSES_ADVERT,
  "CoursesAdvertLargeLeftCol",
  "CoursesLeftCol"
);
const ResourcesLeftCol = dynamicImports(
  RESOURCES_ADVERT,
  "ResourcesAdvertLargeLeftCol",
  "ResourcesLeftCol"
);
const InstructorsLeftCol = dynamicImports(
  INSTRUCTORS,
  "InstructorLargeLeft",
  "InstructorsLeftCol"
);

export default function LeftColumn() {
  const [showContent, setShowContent] = useState(false);
  const { state } = useContext(CourseContext);
  const { route, lastRoute, isSplashScreen } = state;
  const divRef = useRef<HTMLDivElement | null>(null);
  const upperDivRef = useRef<HTMLDivElement | null>(null);
  const lowerDivRef = useRef<HTMLDivElement | null>(null);

  const divLowerContent = () => {
    switch (route) {
      case HERO:
        return HeroLeftImage;
      case COURSES_ADVERT:
        return CoursesLeftCol;
      case RESOURCES_ADVERT:
        return ResourcesLeftCol;
      case INSTRUCTORS:
        return InstructorsLeftCol;
      default:
        return HeroLeftImage;
    }
  };

  const upperDivEntryAnimationHero = (tl: gsap.core.Timeline) => {
    if (upperDivRef.current) {
      tl.to(upperDivRef.current, {
        scaleY: 1,
        transformOrigin: "top",
        duration: 0.5,
      });
    }
  };

  const lowerDivEntryAnimationHero = (
    reentry: boolean,
    tl?: gsap.core.Timeline
  ) => {
    if (lowerDivRef.current) {
      !reentry
        ? gsap.to(lowerDivRef.current, {
            scaleY: 1,
            duration: 0.5,
            onComplete: () => {
              setShowContent(true);
            },
          })
        : tl &&
          tl.to(lowerDivRef.current, {
            height: "50%",
            onComplete: () => {
              setShowContent(true);
            },
          });
    }
  };

  const upperDivExitAnimationHero = (tl: gsap.core.Timeline) => {
    if (upperDivRef.current) {
      tl.to(upperDivRef.current, {
        transformOrigin: "top",
        scaleY: 0,
      }).set(upperDivRef.current, {
        display: "none",
      });
    }
  };

  const lowerDivTransitionCourses = (tl: gsap.core.Timeline) => {
    tl.to(lowerDivRef.current, {
      height: "100vh",
      onComplete: () => {
        setShowContent(true);
      },
    });
  };

  const lowerDivTransitionResources = () => {
    gsap.to(lowerDivRef.current, {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      background: "#181818",
      delay: 0.5,
    });
  };

  useEffect(() => {
    if (
      upperDivRef.current &&
      lowerDivRef.current &&
      lastRoute === HERO &&
      route === HERO &&
      !isSplashScreen
    ) {
      const tl = gsap.timeline();

      upperDivEntryAnimationHero(tl);

      // lowerdiv height set on first entry
      gsap.set(lowerDivRef.current, {
        height: "50%",
        scaleY: 0,
      });
      // parent background set to white for smoother transition later on
      divRef.current &&
        tl.set(divRef.current, {
          backgroundColor: "white",
        });

      setTimeout(() => {
        lowerDivEntryAnimationHero(false);
      }, 120);
    }
  }, [upperDivRef.current, lowerDivRef.current, isSplashScreen]);

  useEffect(() => {
    if (lastRoute !== route) {
      if (lastRoute === HERO && route === COURSES_ADVERT) {
        setShowContent(false);
        const tl = gsap.timeline();

        upperDivExitAnimationHero(tl);

        lowerDivTransitionCourses(tl);
      } else if (lastRoute === COURSES_ADVERT) {
        if (route === HERO) {
          setShowContent(false);
          const tl = gsap.timeline();
          gsap.set(upperDivRef.current, {
            display: "flex",
            scaleY: 0,
          });
          upperDivEntryAnimationHero(tl);

          lowerDivEntryAnimationHero(true, tl);
        } else {
          lowerDivTransitionResources();
        }
      } else if (lastRoute === RESOURCES_ADVERT) {
        gsap.to(lowerDivRef.current, {
          display: "block",
          delay: 0.5,
        });
        if (route === COURSES_ADVERT) {
          gsap.to(lowerDivRef.current, {
            background: "white",
            delay: 0.5,
          });
        }
      } else if (lastRoute === INSTRUCTORS) {
        lowerDivTransitionResources();
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
          w-full 
          origin-bottom
          ${
            route === HERO || route === COURSES_ADVERT
              ? "bg-white"
              : "bg-neutral-dark-gray-bg"
          }
        `}
      >
        <AnimatePresence mode="wait">
          {showContent && divLowerContent()}
        </AnimatePresence>
      </div>
    </div>
  );
}
