import React from 'react';
import Typography from '../utility-components/typography';
import constants from '@/utilities/constants/constants';
import Link from 'next/link';

const {
    OR,
    APPLY_FOR,
    IN_PERSON_CLASSES,
    ONLINE_INTERACTIVE_CLASSES,
    SUBSCRIBE_TO_ONLINE_COURSES
} = constants;

export default function CourseTypeSelection() {
  return (
    <div
        className={`
        flex flex-col items-center gap-14
        `}
    >
        <Typography isHeader={false} size='text-2xl'>
            {APPLY_FOR}
        </Typography>
        <div
            className={`options-wrapper
            flex flex-col items-center gap-6
            `}
        >
            <Typography isHeader={false} additionalClasses='cursor-pointer' >
                <u>
                    {IN_PERSON_CLASSES}
                </u>
            </Typography>
            <Typography isHeader={false} additionalClasses='cursor-pointer' >
                <u>
                    {ONLINE_INTERACTIVE_CLASSES}
                </u>
            </Typography>
            <Typography isHeader={false} additionalClasses='text-center'>
                {OR} <br/>
                <Link href='/subscription-plans' className='cursor-pointer'>
                    {SUBSCRIBE_TO_ONLINE_COURSES}
                </Link>
            </Typography>
        </div>
    </div>
  )
}
