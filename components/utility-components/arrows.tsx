import React from 'react';
import DownArrowRect from './svg-utilities/down-arrow-rect';
import DownArrowTallRect from './svg-utilities/down-arrow-tall-rect';
import DownArrowCircular from './svg-utilities/down-arrow-circular';
import UpArrowcircular from './svg-utilities/up-arrow-circular';

type ArrowsProps = {
    showBoth: boolean,
    isLast: boolean
}

export default function Arrows({
    showBoth,
    isLast
}: ArrowsProps) {
  return (
    <div 
        className='lg:absolute lg:bottom-[4.25rem] lg:grid lg:grid-cols-4
        w-max lg:w-full lg:h-max'
    >
        <div className='hidden lg:flex lg:flex-col items-end gap-6 col-end-4'>
            {showBoth ?
            <>
                <DownArrowRect up={true} />
                <DownArrowRect up={false} />
            </> : <DownArrowTallRect up={isLast} />
            }
        </div>
        <div className='lg:hidden'>
            {
                showBoth ?
                <div
                    className='flex flex-col items-center'
                >
                    <UpArrowcircular/>
                    <DownArrowCircular/>
                </div> : <DownArrowCircular/>
            }
        </div>
    </div>
  )
}
