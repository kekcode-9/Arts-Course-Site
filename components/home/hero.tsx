import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import CTA from '../utility-components/cta';
import Arrows from '../utility-components/arrows';
import Typography from '../utility-components/typography';
import constants from '@/utilities/constants/constants';
import FruitBasket from '@/public/fruit-basket.webp';
import BackAnatomy from '@/public/back-anatomy.webp';
import ValuesOfHead from '@/public/values-of-head.webp';

const { 
    OR, 
    NAME_HEADER, 
    HERO_OBJECTIVE, 
    LABEL_FOR_CLASSES, 
    ARE_YOU_INSTRUCTOR,
    APPLY_NOW 
} = constants;

export function ApplySection () {
    const spanRefs = [
        useRef<HTMLSpanElement | null>(null),
        useRef<HTMLSpanElement | null>(null),
        useRef<HTMLSpanElement | null>(null)
    ]

    useEffect(() => {
        const tl = gsap.timeline();
        spanRefs.forEach((ref) => {
            if (ref.current) {
                tl.fromTo(ref.current, {
                    translateY: '20px',
                    opacity: 0
                }, {
                    translateY: '0px',
                    opacity: 1,
                    duration: 0.3
                }, "<+0.07")
            }
        })
    }, [])

    return (
        <div
            className='flex flex-col items-center gap-6 
            w-[16.5rem]'
        >
            <span ref={spanRefs[0]}>
                <Typography isHeader={false}>
                    { LABEL_FOR_CLASSES }
                </Typography>
            </span>
            <span ref={spanRefs[1]}>
                <Link href='/student-application'>
                    <CTA label={ APPLY_NOW } primary={true} />
                </Link>
            </span>
            <span ref={spanRefs[2]}>
                <Typography isHeader={false}>
                    { OR } <br/> 
                    <Link href='/instructor-application'>
                        <span className='underline'> { ARE_YOU_INSTRUCTOR } </span> ?
                    </Link>
                </Typography>
            </span>
        </div>
    )
}

export function HeaderSection () {
    return (
        <Typography isHeader={true}>
            { NAME_HEADER }
        </Typography>
    )
}

export function ObjectiveSection () {
    return (
        <Typography
            additionalClasses='lg:w-full xl:w-1/2 lg:text-left text-center font-extralight px-[3rem] xl:px-[0rem]'
            isHeader={false}
            animateEntrance={true}
        >
            { HERO_OBJECTIVE }
        </Typography>
    )
}

function MobileHeroImage () {
    return (
        <>
            <Image
                src={ValuesOfHead}
                alt='anatomy of the back'
                layout='fill'
                objectFit='cover'
                quality={100}
                loading='lazy'
                placeholder='blur'
                className='relative -z-10'
            />
        </>
    )
}

export function HeroLargeLeftColImage () {
    const MotionImage = motion(Image);
    return (
        <MotionImage 
            src={FruitBasket}
            alt='fruit basket still life drawing'
            fill
            objectFit='cover'
            loading='lazy'
            placeholder='blur'
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 2
                }
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.5
                }
            }}
        />
    )
}

export function HeroLargeMiddleCol () {
    return (
        <>
            <div
                className='flex items-center justify-center 
                w-full 
                h-1/2'
            >
                <HeaderSection/>
            </div>
            <div
                className='flex items-center justify-center
                w-full h-1/2 
                bg-burnt-orange'
            >
                <ApplySection/>
            </div>
        </>
    )
}

export function HeroLargeRightImage() {
    const MotionImage = motion(Image);

    return (
        <MotionImage
            src={BackAnatomy}
            alt='back anatomy sketch'
            fill
            objectFit='cover'
            loading='lazy'
            placeholder='blur'
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1,
                transition: {
                    duration: 2
                }
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 2
                }
            }}
        />
    )
}

export function HeroMobileDevices () {
    return (
        <section className='hero-mobile flex flex-col lg:hidden h-full'>
            <div className='relative flex flex-grow items-center'> {/** if it can be 50% then i want it to be 50% but it at least has to fit the height max content height. then whichever of the two is larger can be chosen */}
                <MobileHeroImage/>
                <div className='flex flex-col gap-6 items-center my-8'>
                    <HeaderSection/>
                    <ObjectiveSection/>
                </div>
            </div>
            <div className='flex flex-col flex-grow items-center justify-between'>
                <div className='flex justify-center w-full my-8'>
                    <ApplySection/>
                </div>
                <Arrows/>
            </div>
        </section>
    )
}
