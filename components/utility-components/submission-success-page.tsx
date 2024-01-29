"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { updateDocument } from "@/lib/firebase/firestore-access";
import { getCurrentUser, logoutUser } from "@/lib/firebase/firebase-auth";
import { storeUserInContext } from "@/utilities/store-action-utilities/user-store-actions";
import { UserContext } from "@/utilities/stores/userInfoStore";
import Typography from "./typography";
import constants from "@/utilities/constants/constants";
import routes from "@/utilities/constants/routes";
import CTA from "./cta";
import EasterLilly from "./svg-utilities/easeter-lilly";
import { ACTIONS } from "@/utilities/constants/actions";
import dbCollections from "@/utilities/constants/dbCollections";

const { USERS } = dbCollections;

const { REMOVE_USER, ADD_APPLICATION_DATA } = ACTIONS.USER_ACTIONS;

const { LOGIN_SIGNUP, ROOT, USER } = routes;

const { APPLICATION_SUCCESSFUL, LOG_IN_FOR_STATUS, BACK_TO_HOME, LOG_IN } =
  constants;

export default function SubmissionSuccessPage({
  applicationId,
  applicationType,
}: {
  applicationId: string;
  applicationType: string;
}) {
  const { state, dispatch } = useContext(UserContext);
  const { userId, userName } = state;
  const [homeRoute, setHomeRoute] = useState<string>(ROOT);

  useEffect(() => {
    getCurrentUser((user) => {
      if (user?.uid === userId && userId) {
        setHomeRoute(USER(userName as string));
        if (userId) {
          updateDocument(USERS, userId, {
            applicationId,
            applicationType,
          });
          dispatch({
            type: ADD_APPLICATION_DATA,
            payload: {
              applicationType,
              applicationId
            }
          })
        }
      } else if (user?.uid && !userId) {
        // no user stored in context but someone is logged in
        // storeUserInContext(user, dispatch, (userData) => {
        //   setHomeRoute(USER(user.displayName as string));
        //   if (user?.uid) {
        //     updateDocument(USERS, user.uid, {
        //       applicationId,
        //       applicationType,
        //     });
        //   }
        // });
      } else if (!user) {
        // user has been logged out
        logoutUser();
        dispatch({
          type: REMOVE_USER,
        });
        setHomeRoute(ROOT);
      }
    });
  }, []);

  return (
    <div className="flex flex-col gap-8 items-center">
      <Typography
        isHeader={true}
        animateEntrance={true}
        additionalClasses="text-center"
      >
        {APPLICATION_SUCCESSFUL}
      </Typography>
      {
        !userId &&
        <>
          <Typography
            isHeader={false}
            animateEntrance={true}
            additionalClasses="text-center"
          >
            {LOG_IN_FOR_STATUS}
          </Typography>
          <Link
            href={{
              pathname: LOGIN_SIGNUP,
              query: {
                applicationId,
                applicationType,
              },
            }}
          >
            <CTA primary={true} longButton={true} label={LOG_IN} />
          </Link>
        </>
      }
      <Link href={homeRoute}>
        <CTA primary={false} longButton={true} label={BACK_TO_HOME} />
      </Link>
      <span className="absolute -z-30 bottom-0 left-0 opacity-30">
        <EasterLilly />
      </span>
    </div>
  );
}
