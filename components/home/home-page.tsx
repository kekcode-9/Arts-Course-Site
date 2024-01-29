"use client";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { HeroMobileDevices } from "./hero";
import LeftColumn from "../utility-components/left-column";
import RightColumn from "../utility-components/right-column";
import MiddleColumn from "../utility-components/middle-column";
import MobileContent from "../utility-components/mobile-content";
import {
  CourseContext,
  HOME_ROUTES,
} from "@/utilities/stores/courseContextStore";
import { ACTIONS } from "@/utilities/constants/actions";
import SplashGif from "@/public/splash.gif";
import MenuContent from "../utility-components/menu-utility/menu-content";
import webStorageItems from "@/utilities/constants/web-storage-items";
import routes from "@/utilities/constants/routes";
import { getCurrentUser } from "@/lib/firebase/firebase-auth";

const { IS_SPLASH_OVER } = webStorageItems;

const { HERO } = HOME_ROUTES;

const {
  SET_UNSET_SPLASH_SCREEN,
  UPDATE_ROUTE,
  SET_SHOWBOTH,
  SET_ISLAST,
  RESET_ROUTE,
} = ACTIONS.HOME_ROUTE_ACTIONS;

const ROUTES = Object.values(HOME_ROUTES);

function AssembledContentLarge() {
  const { state } = useContext(CourseContext);
  const { isSplashScreen } = state;
  const [isWindowAvailable, setIsWindowAvailable] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsWindowAvailable(true);
    }
  }, []);

  return (
    <section
      className={`
            relative
            hidden lg:flex
            w-full 
            h-screen min-h-[770px]
            overflow-clip
            `}
    >
      <LeftColumn />
      <MiddleColumn />
      <RightColumn />
      {isSplashScreen &&
        isWindowAvailable &&
        sessionStorage.getItem(IS_SPLASH_OVER) !== "true" && (
          <>
            <div
              className="overlay-div
                absolute -z-10
                w-screen 
                h-screen min-h-[770px]
                bg-neutral-dark-gray-bg opacity-50"
            />
            <Image
              src={SplashGif}
              alt="time-lapse charcoal drawing"
              priority
              fill
              className="absolute -z-20"
            />
          </>
        )}
    </section>
  );
}

export default function HomePage() {
  const { state, dispatch } = useContext(CourseContext);
  const { route } = state;
  const router = useRouter();

  let debounceTimer: NodeJS.Timeout;

  const pathname = usePathname();

  const { ref: topRef, inView: topInView } = useInView({
    threshold: 1,
  });
  const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 1,
  });

  const onArrowUp = useCallback(() => {
    const prevIndex = ROUTES.indexOf(route) - 1;
    if (prevIndex >= 0) {
      dispatch({
        type: UPDATE_ROUTE,
        payload: ROUTES[prevIndex],
      });
      dispatch({
        type: SET_SHOWBOTH,
        payload: prevIndex !== 0,
      });
      dispatch({
        type: SET_ISLAST,
        payload: false,
      });
    }
  }, [route]);

  const onArrowDown = useCallback(() => {
    const nextIndex = ROUTES.indexOf(route) + 1;
    if (nextIndex <= ROUTES.length - 1) {
      dispatch({
        type: UPDATE_ROUTE,
        payload: ROUTES[nextIndex],
      });
      dispatch({
        type: SET_SHOWBOTH,
        payload: nextIndex < ROUTES.length - 1,
      });
      dispatch({
        type: SET_ISLAST,
        payload: nextIndex === ROUTES.length - 1,
      });
    }
  }, [route]);

  const scrollAction = useCallback(
    (e?: WheelEvent | null, key?: string) => {
      if (e && e.deltaY) {
        if (e.deltaY > 0 && bottomInView) {
          onArrowDown();
        } else if (e.deltaY < 0 && topInView) {
          onArrowUp();
        }
      } else if (key) {
        if (key === "ArrowDown" && bottomInView) {
          onArrowDown();
        }
        if (key === "ArrowUp" && topInView) {
          onArrowUp();
        }
      }
    },
    [topInView, bottomInView, onArrowDown, onArrowUp]
  );

  useEffect(() => {
    const debounceWheelScroll = (e: WheelEvent) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        scrollAction(e);
      }, 500);
    };

    if (pathname === routes.ROOT) {
      window.addEventListener("wheel", debounceWheelScroll);
    }
    // comment out the stuff above in case of scroll glitches

    const deboncedScrollEvent = (e: KeyboardEvent) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        scrollAction(null, e.key);
      }, 500);
    };
    window.addEventListener("keydown", deboncedScrollEvent);

    return () => {
      window.removeEventListener("keydown", deboncedScrollEvent);
      window.removeEventListener("wheel", debounceWheelScroll);
    };
  }, [scrollAction, onArrowDown, onArrowUp]);

  useEffect(() => {
    getCurrentUser((user) => {
      if (user) {
        router.push(routes.USER(user.displayName as string));
      }
    })
    /**
     * sessionStorage is for the current tab instance. Show splash screen only once
     * on first loading time and not during current tab reloads.
     * Splashscreen will be shown if the app is opened on another tab.
     */
    if (sessionStorage.getItem(IS_SPLASH_OVER) !== "true") {
      const splashScreenTimeout = setTimeout(() => {
        dispatch({
          type: SET_UNSET_SPLASH_SCREEN,
          payload: false,
        });
        sessionStorage.setItem(IS_SPLASH_OVER, "true");
      }, 2000);

      return () => {
        clearTimeout(splashScreenTimeout);
      };
    } else {
      dispatch({
        type: SET_UNSET_SPLASH_SCREEN,
        payload: false,
      });
    }

    return () => {
      dispatch({
        type: RESET_ROUTE,
      });
    };
  }, []);

  return (
    <div
      className="relative 
      flex flex-col 
      h-full lg:h-max
      max-md:mt-[6rem] md:max-lg:mt-[7rem]"
    >
      <span ref={topRef} className="observer-span-top absolute z-20" />
      <span className="lg:hidden relative z-[11]">
        <MenuContent />
      </span>
      {route === HERO ? <HeroMobileDevices /> : <MobileContent />}
      <AssembledContentLarge />
      <span
        ref={bottomRef}
        className="observer-span-bottom absolute bottom-0"
      />
    </div>
  );
}
