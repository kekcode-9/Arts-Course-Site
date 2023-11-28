import React from 'react';
import Typography from './typography';
import constants from '@/utilities/constants/constants';

const { LOGO } = constants;
const mobileLogoArr = LOGO.split(' ');

export default function Logo() {
  return (
    <>
        <div className='flex flex-col items-start w-[5rem] lg:hidden'>
            {
                mobileLogoArr.map((word) => {
                    return (
                        <Typography isHeader={false} size={'1rem'}>
                            {word}
                        </Typography>
                    )
                })
            }
        </div>
        <div className='logoClass absolute to-0 right-0 bottom-12 left-0 m-auto hidden lg:block'>
            <Typography isHeader={false} additionalClasses='underline'>
                {LOGO}
            </Typography>
        </div>
    </>
  )
}
