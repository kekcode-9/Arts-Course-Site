'use client'
import React, { useContext } from 'react';
import DownArrowRect from './svg-utilities/down-arrow-rect';
import DownArrowTallRect from './svg-utilities/down-arrow-tall-rect';
import DownArrowCircular from './svg-utilities/down-arrow-circular';
import UpArrowcircular from './svg-utilities/up-arrow-circular';
import { CourseContext } from '@/utilities/store';

type ArrowsProps = {
    onArrowUp?: () => void;
    onArrowDown?: () => void;
}

export default function Arrows({
    onArrowUp,
    onArrowDown
}: ArrowsProps) {
    const { state } = useContext(CourseContext);
    const { showBoth, isLast } = state;
  return (
    <div 
        className='lg:absolute lg:bottom-[4.25rem] lg:grid lg:grid-cols-4
        w-max lg:w-full lg:h-max'
    >
        <div className='hidden lg:flex lg:flex-col items-end gap-6 col-end-4'>
            {showBoth ?
            <>
                <DownArrowRect up={true} onClick={onArrowUp} />
                <DownArrowRect up={false} onClick={onArrowDown} />
            </> : <DownArrowTallRect up={isLast} onClick={isLast ? onArrowUp : onArrowDown} />
            }
        </div>
        <div className='lg:hidden'>
            {
                showBoth ?
                <div
                    className='flex flex-col items-center'
                >
                    <UpArrowcircular onClick={onArrowUp} />
                    <DownArrowCircular onClick={onArrowDown} />
                </div> : <DownArrowCircular onClick={isLast ? onArrowUp : onArrowDown}/>
            }
        </div>
    </div>
  )
}
