"use client";
import React, { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { UserContext } from "@/utilities/stores/userInfoStore";
import CommonHeaderGeneral from "./common-header-general";
import CommonHeaderProtected from "./common-header-protected";
import CommonHeaderSkeleton from "./common-header-skeleton";
import routes from "@/utilities/constants/routes";
import getUser from "@/utilities/store-action-utilities/user-store-actions";
import { HeaderLogo } from "../logo";
import webStorageItems from "@/utilities/constants/web-storage-items";
import ProfileMarker from "@/components/user/profile-marker";
import Menu from "../menu-utility/menu";
import Typography from "../typography";
import constants from "@/utilities/constants/constants";
import { DocumentData } from "firebase/firestore";

const { LOG_IN } = constants;

const { USER_EXISTS, APPLICATION_EXISTS } = webStorageItems;

const routesToIgnore = [
  routes.ROOT,
  routes.LOGIN_SIGNUP,
  routes.STUDENT_APPLICATION,
  routes.INSTRUCTOR_APPLICATION,
  routes.WORKSHOPS,
  routes.FEEDBACK,
  routes.HELP,
  routes.BLOGS,
  routes.ONLINE_INTERACTIVE_COURSES
  // routes.INSTRUCTORS
];

function SkeletonHeader() {
  const [userExists, setUserExists] = useState(false);
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      setUserExists(localStorage.getItem(USER_EXISTS) === "true");
      setHasWindow(true);
    }
  }, []);

  const LeftSection = () => {
    return (
      <>
        <HeaderLogo />
      </>
    );
  };

  const RightSection = () => {
    if (!hasWindow) {
      return <></>;
    }

    return (
      <>
        {userExists ? (
          <ProfileMarker />
        ) : (
          <Typography
            isHeader={false}
            additionalClasses="whitespace-nowrap font-sans"
          >
            {LOG_IN}
          </Typography>
        )}
        <Menu />
      </>
    );
  };

  return (
    <CommonHeaderSkeleton
      leftSection={<LeftSection />}
      rightSection={<RightSection />}
    />
  );
}

export default function CommonHeaderWrapper() {
  const router = useRouter();
  const { state, dispatch } = useContext(UserContext);
  const { userId } = state;
  const pathName = usePathname();
  const [dataFetchCompleted, setDataFetchCompleted] = useState(false);

  useEffect(() => {
    getUser(
      dispatch, 
      () => setDataFetchCompleted(true),
      () => {
          setDataFetchCompleted(true);
      }
    );
  }, []);

  if (!routesToIgnore.includes(pathName as (typeof routesToIgnore)[number])) {
    if (dataFetchCompleted) {
      return userId ? <CommonHeaderProtected /> : <CommonHeaderGeneral />;
    }
    return <SkeletonHeader />;
  }
}
