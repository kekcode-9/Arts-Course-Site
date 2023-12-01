'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import RightColumn from '../utility-components/right-column';
import Typography from '../utility-components/typography';
import CTA from '../utility-components/cta';
import Logo from '../utility-components/logo';
import constants from '@/utilities/constants/constants';

const { 
    MEET_INSTRUCTORS, 
    SEE_ALL_INSTRUCTORS, 
    INSTRUCTORS 
} = constants;

type CardProps = {
    cardItem: (typeof INSTRUCTORS)[number];
}

function Card({
    cardItem
}: CardProps) {
    const {
        image,
        name,
        experties,
        work
    } = cardItem;
    const [ flexDirection, setFlexDirection ] = useState('flex-row');
    useEffect(() => {
        const changeFlexDirection = () => {
            if (screen.width <= 1100) {
                setFlexDirection('flex-col');
            } else {
                setFlexDirection('flex-row')
            }
        }
        changeFlexDirection();
        if(window) {
            window.addEventListener('resize', changeFlexDirection);
        }
        return () => {
            window && window.removeEventListener('resize', changeFlexDirection);
        }
    }, [])
    return (
        <div
            className={`flex ${flexDirection} gap-4 items-center justify-center w-max h-max`}
        >
            <div
                className='relative flex items-start
                w-[6.5rem] h-[6.5rem] border-4 border-double border-[#C5C5C5]
                rounded-full 
                overflow-clip'
            >
                <Image
                    src={image}
                    alt={name}
                    fill
                    objectFit='cover'
                    loading='lazy'
                />
            </div>
            <div
                className='flex flex-col gap-2 items-start'
            >
                <div
                    className='flex gap-1 items-center'
                >
                    <Typography isHeader={false}>
                        {name},
                    </Typography>
                    <Typography isHeader={false} size='text-base font-light' additionalClasses='underline'>
                        {experties}
                    </Typography>
                </div>
                <Typography 
                    isHeader={false} 
                    size='text-base font-light' 
                    additionalClasses='w-[17.875rem] text-left text-dirty-white'
                >
                    {work}
                </Typography>
            </div>
        </div>
    )
}
function InstructorsLargeScreen() {
    return (
        <section
            className='relative hidden lg:flex
            w-full h-screen'
        >
            <div
                className='absolute z-10 right-0
                flex items-center justify-end 
                w-[33.33%] h-screen'
            >
                <RightColumn showBoth={true} isLast={false} />
            </div>
            <div
                className='relative z-10 top-0 left-0 
                flex flex-col gap-[5rem]
                w-full h-full
                pl-[6.5rem] 
                overflow-clip'
            >
                <div
                    className='flex items-center 
                    w-full 
                    min-h-[6rem] md:h-28 lg:h-[7rem]'
                >
                    <Typography additionalClasses='text-left font-bold' size='text-[2rem]' isHeader={false}>
                        {MEET_INSTRUCTORS}
                    </Typography>
                </div>
                <div
                    className='flex flex-wrap gap-x-[5rem] gap-y-[5rem]
                    w-full h-[18rem] 
                    pr-[6.5rem]
                    overflow-scroll'
                >
                    {
                        INSTRUCTORS.map((instructor, i) => {
                            return (
                                <Card cardItem={instructor} key={i} />
                            )
                        })
                    }
                </div>
                <CTA label={SEE_ALL_INSTRUCTORS} primary={false} />
            </div>
            <Logo customInset='left-[6.5rem] bottom-12' />
        </section>
    )
}

function InstructorMobileDevices() {
    return (
        <section
            className='flex max-lg:hidden'
        ></section>
    )
}

export default function Instructors() {
  return (
    <>
        <InstructorsLargeScreen/>
        <InstructorMobileDevices/>
    </>
  )
}
