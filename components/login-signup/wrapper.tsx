'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/login-signup/signup';
import LoginForm from '@/components/login-signup/login';
import Typography from '@/components/utility-components/typography';
import constants from '@/utilities/constants/constants';

const {
    DONT_HAVE_ACCOUNT,
    CREATE_A_NEW_ACCOUNT,
    LOG_IN,
    MEMBER_ALREADY
} = constants;

export default function UserRegistrationWrapper() {
    const [hasAccount, setHasAccount] = useState(true);

  return (
    <div
        className='flex flex-col items-center justify-center gap-12
        w-screen h-screen'
    >
        {
            hasAccount ? <LoginForm/> : <SignupForm/>
        }
        {
            hasAccount ?
            <Typography 
                isHeader={false} 
                additionalClasses='cursor-pointer'
                animateEntrance={true}
                onClick={() => setHasAccount(false)}
            >
                {DONT_HAVE_ACCOUNT} <u>{CREATE_A_NEW_ACCOUNT}</u>
            </Typography> :
            <Typography 
                isHeader={false} 
                additionalClasses='cursor-pointer'
                animateEntrance={true}
                onClick={() => setHasAccount(true)}
            >
                {MEMBER_ALREADY} <u>{LOG_IN}</u>
            </Typography>
        }
    </div>
  )
}
