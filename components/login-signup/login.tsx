import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { User as FirebaseUser } from 'firebase/auth';
import { getCurrentUser, loginUser } from '@/firebase/firebase-auth';
import BasicInput, { FormWrapper } from '../utility-components/form-inputs';
import CTA from '../utility-components/cta';
import Typography from '../utility-components/typography';
import constants from '@/utilities/constants/constants';

const { LOGIN_FORM_LABELS, LOG_IN } = constants;

type loginInfoType = {
    email: string;
    password: string;
}

export default function LoginForm() {
    const { EMAIL, PASSWORD, FORGOT_PASSWORD } = LOGIN_FORM_LABELS;
    const applicationId = useSearchParams().get('applicationId');
    const [ loginInfo, setLoginInfo ] = useState<{
        email: string,
        password: string
    } | undefined>();
    const [ currentUser, setCurrentUser ] = useState<FirebaseUser>();

    // temp code to see user info
    useEffect(() => {
        getCurrentUser((user) => setCurrentUser(user));
      }, []);

    const handleSubmit = useCallback(() => {
        const { email, password} = loginInfo as loginInfoType;
        loginUser(email, password)
        .then((user: FirebaseUser) => {
            setCurrentUser(user);
        })
        .catch((error) => alert(`we have problem: ${error}`))
    }, [loginInfo]);

    return (
        <FormWrapper>
            {currentUser && currentUser.uid}
            <BasicInput
                label={EMAIL}
                mandatory={true}
                inputType='email'
                onValueChange={(email) => setLoginInfo({
                    email,
                    password: loginInfo?.password as string
                })}
            />
            <div
                className='flex flex-col gap-2'
            >
                <BasicInput
                    label={PASSWORD}
                    mandatory={true}
                    inputType='password'
                    onValueChange={(password) => setLoginInfo({
                        email: loginInfo?.email as string,
                        password
                    })}
                />
                <Typography 
                    isHeader={false} 
                    additionalClasses='text-right' 
                    animateEntrance={true} 
                >
                    <u>{FORGOT_PASSWORD}</u>
                </Typography>
            </div>
            <CTA
                primary={true}
                label={LOG_IN}
                longButton={true}
                onClick={handleSubmit}
            />
        </FormWrapper>
    )
}
