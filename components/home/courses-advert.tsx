'use client'
import React, { useEffect, useState, useContext } from 'react';
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
import { CourseContext, HOME_ROUTES } from '@/utilities/store';
import { ACTIONS } from '@/utilities/constants/actions';

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

const {
    UPDATE_ROUTE,
    SET_SHOWBOTH,
    SET_ISLAST
  } = ACTIONS;

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
    const { dispatch } = useContext(CourseContext);
    return (
        <section
            className='hidden lg:flex w-full h-screen'
        >
            <div
                className='relative w-full h-screen'
            >
                <Slider imageFile='drawing-in-studio' total={4} />
                <Logo/>
            </div>
            <MiddleColumn/>
            <div
                className='w-full h-full bg-white'
            >
                <RightColumn 
                    src={Skeletons}
                    fit='none'
                    onArrowUpClick={() => {
                        dispatch({
                            type: UPDATE_ROUTE,
                            payload: HOME_ROUTES.HERO
                        })
                    }}
                    onArrowDownClick={() => {
                        dispatch({
                            type: UPDATE_ROUTE,
                            payload: HOME_ROUTES.RESOURCES_ADVERT
                        })
                    }}
                />
            </div>
        </section>
    )
}

function CourseAdvertMobile() {
    const { dispatch } = useContext(CourseContext);
    return (
        <MobileContent
            onArrowUpClick={() => {
                dispatch({
                    type: UPDATE_ROUTE,
                    payload: HOME_ROUTES.HERO
                })
            }}
            onArrowDownClick={() => {
                dispatch({
                    type: UPDATE_ROUTE,
                    payload: HOME_ROUTES.RESOURCES_ADVERT
                })
            }}
        >
            <div className='relative flex items-center flex-grow 
            w-full h-fit
            overflow-scroll'>
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
  const { dispatch } = useContext(CourseContext);

  useEffect(() => {
    dispatch({
      type: SET_SHOWBOTH,
      payload: true
    });
    dispatch({
      type: SET_ISLAST,
      payload: false
    });
  }, [])

  return (
    <>
        <CoursesAdvertLargeScreen/>
        <CourseAdvertMobile/>
    </>
  )
}
