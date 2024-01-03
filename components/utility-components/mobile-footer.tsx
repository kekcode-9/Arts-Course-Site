import React from 'react';
import Logo from './logo';
import Arrows from './arrows';

export default function MobileFooter() {
  return (
    <div
        className='flex items-center justify-between
        w-full h-fit
        px-8 py-8 
        bg-neutral-dark-gray-bg'
    >
        <Logo/>
        <Arrows/>
    </div>
  )
}
