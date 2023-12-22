'use client'
import React, { useContext, useEffect, useState } from 'react';
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

const { SET_UNSET_SPLASH_SCREEN } = ACTIONS;

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
                        h-screen min-height-[770px]
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
    const { state, dispatch } = useContext(CourseContext);
    const { route } = state;
    useEffect(() => {
        const splashScreenTimeout = setTimeout(() => {
            dispatch({
                type: SET_UNSET_SPLASH_SCREEN,
                payload: false
            })
        }, 2000);

        return () => {
            clearTimeout(splashScreenTimeout);
        }
    }, []);

    return (
        <>
            {
                route === HERO ? <HeroMobileDevices/> : <MobileContent/>
            }
            <AssembledContentLarge/>
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
