import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import RightColumn from '../utility-components/right-column';
import Typography from '../utility-components/typography';
import CTA from '../utility-components/cta';
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
    return (
        <div
            className='flex flex-col items-center justify-center gap-8 w-full h-full'
        >
            <Typography 
                additionalClasses='max-w-[80%]'
                isHeader={false} 
                size='text-2xl'
            >
                { WE_OFFER }
            </Typography>
            <DownArrowPlain/>
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
                className='w-full h-full'
            >
                <Slider imageFile='drawing-in-studio' total={4} />
            </div>
            <MiddleColumn/>
            <div
                className='w-full h-full bg-white'
            >
                <RightColumn 
                    showBoth={true} 
                    isLast={false} 
                    src={Skeletons}
                    fit='contain'
                />
            </div>
        </section>
    )
}

function CourseAdvertMobile() {
    return (
        <section
            className='relative flex flex-col lg:hidden h-full'
        >
            <Image 
                src={Skeletons}
                alt='skeletons'
                placeholder='blur'
                fill
                objectFit='cover'
            />
        </section>
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
