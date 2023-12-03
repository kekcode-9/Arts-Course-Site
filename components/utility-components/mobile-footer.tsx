import React from 'react';
import Logo from './logo';
import Arrows from './arrows';

type MobileFooterProps = {
    onArrowUpClick?: () => void;
    onArrowDownClick?: () => void;
}

export default function MobileFooter({
    onArrowDownClick,
    onArrowUpClick
}: MobileFooterProps) {
  return (
    <div
        className='flex items-center justify-between
        w-full h-fit
        px-8 py-8 
        bg-neutral-dark-gray-bg'
    >
        <Logo/>
        <Arrows onArrowUp={onArrowUpClick} onArrowDown={onArrowDownClick} />
    </div>
  )
}
