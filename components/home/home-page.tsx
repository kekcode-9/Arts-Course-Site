'use client'
import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useInView } from "react-intersection-observer";
import Image from 'next/image';
import { HeroMobileDevices } from './hero';
import LeftColumn from '../utility-components/left-column';
import RightColumn from '../utility-components/right-column';
import MiddleColumn from '../utility-components/middle-column';
import MobileContent from '../utility-components/mobile-content';
import { 
    CourseContextProvider, 
    CourseContext, 
    HOME_ROUTES
} from '@/utilities/store';
import { ACTIONS } from '@/utilities/constants/actions';
import SplashGif from '@/public/splash.gif';

const { HERO } = HOME_ROUTES;

const { SET_UNSET_SPLASH_SCREEN, UPDATE_ROUTE, SET_SHOWBOTH, SET_ISLAST } = ACTIONS;

const ROUTES = Object.values(HOME_ROUTES);

function AssembledContentLarge() {
    const { state } = useContext(CourseContext);
    const { isSplashScreen } = state;
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
            <LeftColumn/>
            <MiddleColumn/>
            <RightColumn/>
            {
                isSplashScreen &&
                <>
                    <div
                        className='overlay-div
                        absolute -z-10
                        w-screen 
                        h-screen min-h-[770px]
                        bg-neutral-dark-gray-bg opacity-50'
                    />
                    <Image
                        src={SplashGif}
                        alt='time-lapse charcoal drawing'
                        priority
                        fill
                        className="absolute -z-20"
                    />
                </>
            }
        </section>
    )
}

function Main () {
    const [y, setY] = useState<number | null>();
    const { state, dispatch } = useContext(CourseContext);
    const { route, showBoth, lastRoute } = state;

    const { ref: topRef, inView: topInView } = useInView({
        threshold: 1
      });
    const { ref: bottomRef, inView: bottomInView } = useInView({
    threshold: 1
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
      
    const onArrowDown = () => {
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
    }

    const scrollAction = useCallback((scrollY?: number | null, key?: string) => {
        if (y && scrollY) {
          if (topInView && y > scrollY) {
            onArrowUp();
          }
          if (bottomInView && y < scrollY) {
            onArrowDown();
          }
        } else if (key) {
          if (key === 'ArrowDown' && bottomInView) {
            onArrowDown();
          } 
          if (key === 'ArrowUp' && topInView) {
            onArrowUp();
          }
        }
    }, [topInView, bottomInView, onArrowDown, onArrowUp])

    useEffect(() => {
        setY(window.scrollY);
        const scrollEvent = (e: KeyboardEvent) => {
          setY(window.scrollY);
          scrollAction(null, e.key);
        }
        window.addEventListener('keydown', scrollEvent);
        return () => {
            window.removeEventListener('keydown', scrollEvent);
        }
    }, [scrollAction])

    useEffect(() => {
        const splashScreenTimeout = setTimeout(() => {
            // dispatch({
            //     type: SET_UNSET_SPLASH_SCREEN,
            //     payload: false
            // })
        }, 2000);

        return () => {
            clearTimeout(splashScreenTimeout);
        }
    }, []);

    return (
        <>
            <span ref={topRef} className="observer-span-top absolute z-20" />
            {
                route === HERO ? <HeroMobileDevices/> : <MobileContent/>
            }
            <AssembledContentLarge/>
            <span ref={bottomRef} className="observer-span-bottom absolute bottom-0" />
        </>
    )
}

export default function HomePage() {
  return (
    <CourseContextProvider>
        <Main/>
    </CourseContextProvider>
  )
}
