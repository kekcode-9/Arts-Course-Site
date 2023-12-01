import React from 'react';
import Link from 'next/link';
import constants from '@/utilities/constants/constants';

const { LOG_IN, MENU } = constants;

type HeaderLinksProps = {
    hideOnLarge: boolean,
    height?: string | null
}

export default function HeaderLinks({
    hideOnLarge,
    height
}: HeaderLinksProps) {
  return (
    <div
        className={`${hideOnLarge && 'lg:hidden'}
        max-lg:fixed max-lg:z-[100] flex max-lg:items-center max-lg:justify-between 
        lg:grid lg:grid-cols-4
        w-full 
        min-h-[6rem] md:h-28 ${height || 'lg:h-1/4'}
        ${height ? 'items-center' : 'lg:pt-[7.75rem]'} max-lg:px-14 max-sm:px-8
        md:text-xl text-lg
        bg-burnt-orange`}
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
