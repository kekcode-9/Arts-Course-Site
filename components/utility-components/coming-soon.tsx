'use client'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LanternChildren from '@/public/john-singer-sargent-lantern-children.jpg';
import Typography from './typography';

export default function ComingSoon() {
    const router = useRouter();

  return (
    <div
        className='
        relative
        flex items-center justify-center
        w-screen h-screen'
    >
        <Image
            src={LanternChildren}
            alt='Glasgow Saturday Night by John Atkinson Grimshaw'
            fill
            priority
            className='object-cover'
        />
        <div
            className='absolute
            flex flex-col gap-4 items-center justify-center
            w-screen h-screen 
            p-8
            bg-black bg-opacity-50 backdrop-blur-sm'
        >
            <Typography isHeader={true} additionalClasses='text-center'>
                This page is coming soon
            </Typography>
            <span
                className='cursor-pointer'
                onClick={() => router.back()}
            >
                <Typography isHeader={false} additionalClasses='text-center cursor-pointer'>
                    <u>Go back</u>
                </Typography>
            </span>
        </div>
    </div>
  )
}
