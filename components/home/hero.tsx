import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
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
    return (
        <div
            className='flex flex-col items-center gap-6 
            w-[16.5rem]'
        >
            <Typography isHeader={false}>
                { LABEL_FOR_CLASSES }
            </Typography>
            <CTA label={ APPLY_NOW } primary={true} />
            <Typography isHeader={false}>
                { OR } <br/> <span className='underline'> { ARE_YOU_INSTRUCTOR } </span> ?
            </Typography>
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
            additionalClasses='lg:w-full xl:w-1/2 lg:text-left text-center font-extralight px-[3rem] xl:px[0rem]'
            isHeader={false}
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
    return (
        <Image 
            src={FruitBasket}
            alt='fruit basket still life drawing'
            layout='fill'
            objectFit='cover'
            loading='lazy'
            placeholder='blur'
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
    return (
        <Image
            src={BackAnatomy}
            alt='back anatomy sketch'
            fill
            objectFit='cover'
            loading='lazy'
            placeholder='blur'
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
