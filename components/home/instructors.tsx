'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
            className={`flex ${flexDirection} gap-4 
            ${flexDirection==='flex-row' ? 'items-center' : 'items-start'} justify-center 
            w-max h-max`}
        >
            <div
                className='relative flex items-start
                w-[4.5rem] md:w-[6.5rem] 
                h-[4.5rem] md:h-[6.5rem] 
                border-4 border-double border-[#C5C5C5]
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
                className={`flex flex-col gap-2 items-start`}
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
                    additionalClasses={`w-[17.875rem]  
                    text-left
                    text-dirty-white`}
                >
                    {work}
                </Typography>
            </div>
        </div>
    )
}

function InstructorCards() {
    return (
        <div
            className='flex flex-wrap gap-[2rem] md:gap-[5rem] max-lg:justify-start
            w-full 
            h-full lg:h-[18rem] 
            max-lg:px-12 lg:pr-[6.5rem]
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
    )
}

function Header() {
    return (
        <Typography additionalClasses='text-left font-normal md:font-bold' size='text-2xl md:text-[2rem]' isHeader={false}>
            {MEET_INSTRUCTORS}
        </Typography>
    )
}

export function InstructorLargeLeft() {
    return (
        <>
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
                    <Header/>
                </div>
                <InstructorCards/>
                <CTA label={SEE_ALL_INSTRUCTORS} primary={false} />
            </div>
            <Logo customInset='left-[6.5rem] bottom-12' />
        </>
    )
}

export function InstructorMobileDevices() {
    return (
        <div
            className='flex flex-col items-center justify-center gap-8
            w-full h-full overflow-scroll
            my-12'
        >
            <div
                className='flex flex-col md:flex-row items-start md:items-center justify-between 
                w-full
                px-12'
            >
                <Header/>
                <Typography isHeader={false} additionalClasses='underline'>
                    {SEE_ALL_INSTRUCTORS}
                </Typography>
            </div>
            <InstructorCards/>
        </div>
    )
}