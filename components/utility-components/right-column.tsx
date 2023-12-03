'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import { CourseContext } from '@/utilities/store';
import HeaderLinks from './header-links';
import Arrows from './arrows';

type RightColumnImage = {
    src?: StaticImageData;
    fit?: string;
    onArrowUpClick?: () => void;
    onArrowDownClick?: () => void;
}

export default function RightColumn({
    src,
    fit,
    onArrowUpClick,
    onArrowDownClick
}: RightColumnImage) {
    const { state } = useContext(CourseContext);
    const { showBoth } = state;
  return (
    <div
        className='flex flex-col w-full h-full'
    >
        <HeaderLinks hideOnLarge={false} height={showBoth ? 'lg:h-1/6' : null} />
        <div
            className={`relative w-full ${showBoth ? 'h-full' : 'h-3/4'} basis-auto`}
        >
            {
                src &&
                <Image
                    src={src}
                    alt='back anatomy sketch'
                    fill
                    objectFit={fit || 'cover'}
                    loading='lazy'
                    placeholder='blur'
                />
            }
            <Arrows
                onArrowUp={onArrowUpClick}
                onArrowDown={onArrowDownClick}
            />
        </div>
    </div>
  )
}
