import React from 'react';
import UserContentWrapper from '@/components/user/user-content-wrapper';

export default function UserLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
  return (
    <UserContentWrapper>
      {children}
    </UserContentWrapper>
  )
}
