'use client'
import React, { useEffect, useRef, useContext } from "react";
import gsap from "gsap";
import Link from "next/link";
import constants from "@/utilities/constants/constants";
import { CourseContext, HOME_ROUTES } from "@/utilities/stores/courseContextStore";
import routes from "@/utilities/constants/routes";
import Menu from "./menu-utility/menu";
import MenuContent from "./menu-utility/menu-content";

const { LOGIN_SIGNUP } = routes;

const { LOG_IN } = constants;

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
          translateY: screen.width < 920 ? "0%" : "-25%",
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
    <>
      <div
        ref={headerRef}
        className={`header-links-wrapper
              ${hideOnLarge && "lg:hidden"}
              relative z-10
              max-lg:fixed max-lg:z-[100] 
              flex lg:justify-end
              max-lg:items-center max-lg:justify-between 
              w-full
              min-h-[6rem] md:h-28 lg:h-[25%]
              lg:pt-[7.75rem] 
              max-sm:px-8 max-lg:px-16 lg:pr-[4.5rem] xl:pr-[6.5rem]
              md:text-xl text-lg
              bg-burnt-orange
              lg:-translate-y-full
          `}
      >
        <Link 
          href={LOGIN_SIGNUP} 
          className="lg:pr-16 
          lg:text-right font-sans
          whitespace-nowrap"
        >
          {LOG_IN}
        </Link>
        <Menu/>
      </div>
    </>
  );
}
