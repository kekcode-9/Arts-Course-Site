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
      className='relative flex flex-col lg:hidden h-full max-h-[calc(100vh-6rem)]'
    >
      {children}
      <MobileFooter showBoth={true} isLast={false} />
    </section>
  )
}
