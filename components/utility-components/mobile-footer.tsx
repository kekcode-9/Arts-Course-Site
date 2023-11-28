import React from 'react';
import Logo from './logo';
import Arrows from './arrows';

type MobileFooterProps = {
    showBoth: boolean,
    isLast: boolean
}

export default function MobileFooter({
    showBoth,
    isLast
}: MobileFooterProps) {
  return (
    <div
        className='flex items-center justify-between
        w-full h-fit
        px-8 pt-8 
        bg-neutral-dark-gray-bg'
    >
        <Logo/>
        <Arrows showBoth={showBoth} isLast={isLast} />
    </div>
  )
}
