'use client'
import React, { useContext } from 'react';
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

const { HERO } = HOME_ROUTES

function AssembledContentLarge() {
    /**
     * left top --> left bottom --> middle top --> middle bottom --> right top --> right bottom
     * left top --> middle bottom --> right top --> middle top --> left bottom --> right bottom
     * 0            0                 0             0.5            1               1.5
     */
    return (
        <section
            className='relative
            hidden lg:flex
            w-full h-screen
            overflow-clip'
        >
            <LeftColumn/>
            <MiddleColumn/>
            <RightColumn/>
        </section>
    )
}

function Main () {
    const { state } = useContext(CourseContext);
    const { route } = state;
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
