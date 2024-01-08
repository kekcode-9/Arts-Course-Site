'use client'
import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/firebase/firebase-auth';
import routes from '@/utilities/constants/routes';
import { UserContext } from '@/utilities/stores/userInfoStore';

const { ROOT } = routes;

export default function Home() {
    const router = useRouter();
    const {state} = useContext(UserContext);

    useEffect(() => {
        getCurrentUser((user) => {
            if (!user) {
                router.push(ROOT);
            }
        })
    }, [])

  return (
    <div>user home has {state.userId}</div>
  )
}
