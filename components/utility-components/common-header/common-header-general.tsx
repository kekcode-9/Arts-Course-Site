import React from 'react';
import { HeaderLogo } from '../logo';
import CommonHeaderSkeleton from './common-header-skeleton';
import CTA from '../cta';
import SearchBar from '../search-bar';
import Menu from '../menu-utility/menu';
import constants from '@/utilities/constants/constants';
import Typography from '../typography';

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
            <Typography 
                isHeader={false}
                additionalClasses='whitespace-nowrap font-sans'
            >
                {LOG_IN}
            </Typography>
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
