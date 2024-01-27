import React, { useState, useCallback, useEffect, useContext } from 'react';
import { UserContext } from '@/utilities/stores/userInfoStore';
import { useSearchParams, useRouter } from 'next/navigation';
import { createUser, logoutUser } from '@/lib/firebase/firebase-auth';
import BasicInput, { FormWrapper } from '../utility-components/form-inputs';
import CTA from '../utility-components/cta';
import routes from '@/utilities/constants/routes';
import constants from '@/utilities/constants/constants';
import webStorageItems from '@/utilities/constants/web-storage-items';
import getUser from '@/utilities/store-action-utilities/user-store-actions';
import { getCurrentUser } from '@/lib/firebase/firebase-auth';

const { USER_EXISTS } = webStorageItems;

const { USER, ROOT } = routes;

const { SIGN_UP_FORM_LABELS, SIGN_UP, PASSWORD_REQUIREMENT } = constants;

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

    const { state, dispatch } = useContext(UserContext);
    const { userId } = state;

    const [ signupInfo, setSignupInfo ] = useState<signUpInfoType| undefined>();
    const [passwordMissedCases, setPasswordMissedCases] = useState<string[]>([]);
    const [reenteredPassword, setReenteredPassword] = useState<string>();
    const [emptyFields, setEmptyFields] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userId) {
            getCurrentUser((user) => {
              if (user) {
                router.forward();
              }
            })
          }
        // logoutUser();
    }, [])

    const handleSubmit = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const unFilled: string[] = [];

        if (!signupInfo) {
            unFilled.push(NAME);
            unFilled.push(EMAIL);
            unFilled.push(CREATE_PASSWORD);
            unFilled.push(REENTER_PASSWORD);
            setEmptyFields(unFilled);
            return
        }

        const { name, email, password} = signupInfo as signUpInfoType;

        !name && unFilled.push(NAME);
        !email && unFilled.push(EMAIL);
        !password && unFilled.push(CREATE_PASSWORD);
        !reenteredPassword && unFilled.push(REENTER_PASSWORD);
        setEmptyFields(unFilled);

        if (unFilled.length) {
            return
        }

        setLoading(true);

        if (signupInfo?.password !== reenteredPassword) {
            alert('Please re-enter the correct password');
            return
        }

        createUser(name, email, password, 
            (uid, userName) => {
                localStorage.setItem(USER_EXISTS, 'true');
                getUser(dispatch);
                router.push(USER(userName as string));
            },
            (error) => {
                localStorage.setItem(USER_EXISTS, 'false');
                setLoading(false);
                alert(`User creation failed with error: ${error}`);
                e.preventDefault();
            },
            applicationId as string, 
            applicationType as string
        );
    }, [signupInfo, reenteredPassword]);

    const validatePassword = (password: string) => {
        let failed = false;
        const missedCases: string[] = [];
        const passwordArr = password.split("");
        const digitExists = passwordArr.filter((character) =>
          Number(character) || character === '0'
        ).length;
        const hasUppercase = passwordArr.filter(
          (character) => character === character.toUpperCase()
        ).length;
        const hasLowercase = passwordArr.filter(
          (character) => character === character.toLowerCase()
        ).length;
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    
        if (password.length < 8) {
          failed = true;
          missedCases.push("password must have at least 8 characters");
        }
        if (!digitExists) {
          failed = true;
          missedCases.push("password must have at least one numeric");
        }
        if (!hasUppercase) {
          failed = true;
          missedCases.push("password must have at least one uppercase");
        }
        if (!hasLowercase) {
          failed = true;
          missedCases.push("password must have at least one lowercase");
        }
        if (!specialChars.test(password)) {
          failed = true;
          missedCases.push("password must have at least one special character");
        }
        setPasswordMissedCases(missedCases);
        return failed;
    };

    const showErrorAlert = useCallback(() => {
        alert(`Please adhere to password criteria: ${passwordMissedCases}`)
    }, [passwordMissedCases]);

    return (
        <FormWrapper>
            <span
                className={`
                    w-fit
                    ${emptyFields?.includes(NAME) && 'text-error-red'}
                `}
            >
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
            </span>
            <span
                className={`
                    w-fit
                    ${emptyFields?.includes(EMAIL) && 'text-error-red'}
                `}
            >
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
            </span>
            <span
                className={`
                    w-fit
                    ${emptyFields?.includes(CREATE_PASSWORD) && 'text-error-red'}
                `}
            >
                <BasicInput
                    label={CREATE_PASSWORD}
                    secondaryLabel={PASSWORD_REQUIREMENT}
                    mandatory={true}
                    inputType='password'
                    onValueChange={(password) => {
                        const failedValidation = validatePassword(password);
                        !failedValidation && setSignupInfo({
                            name: signupInfo?.name as string,
                            email: signupInfo?.email as string,
                            password
                        });
                    }}
                />
            </span>
            <span
                className={`
                    w-fit
                    ${emptyFields?.includes(REENTER_PASSWORD) && 'text-error-red'}
                `}
            >
                <BasicInput
                    label={REENTER_PASSWORD}
                    mandatory={true}
                    inputType='password'
                    onValueChange={(password) => setReenteredPassword(password)}
                />
            </span>
            <CTA
                primary={true}
                label={SIGN_UP}
                longButton={true}
                onClick={passwordMissedCases.length ? showErrorAlert : handleSubmit}
                isLoading={loading}
            />
        </FormWrapper>
    )
}
