import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import HeaderLinks from './header-links';
import Arrows from './arrows';

type RightColumnImage = {
    src?: StaticImageData;
    showBoth: boolean;
    isLast: boolean;
    fit?: string
}

export default function RightColumn({
    src,
    showBoth,
    isLast,
    fit
}: RightColumnImage) {
  return (
    <div
        className='flex flex-col w-full h-full'
    >
        <HeaderLinks hideOnLarge={false} height={showBoth ? '1/6' : null} />
        <div
            className='relative w-full h-3/4 basis-auto'
        >
            {
                src &&
                <Image
                    src={src}
                    alt='back anatomy sketch'
                    layout='fill'
                    objectFit={fit || 'cover'}
                    loading='lazy'
                    placeholder='blur'
                />
            }
            <Arrows showBoth={showBoth} isLast={isLast} />
        </div>
    </div>
  )
}
