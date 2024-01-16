"use client";
import React, { useContext } from "react";
import { UserContext } from "@/utilities/stores/userInfoStore";
import { CourseContext } from "@/utilities/stores/courseContextStore";
import Typography from "../utility-components/typography";
import { ACTIONS } from "@/utilities/constants/actions";

const { SET_USER_MENU_STATE } = ACTIONS.USER_ACTIONS;

const { SET_MENU_STATE } = ACTIONS.COMMON_ACTIONS;

export default function ProfileMarker() {
  const { state, dispatch } = useContext(UserContext);
  const { userFullName, userMenu } = state;

  const { dispatch: courseContextDispatch } = useContext(CourseContext);

  const getNameInitials = () => {
    if (userFullName) {
      const nameArr = userFullName.split(" ");
      let initials: string;
      if (nameArr.length >= 2) {
        initials = nameArr[0][0] + nameArr[1][0];
      } else {
        initials = nameArr[0][0];
      }
      return initials?.toUpperCase();
    }
    return "";
  };

  const onClick = () => {
    courseContextDispatch({
        type: SET_MENU_STATE,
        payload: false
    });
    dispatch({
      type: SET_USER_MENU_STATE,
      payload: !userMenu,
    });
  };

  return (
    <div
      className="profile-marker
        flex items-center justify-center
        w-[2.75rem] sm:w-[3.75rem] 
        h-[2.75rem] sm:h-[3.75rem] 
        cursor-pointer
        rounded-[100%] 
        border-2 border-white
        bg-black"
      onClick={onClick}
    >
      <Typography isHeader={false}>{getNameInitials()}</Typography>
    </div>
  );
}
