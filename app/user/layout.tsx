import React from 'react';

export default function UserLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <div className='user-content-wrapper w-screen h-screen bg-neutral-dark-gray-bg'>
      {children}
    </div>
  )
}
