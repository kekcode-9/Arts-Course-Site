import React from 'react';
import Home from '@/components/user/user-home';

export default function CurrentUserHome({ params }: { params: { username: string }}) {
  return (
    <>
    {params.username}
    <Home/>
    </>
  )
}
