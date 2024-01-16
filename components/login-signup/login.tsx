import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { User as FirebaseUser } from "firebase/auth";
import {
  loginUser,
  logoutUser,
} from "@/lib/firebase/firebase-auth";
import BasicInput, { FormWrapper } from "../utility-components/form-inputs";
import CTA from "../utility-components/cta";
import Typography from "../utility-components/typography";
import constants from "@/utilities/constants/constants";
import routes from "@/utilities/constants/routes";

const { USER } = routes;

const { LOGIN_FORM_LABELS, LOG_IN } = constants;

type loginInfoType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { EMAIL, PASSWORD, FORGOT_PASSWORD } = LOGIN_FORM_LABELS;
  const router = useRouter();
  const applicationId = useSearchParams().get("applicationId");
  const applicationType = useSearchParams().get("applicationType");
  const [loginInfo, setLoginInfo] = useState<
    | {
        email: string;
        password: string;
      }
    | undefined
  >();
  const [emptyFields, setEmptyFields] = useState<string[]>();

  useEffect(() => {
    logoutUser();
  }, []);

  const handleSubmit = useCallback(() => {
    const unFilled: string[] = [];
    !loginInfo?.email && unFilled.push(EMAIL);
    !loginInfo?.password && unFilled.push(PASSWORD);
    setEmptyFields(unFilled);

    if (unFilled.length) {
      return
    }

    if (loginInfo) {
      const { email, password } = loginInfo as loginInfoType;

      (email && password) && loginUser(
        email,
        password,
        applicationId as string,
        applicationType as string
      )
        .then((user: FirebaseUser) => {
          // user.uid
          // confirm that displayname actually exists
          router.push(USER(user.displayName as string));
        })
        .catch((error) => alert(`we have problem: ${error}`));
    }
  }, [loginInfo, applicationId]);

  return (
    <FormWrapper>
      <span
        className={`
          w-fit
          ${emptyFields?.includes(EMAIL) && 'text-error-red'}
        `}
      >
        <BasicInput
          label={EMAIL}
          mandatory={true}
          inputType="email"
          onValueChange={(email) =>
            setLoginInfo({
              email,
              password: loginInfo?.password as string,
            })
          }
        />
      </span>
      <div className="flex flex-col gap-2">
        <span
          className={`
            w-fit
            ${emptyFields?.includes(PASSWORD) && 'text-error-red'}
          `}
        >
          <BasicInput
            label={PASSWORD}
            mandatory={true}
            inputType="password"
            onValueChange={(password) => {
              setLoginInfo({
                email: loginInfo?.email as string,
                password,
              });
            }}
          />
        </span>
        <Typography
          isHeader={false}
          additionalClasses="text-right"
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
  );
}
