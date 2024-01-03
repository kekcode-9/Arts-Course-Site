'use client'
import React, {useCallback, useState} from 'react';
import { createUser } from '@/firebase/firebase-auth';
import BasicInput, { FormWrapper } from '@/components/utility-components/form-inputs';
import CTA from '@/components/utility-components/cta';
import Typography from '@/components/utility-components/typography';
import constants from '@/utilities/constants/constants';

const {
    DONT_HAVE_ACCOUNT,
    SIGN_UP,
    LOG_IN,
    MEMBER_ALREADY,
    LOGIN_FORM_LABELS,
    SIGN_UP_FORM_LABELS
} = constants;

function LoginForm() {
    const { EMAIL, PASSWORD, FORGOT_PASSWORD } = LOGIN_FORM_LABELS;
    const [ loginInfo, setLoginInfo ] = useState<{
        email: string,
        password: string
    } | undefined>();

    return (
        <FormWrapper>
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
                submitButton={true}
                primary={true}
                label={LOG_IN}
                longButton={true}
            />
        </FormWrapper>
    )
}

type signUpInfoType = {
    name: string,
    email: string,
    password: string
}

function SignupForm() {
    const { NAME, EMAIL, CREATE_PASSWORD, REENTER_PASSWORD } = SIGN_UP_FORM_LABELS;
    const [ signupInfo, setSignupInfo ] = useState<signUpInfoType| undefined>();

    const validatePassword = (password: string, reentered?: string) => {}

    const handleSubmit = useCallback(() => {
        const { name, email, password} = signupInfo as signUpInfoType;
        createUser(name, email, password, 
            () => alert('ayo success'),
            () => alert('ayo error'),
            // application_id as string | undefined, 
            // application_type as string | undefined
        );
    }, [signupInfo])

    return (
        <FormWrapper>
            <BasicInput
                label={NAME}
                mandatory={true}
                inputType='text'
                onValueChange={(name) => setSignupInfo({
                    name,
                    email: signupInfo?.email as string,
                    password: signupInfo?.password as string
                })}
            />
            <BasicInput
                label={EMAIL}
                mandatory={true}
                inputType='email'
                onValueChange={(email) => setSignupInfo({
                    name: signupInfo?.name as string,
                    email,
                    password: signupInfo?.password as string
                })}
            />
            <BasicInput
                label={CREATE_PASSWORD}
                mandatory={true}
                inputType='password'
                onValueChange={(password) => {
                    validatePassword(password);
                    setSignupInfo({
                        name: signupInfo?.name as string,
                        email: signupInfo?.email as string,
                        password
                    });
                }}
            />
            <BasicInput
                label={REENTER_PASSWORD}
                mandatory={true}
                inputType='password'
                onValueChange={(password) => {
                    if (signupInfo?.password) {
                        validatePassword(signupInfo.password, password);
                    }
                }}
            />
            <CTA
                primary={true}
                label={SIGN_UP}
                longButton={true}
                onClick={handleSubmit}
            />
        </FormWrapper>
    )
}

export default function LoginSignup() {
  return (
    <div
        className='flex flex-col items-center justify-center gap-12
        w-screen h-screen'
    >
        <SignupForm/>
    </div>
  )
}
