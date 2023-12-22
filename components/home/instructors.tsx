'use client'
import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
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
    tl?: gsap.core.Timeline;
}

function Card({
    cardItem,
    tl
}: CardProps) {
    const {
        image,
        name,
        experties,
        work
    } = cardItem;
    const [ flexDirection, setFlexDirection ] = useState('flex-row');
    const cardRef = useRef<HTMLDivElement | null>(null);

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
    }, []);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current, {
                opacity: 0,
                translateY: '10px'
            }, {
                opacity: 1,
                translateY: '0px',
                delay: 0.5
            })
        }
    }, [cardRef.current]);

    return (
        <div
            ref={cardRef}
            className={`flex ${flexDirection} gap-4 
            ${flexDirection==='flex-row' ? 'items-center' : 'items-start'} justify-center 
            w-max h-max
            opacity-0`}
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
                    additionalClasses={`max-w-[17.875rem]  
                    text-left
                    text-dirty-white`}
                >
                    {work}
                </Typography>
            </div>
        </div>
    )
}

type InstructorCardsProps = {
    tl?: gsap.core.Timeline
}

function InstructorCards({
    tl
}: InstructorCardsProps) {
    return (
        <motion.div
            className='flex flex-wrap gap-[2rem] md:gap-[5rem] max-lg:justify-start
            w-full 
            h-full lg:h-[18rem] 
            max-lg:px-12 lg:pr-[6.5rem]
            overflow-scroll'
            exit={{
                translateY: '-8px',
                opacity: 0,
                transition: {
                    duration: 0.3
                }
            }}
        >
            {
                INSTRUCTORS.map((instructor, i) => {
                    return (
                        <Card cardItem={instructor} tl={tl} key={i} />
                    )
                })
            }
        </motion.div>
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
    const containerRef = useRef<HTMLDivElement | null>(null);
    const headerDivRef = useRef<HTMLDivElement | null>(null);

    const tl = gsap.timeline();

    useEffect(() => {
        if (containerRef.current) {
            tl.set(containerRef.current, {
                width: '100%'
            })
        }
        if (headerDivRef.current) {
            gsap.fromTo(headerDivRef.current, {
                opacity: 0,
                translateY: '40px'
            }, {
                opacity: 1,
                translateY: '0px',
                duration: 0.3
            });
        }
    }, [containerRef.current, headerDivRef.current])

    return (
        <>
            <div
                ref={containerRef}
                className='relative z-10 top-0 left-0 
                flex flex-col gap-[5rem]
                w-full h-full
                pl-[6.5rem] 
                overflow-clip'
            >
                <motion.div
                    ref={headerDivRef}
                    className='flex items-center 
                    w-full 
                    min-h-[6rem] md:h-28 lg:h-[7rem]'
                    exit={{
                        translateY: '-14px',
                        opacity: 0,
                        transition: {
                            duration: 0.5
                        }
                    }}
                >
                    <Header/>
                </motion.div>
                <InstructorCards tl={tl}/>
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