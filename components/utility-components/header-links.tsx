import React from 'react';
import Link from 'next/link';
import constants from '@/utilities/constants/constants';

const { LOG_IN, MENU } = constants;

export default function HeaderLinks() {
  return (
    <div
        className='flex max-lg:items-center max-lg:justify-between lg:grid lg:grid-cols-4
        w-full 
        min-h-[6rem] md:h-28 lg:h-1/4
        lg:pt-[7.75rem] max-lg:px-14 max-sm:px-8
        md:text-xl text-lg
        bg-burnt-orange'
    >
        <Link href={''}
            className='lg:col-end-3 lg:text-right'
        >
            { LOG_IN }
        </Link>
        <Link href={''}
            className='lg:col-end-4 lg:text-right'
        >
            { MENU }
        </Link>
    </div>
  )
}
