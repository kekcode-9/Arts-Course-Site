import React from 'react';
import MobileFooter from './mobile-footer';

type MobildeContentProps = {
  children: React.ReactNode
}

export default function MobileContent({
  children
}: MobildeContentProps) {
  return (
    <section
      className='relative flex flex-col items-center lg:hidden 
      h-full max-md:max-h-[calc(100vh-6rem)] md:max-lg:max-h-[calc(100vh-6rem)]'
    >
      {children}
      <MobileFooter showBoth={true} isLast={false} />
    </section>
  )
}
