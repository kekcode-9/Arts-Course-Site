import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createUser, logoutUser } from '@/lib/firebase/firebase-auth';
import BasicInput, { FormWrapper } from '../utility-components/form-inputs';
import CTA from '../utility-components/cta';
import routes from '@/utilities/constants/routes';
import constants from '@/utilities/constants/constants';

const { USER } = routes;

const { SIGN_UP_FORM_LABELS, SIGN_UP } = constants;

type signUpInfoType = {
    name: string,
    email: string,
    password: string
}

export default function SignupForm() {
    const { NAME, EMAIL, CREATE_PASSWORD, REENTER_PASSWORD } = SIGN_UP_FORM_LABELS;
    const router = useRouter();
    const applicationId = useSearchParams().get('applicationId');
    const applicationType = useSearchParams().get('applicationType');
    const [ signupInfo, setSignupInfo ] = useState<signUpInfoType| undefined>();

    const validatePassword = (password: string, reentered?: string) => {}

    useEffect(() => {
        logoutUser();
    }, [])

    const handleSubmit = useCallback(() => {
        const { name, email, password} = signupInfo as signUpInfoType;
        createUser(name, email, password, 
            (uid, userName) => router.push(USER(userName as string)),
            () => alert('ayo error'),
            applicationId as string, 
            applicationType as string
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
