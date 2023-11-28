'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import RightColumn from '../utility-components/right-column';
import Typography from '../utility-components/typography';
import CTA from '../utility-components/cta';
import MobileContent from '../utility-components/mobile-content';
import Logo from '../utility-components/logo';
import constants from '@/utilities/constants/constants';
import DownArrowPlain from '../utility-components/svg-utilities/down-arrow-plain';
import Skeletons from '@/public/skeletons.png';

const Slider = dynamic(() => import('../../components/utility-components/slider'), {
    loading: () => <p>Loading...</p>,
});

const { 
    PLUS, 
    WE_OFFER, 
    IN_PERSON_COURSES, 
    INTERACTIVE_ONLINE,
    EXPLORE_ALL_COURSES
} = constants;

function MiddleColumn() {
    const [ showArrow, setShowArrow ] = useState(true);
    useEffect(() => {
        const setArrowVisibility = () => {
            if (screen.height < 892) {
                setShowArrow(false);
            } else {
                setShowArrow(true);
            }
        }
        if (window) {
            window.addEventListener('resize', setArrowVisibility);
        }
        return () => {
            if (window) {
                window.removeEventListener('resize', setArrowVisibility);
            }
        }
    }, [])
    return (
        <div
            className='relative z-10 
            flex flex-col items-center justify-center gap-6 lg:gap-8 
            w-full h-full max-lg:py-8'
        >
            <Typography 
                additionalClasses='max-w-[80%]'
                isHeader={false} 
                size='text-2xl'
            >
                { WE_OFFER }
            </Typography>
            {
                showArrow && <DownArrowPlain/>
            }
            <div
                className='flex flex-col gap-2 lg:gap-6 items-center'
            >
                <Typography 
                    isHeader={false} 
                    additionalClasses='max-w-[80%]'
                >
                    { IN_PERSON_COURSES }
                </Typography>
                <Typography 
                    isHeader={false}
                    additionalClasses='max-w-[80%]' 
                >
                    { PLUS }
                </Typography>
                <Typography 
                    isHeader={false}
                    additionalClasses='max-w-[80%]' 
                >
                    { INTERACTIVE_ONLINE }
                </Typography>
            </div>
            <CTA label={ EXPLORE_ALL_COURSES } primary={false} />
        </div>
    )
}

function CoursesAdvertLargeScreen() {
    return (
        <section
            className='course-advert-large hidden lg:flex w-full h-screen'
        >
            <div
                className='relative w-full h-full'
            >
                <Slider imageFile='drawing-in-studio' total={4} />
                <Logo/>
            </div>
            <MiddleColumn/>
            <div
                className='w-full h-full bg-white'
            >
                <RightColumn 
                    showBoth={true} 
                    isLast={false} 
                    src={Skeletons}
                    fit='none'
                />
            </div>
        </section>
    )
}

function CourseAdvertMobile() {
    return (
        <MobileContent>
            <div className='relative flex items-center flex-grow w-full h-fit'>
                <Image 
                    src={Skeletons}
                    alt='skeletons'
                    placeholder='blur'
                    fill
                    objectFit='cover'
                    className='relative -z-10'
                />
                <div 
                    className='absolute -z-9 top-0 
                    w-full h-full 
                    bg-neutral-dark-gray-bg opacity-70'
                />
                <div
                    className='w-full max-h-[calc(100vh-21rem)] overflow-scroll'
                >
                    <MiddleColumn/>
                </div>
            </div>
        </MobileContent>
    )
}

export default function CoursesAdvert() {
  return (
    <>
        <CoursesAdvertLargeScreen/>
        <CourseAdvertMobile/>
    </>
  )
}
