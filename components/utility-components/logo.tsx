"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Typography from "./typography";
import { getCurrentUser } from "@/lib/firebase/firebase-auth";
import constants from "@/utilities/constants/constants";
import { ACTIONS } from "@/utilities/constants/actions";
import {
  CourseContext,
  HOME_ROUTES,
} from "@/utilities/stores/courseContextStore";
import { UserContext } from "@/utilities/stores/userInfoStore";
import routes from "@/utilities/constants/routes";
import { storeUserInContext } from "@/utilities/store-action-utilities/user-store-actions";
import { logoutUser } from "@/lib/firebase/firebase-auth";
import Link from "next/link";

const { ROOT, USER } = routes;

const { HERO } = HOME_ROUTES;
const { UPDATE_ROUTE } = ACTIONS.HOME_ROUTE_ACTIONS;
const { REMOVE_USER } = ACTIONS.USER_ACTIONS;
const { LOGO } = constants;
const mobileLogoArr = LOGO.split(" ");

export function HeaderLogo() {
  const { state, dispatch } = useContext(UserContext);
  const { userId, userName } = state;
  const [homeRoute, setHomeRoute] = useState<string>(ROOT);

  useEffect(() => {
    getCurrentUser((user) => {
      if (user?.uid === userId) {
        setHomeRoute(USER(userName as string));
      } else if(user?.uid && !userId) {
        // no user stored in context but someone is logged in
        storeUserInContext(user, dispatch, () => {
          setHomeRoute(USER(user.displayName as string));
        })
      } else if (!user && userId) {
        // user has been logged out
        logoutUser();
        dispatch({
          type: REMOVE_USER
        });
        setHomeRoute(ROOT);
      }
    })
  }, [])

  return (
    <Link
      href={homeRoute}
    >
      <Typography
        isHeader={true}
        size="text-[1.25rem] sm:text-[1.5rem] max-sm:leading-6"
        additionalClasses="w-min xl:w-fit cursor-pointer"
      >
        {LOGO}
      </Typography>
    </Link>
  );
}

type LogoProps = {
  position?: string;
  bottom?: string;
  customInset?: string;
};

export default function Logo({ position, bottom, customInset }: LogoProps) {
  const { dispatch } = useContext(CourseContext);
  const router = useRouter();

  return (
    <>
      <div
        className="flex flex-col items-start w-[5rem] lg:hidden cursor-pointer"
        onClick={() => {
          router.push(ROOT);
          dispatch({
            type: UPDATE_ROUTE,
            payload: HERO,
          });
        }}
      >
        {mobileLogoArr.map((word) => {
          return (
            <Typography
              isHeader={false}
              size={"1rem"}
              key={word}
              additionalClasses="font-serif"
            >
              <u>{word}</u>
            </Typography>
          );
        })}
      </div>
      <motion.div
        onClick={() => {
          dispatch({
            type: UPDATE_ROUTE,
            payload: HERO,
          });
        }}
        className={`${position || "absolute"} z-10 hidden lg:block
            ${customInset || `right-0 ${bottom || "bottom-12"} left-0`}  
            w-fit h-fit
            m-auto`}
        initial={{}}
        animate={{}}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <Typography
          isHeader={false}
          additionalClasses="underline cursor-pointer font-serif"
        >
          {LOGO}
        </Typography>
      </motion.div>
    </>
  );
}
