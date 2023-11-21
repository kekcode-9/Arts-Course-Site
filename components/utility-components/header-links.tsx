import React from 'react';
import Link from 'next/link';
import constants from '@/utilities/constants/constants';

const { LOG_IN, MENU } = constants;

export default function HeaderLinks() {
  return (
    <div
        className='relative grid grid-cols-4
        w-full lg:h-1/4 pt-[7.75rem]
        text-xl
        bg-burnt-orange'
    >
        <Link href={''}
            className='col-end-3 text-right'
        >
            { LOG_IN }
        </Link>
        <Link href={''}
            className='col-end-4 text-right'
        >
            { MENU }
        </Link>
    </div>
  )
}
