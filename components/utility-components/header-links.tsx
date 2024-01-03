'use client'
import React, { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import Link from "next/link";
import constants from "@/utilities/constants/constants";
import { CourseContext, HOME_ROUTES } from "@/utilities/stores/courseContextStore";

const { LOG_IN, MENU } = constants;

const { HERO, COURSES_ADVERT } = HOME_ROUTES;

type HeaderLinksProps = {
  hideOnLarge: boolean;
  height?: string | null;
};

export default function HeaderLinks({
  hideOnLarge,
  height,
}: HeaderLinksProps) {
  const { state } = useContext(CourseContext);
  const { route, lastRoute, isSplashScreen } = state;
  const headerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (headerRef.current && !isSplashScreen) {
      gsap.to(headerRef.current, {
        translateY: "0%",
        duration: 0.5,
      });
    }
  }, [headerRef.current, isSplashScreen]);

  useEffect(() => {
    if (lastRoute !== route && route === COURSES_ADVERT && headerRef.current) {
      lastRoute === HERO &&
        gsap.to(headerRef.current, {
          translateY: "-25%",
          transformOrigin: "bottom",
        });
    } else if (lastRoute === COURSES_ADVERT) {
      route === HERO &&
        gsap.to(headerRef.current, {
          translateY: "0%",
          duration: 0.5,
        });
    }
  }, [headerRef.current, route, lastRoute]);

  return (
    <div
      ref={headerRef}
      className={`${hideOnLarge && "lg:hidden"}
            relative z-10
            max-lg:fixed max-lg:z-[100] flex max-lg:items-center max-lg:justify-between 
            lg:grid lg:grid-cols-4
            w-full
            min-h-[6rem] md:h-28 lg:h-[25%]
            lg:pt-[7.75rem] max-lg:px-14 max-sm:px-8
            md:text-xl text-lg
            bg-burnt-orange
            lg:-translate-y-full
        `}
    >
      <Link href={"/"} className="lg:col-end-3 lg:text-right">
        {LOG_IN}
      </Link>
      <Link href={"/"} className="lg:col-end-4 lg:text-right">
        {MENU}
      </Link>
    </div>
  );
}
