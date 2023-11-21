import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import PrimaryButton from './utility-components/primary-button';
import HeaderLinks from './utility-components/header-links';
import Arrows from './utility-components/arrows';
import Typography from './utility-components/typography';
import constants from '@/utilities/constants/constants';

const { 
    OR, 
    NAME_HEADER, 
    HERO_OBJECTIVE, 
    LABEL_FOR_CLASSES, 
    ARE_YOU_INSTRUCTOR 
} = constants;

function ApplySection () {
    return (
        <div
            className='flex flex-col items-center gap-6 
            w-[16.5rem]'
        >
            <Typography isHeader={false}>
                { LABEL_FOR_CLASSES }
            </Typography>
            <PrimaryButton label='Apply now'/>
            <Typography isHeader={false}>
                { OR } <br/> <span className='underline'> { ARE_YOU_INSTRUCTOR } </span> ?
            </Typography>
        </div>
    )
}

function HeaderSection () {
    return (
        <Typography isHeader={true}>
            { NAME_HEADER }
        </Typography>
    )
}

function ObjectiveSection () {
    return (
        <Typography
            additionalClasses='text-left font-extralight w-full px-[3rem] xl:px[0rem] xl:w-1/2 '
            isHeader={false}
        >
            { HERO_OBJECTIVE }
        </Typography>
    )
}

function MobileHeroImage () {
    return (
        <div className='relative -z-10'>
            <Image
                src={'/back-anatomy.png'}
                alt='anatomy of the back'
                layout='fill'
            />
        </div>
    )
}

function HeroLargeScreens () {
    return (
        <section
            className='hidden lg:flex h-full text-white'
        >
            <div
                className='w-full h-full'
            >
                <div
                    className='flex justify-center
                    w-full 
                    h-1/2
                    lg:pt-[7.75rem]
                    bg-burnt-orange'
                >
                    <ObjectiveSection/>
                </div>
                <div
                    className='relative w-full h-1/2'
                >
                    <Image 
                        src='/fruit-basket.png' 
                        alt='fruit basket still life drawing'
                        layout='fill'
                        objectFit='cover'
                    />
                </div>
            </div>
            <div
                className='w-full h-full'
            >
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
            </div>
            <div
                className='flex flex-col w-full h-full'
            >
                <HeaderLinks/>
                <div
                    className='relative w-full h-3/4 basis-auto'
                >
                    <Image
                        src='/back-anatomy.png'
                        alt='back anatomy sketch'
                        layout='fill'
                        objectFit='cover'
                    />
                    <Arrows showBoth={false} isLast={false} />
                </div>
            </div>
        </section>
    )
}

function HeroMobileDevices () {
    return (
        <section className='flex flex-col lg:hidden'>
            <HeaderLinks/>
            <div>
                <MobileHeroImage/>
                <div className='flex flex-col'>
                    <HeaderSection/>
                    <ObjectiveSection/>
                </div>
            </div>
            <div>
                <ApplySection/>
            </div>
        </section>
    )
}

export default function Hero() {
  return (
    <>
        <HeroLargeScreens/>
        <HeroMobileDevices/>
    </>
  )
}
