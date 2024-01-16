import React from 'react';
import { HeaderLogo } from '../logo';
import CommonHeaderSkeleton from './common-header-skeleton';
import CTA from '../cta';
import SearchBar from '../search-bar';
import Menu from '../menu-utility/menu';
import constants from '@/utilities/constants/constants';
import Typography from '../typography';
import routes from '@/utilities/constants/routes';
import Link from 'next/link';

const { LOGIN_SIGNUP } = routes;

const { LOG_IN, APPLY_NOW } = constants;

function LeftSection () {
    return (
        <>
            <HeaderLogo/>
            <span
                className='cta-span max-lg:hidden'
            >
                <CTA label={APPLY_NOW} primary={true} />
            </span>
            <span
                className='searchbar-span max-sm:hidden'
            >
                <SearchBar/>
            </span>
        </>
    )
}

function RightSection () {
    return (
        <>
            <Link
                href={LOGIN_SIGNUP}
            >
                <Typography 
                    isHeader={false}
                    additionalClasses='whitespace-nowrap font-sans cursor-pointer'
                >
                    {LOG_IN}
                </Typography>
            </Link>
            <Menu/>
        </>
    )
}

export default function CommonHeaderGeneral() {
    return (
        <CommonHeaderSkeleton
            isProtected={false}
            leftSection={<LeftSection/>}
            rightSection={<RightSection/>}
        />
    )
}
