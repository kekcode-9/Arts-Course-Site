'use client'
import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/utilities/stores/userInfoStore';

export default function DummyUserRoute1() {
    const { state, dispatch } = useContext(UserContext);

    useEffect(() => {
    }, [state.userId])
  return (
    <div>DummyUserRoute1 - {state.userId}</div>
  )
}
