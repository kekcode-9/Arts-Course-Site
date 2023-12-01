import React from 'react';
import Typography from './typography';
import constants from '@/utilities/constants/constants';

const { LOGO } = constants;
const mobileLogoArr = LOGO.split(' ');

type LogoProps = {
    position?: string;
    bottom?: string;
    customInset?: string;
}

export default function Logo({
    position,
    bottom,
    customInset
}: LogoProps) {
  return (
    <>
        <div className='flex flex-col items-start w-[5rem] lg:hidden'>
            {
                mobileLogoArr.map((word) => {
                    return (
                        <Typography isHeader={false} size={'1rem'} key={word}>
                            {word}
                        </Typography>
                    )
                })
            }
        </div>
        <div 
            className={`${position || 'absolute'} z-10 hidden lg:block
            ${customInset || `top-0 right-0 ${bottom || 'bottom-12'} left-0`}  
            w-fit h-fit
            m-auto`}
        >
            <Typography isHeader={false} additionalClasses='underline'>
                {LOGO}
            </Typography>
        </div>
    </>
  )
}
