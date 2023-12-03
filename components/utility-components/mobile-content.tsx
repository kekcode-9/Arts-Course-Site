import React from 'react';
import MobileFooter from './mobile-footer';

type MobildeContentProps = {
  children: React.ReactNode;
  onArrowUpClick?: () => void;
  onArrowDownClick?: () => void;
}

export default function MobileContent({
  children,
  onArrowUpClick,
  onArrowDownClick
}: MobildeContentProps) {
  return (
    <section
      className='relative flex flex-col items-center lg:hidden 
      h-full max-md:max-h-[calc(100vh-6rem)] md:max-lg:max-h-[calc(100vh-6rem)]'
    >
      {children}
      <MobileFooter 
        onArrowUpClick={onArrowUpClick} 
        onArrowDownClick={onArrowDownClick}
      />
    </section>
  )
}
