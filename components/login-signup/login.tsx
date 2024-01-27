import React, { useState, useEffect, useCallback, useContext } from "react";
import { UserContext } from "@/utilities/stores/userInfoStore";
import { useSearchParams, useRouter } from "next/navigation";
import { User as FirebaseUser } from "firebase/auth";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  resetForgottenPassword,
} from "@/lib/firebase/firebase-auth";
import BasicInput, { FormWrapper } from "../utility-components/form-inputs";
import CTA from "../utility-components/cta";
import Typography from "../utility-components/typography";
import constants from "@/utilities/constants/constants";
import routes from "@/utilities/constants/routes";
import { ACTIONS } from "@/utilities/constants/actions";
import webStorageItems from "@/utilities/constants/web-storage-items";
import getUser from "@/utilities/store-action-utilities/user-store-actions";

const { USER_EXISTS } = webStorageItems;

const { SET_USER_MENU_STATE } = ACTIONS.USER_ACTIONS;

const { USER } = routes;

const {
  LOGIN_FORM_LABELS,
  LOG_IN,
  ENTER_REGISTERED_EMAIL,
  RESET_PASSWORD,
  RESET_MAIL_SENT,
} = constants;

type loginInfoType = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { state, dispatch } = useContext(UserContext);
  const { userId } = state;

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
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetMailSent, setResetMailSent] = useState(false);
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
    dispatch({
      type: SET_USER_MENU_STATE,
      payload: false
    })
  }, []);

  const handleSubmit = useCallback(() => {
    const unFilled: string[] = [];
    !loginInfo?.email && unFilled.push(EMAIL);
    !loginInfo?.password && unFilled.push(PASSWORD);
    setEmptyFields(unFilled);

    if (unFilled.length) {
      return;
    }
    setLoading(true);

    if (loginInfo) {
      const { email, password } = loginInfo as loginInfoType;

      email &&
        password &&
        loginUser(
          email,
          password,
          applicationId as string,
          applicationType as string,
          (displayName: string) => {
            localStorage.setItem(USER_EXISTS, 'true');
            getUser(dispatch);
            router.push(USER(displayName as string));
          },
          (errorMessage: string) => {
            localStorage.setItem(USER_EXISTS, 'false');
            setLoading(false);
            if (errorMessage.includes("auth/invalid-credential")) {
              alert(`Sorry, we could not log you in. Please provide correct username and password`);
            } else {
              alert(`please check your userName and password and try again`)
            }
          }
        )
    }
  }, [loginInfo, applicationId]);

  const sendPasswordResetMail = useCallback(() => {
    if (!loginInfo?.email) {
      setEmptyFields([EMAIL]);
      alert("Please provide a valid email id");
      return;
    }
    resetForgottenPassword(loginInfo?.email)
      .then(() => setResetMailSent(true))
      .catch((error) => alert(error));
  }, [loginInfo]);

  return (
    <>
      {resetMailSent ? (
        <Typography isHeader={false}>
          {RESET_MAIL_SENT} - {loginInfo?.email}
        </Typography>
      ) : (
        <FormWrapper>
          {!forgotPassword ? (
            <>
              <span
                className={`
                  w-fit
                  ${emptyFields?.includes(EMAIL) && "text-error-red"}
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
                    ${emptyFields?.includes(PASSWORD) && "text-error-red"}
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
                  additionalClasses="text-right cursor-pointer"
                  animateEntrance={true}
                  onClick={() => setForgotPassword(true)}
                >
                  <u>{FORGOT_PASSWORD}</u>
                </Typography>
              </div>
            </>
          ) : (
            <span
              className={`
                w-fit
                ${emptyFields?.includes(EMAIL) && "text-error-red"}
              `}
            >
              <BasicInput
                label={ENTER_REGISTERED_EMAIL}
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
          )}
          <CTA
            primary={true}
            label={forgotPassword ? RESET_PASSWORD : LOG_IN}
            longButton={true}
            onClick={forgotPassword ? sendPasswordResetMail : handleSubmit}
            isLoading={loading}
          />
        </FormWrapper>
      )}
    </>
  );
}
