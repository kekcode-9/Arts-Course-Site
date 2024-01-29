import React, { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import LeftArrow from '../utility-components/svg-utilities/left-arrow';
import Typography from '../utility-components/typography';
import constants from '@/utilities/constants/constants';
import routes from '@/utilities/constants/routes';

const { COURSES, ONLINE_INTERACTIVE_COURSES } = routes;

const {
    OR,
    APPLY_FOR,
    IN_PERSON_CLASSES,
    ONLINE_INTERACTIVE_CLASSES,
    SUBSCRIBE_TO_ONLINE_COURSES
} = constants;

type CourseTypeSelectionProps = {
    onInPersonOption: () => void;
    onOnlineInteractiveOption: () => void;
}

type OptionWrapperProps = {
    children: React.ReactNode;
}

function OptionWrapper({
    children
}: OptionWrapperProps) {
    const [showArrow, setShowArrow] = useState(false);
    const spanRef = useRef<HTMLSpanElement>(null);

    return (
        <span
            ref={spanRef}
            className='relative flex items-center'
            onMouseEnter={() => setShowArrow(true)}
            onMouseLeave={() => setShowArrow(false)}
        >
            {children}
            <AnimatePresence>
                {
                    showArrow && 
                    <LeftArrow 
                        setAbsolute={true} 
                        animate={true} 
                        translationOffset={spanRef.current?.offsetWidth as number}
                    />
                }
            </AnimatePresence>
        </span>
    )
}

export default function CourseTypeSelection({
    onInPersonOption,
    onOnlineInteractiveOption
}: CourseTypeSelectionProps) {
  return (
    <div
        className={`
            flex flex-col items-center justify-center gap-14
            h-screen
        `}
    >
        <Typography 
            isHeader={false} 
            size='text-2xl'
            animateEntrance={true}
        >
            {APPLY_FOR}
        </Typography>
        <div
            className={`options-wrapper
            flex flex-col items-center gap-6
            `}
        >
            <OptionWrapper>
                <Typography 
                    isHeader={false} 
                    additionalClasses='cursor-pointer'
                    animateEntrance={true}
                    animateDelay={0.2}
                    onClick={onInPersonOption} 
                >
                    <u>
                        {IN_PERSON_CLASSES}
                    </u>
                </Typography>
            </OptionWrapper>
            <OptionWrapper>
                <Typography 
                    isHeader={false} 
                    additionalClasses='cursor-pointer' 
                    animateEntrance={true}
                    animateDelay={0.3}
                    onClick={onOnlineInteractiveOption}
                >
                    <Link href={ONLINE_INTERACTIVE_COURSES}>
                        <u>
                            {ONLINE_INTERACTIVE_CLASSES}
                        </u>
                    </Link>
                </Typography>
            </OptionWrapper>
            <Typography 
                isHeader={false} 
                additionalClasses='text-center'
                animateEntrance={true}
                animateDelay={0.4}
            >
                {OR} <br/>
                <OptionWrapper>
                    <Link href={COURSES} className='cursor-pointer'>
                        {SUBSCRIBE_TO_ONLINE_COURSES}
                    </Link>
                </OptionWrapper>
            </Typography>
        </div>
    </div>
  )
}
