import React from 'react';
import DownArrowRect from './svg-utilities/down-arrow-rect';
import DownArrowTallRect from './svg-utilities/down-arrow-tall-rect';
import { type } from 'os';

type ArrowsProps = {
    showBoth: boolean,
    isLast: boolean
}

export default function Arrows({
    showBoth,
    isLast
}: ArrowsProps) {
  return (
    <div className='absolute bottom-[4.25rem] grid grid-cols-4
    w-full h-max'>
        <div className='flex flex-col items-end gap-6 col-end-4'>
            {showBoth ?
            <>
                <DownArrowRect up={true} />
                <DownArrowRect up={false} />
            </> : <DownArrowTallRect up={isLast} />
            }
        </div>
    </div>
  )
}
