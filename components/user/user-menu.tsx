import React, { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { logoutUser } from "@/lib/firebase/firebase-auth";
import Typography from "../utility-components/typography";
import constants from "@/utilities/constants/constants";
import routes from "@/utilities/constants/routes";
import { UserContext } from "@/utilities/stores/userInfoStore";
import CTA from "../utility-components/cta";
import { ACTIONS } from "@/utilities/constants/actions";

const { SET_USER_MENU_STATE, REMOVE_USER } = ACTIONS.USER_ACTIONS;

const {
  ROOT,
  INSTRUCTOR_APPLICATION,
  STUDENT_APPLICATION,
  USER,
  APPLICATION_STATUS,
} = routes;

const { LOG_OUT, CHECK_APPLICATION_STATUS, APPLY_AS_INSTRUCTOR, MY_COURSES } =
  constants.USER_MENU_ITEMS;

const { APPLY_NOW } = constants;

export default function UserMenu() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsRef: React.MutableRefObject<HTMLSpanElement[]> = useRef([]);
  const { state, dispatch } = useContext(UserContext);
  const { userMenu, userApplicationId, userName } = state;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target?.classList.contains("user-menu") &&
        !e.target?.classList.contains("profile-marker")
      ) {
        dispatch({
          type: SET_USER_MENU_STATE,
          payload: false,
        });
      }
    };

    document.addEventListener("click", onDocClick);

    return () => {
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (!userMenu) {
        const tl = gsap.timeline();
        tl.to(itemsRef.current, {
          opacity: 0,
          duration: 0.2,
          stagger: 0.02,
        }).to(menuRef.current, {
          scaleY: 0,
          transformOrigin: "top",
        });
      } else {
        gsap.to(menuRef.current, {
          scaleY: 1,
          transformOrigin: "top",
        });
      }

      const itemsEntranceTimer =
        userMenu &&
        setTimeout(() => {
          gsap.to(itemsRef.current, {
            opacity: 1,
            duration: 0.5,
            stagger: 0.07,
          });
        }, 400);

      return () => {
        itemsEntranceTimer && clearTimeout(itemsEntranceTimer);
      };
    }
  }, [userMenu, menuRef.current]);

  const closeMenu = () => {
    dispatch({
      type: SET_USER_MENU_STATE,
      payload: false,
    });
  };

  const logout = () => {
    logoutUser();
    dispatch({
      type: REMOVE_USER,
    });
    closeMenu();
    // router.push(ROOT);
  };

  return (
    <div
      ref={menuRef}
      className="user-menu
        absolute z-10 right-0
        flex flex-col gap-12
        w-fit h-fit
        p-8 md:px-16
        bg-black
        scale-y-0"
    >
      {userApplicationId && (
        <span
          ref={(ele) => ele && itemsRef.current.push(ele)}
          className="w-fit
                transition-all
                cursor-pointer
                opacity-0"
          onClick={closeMenu}
        >
          <Link href={`${USER(userName as string)}${APPLICATION_STATUS}`}>
            <Typography isHeader={false}>{CHECK_APPLICATION_STATUS}</Typography>
          </Link>
        </span>
      )}
      {!userApplicationId && (
        <span
          ref={(ele) => ele && itemsRef.current.push(ele)}
          className="w-fit
                transition-all
                cursor-pointer
                opacity-0"
        >
          <Link href={INSTRUCTOR_APPLICATION} onClick={closeMenu}>
            <Typography isHeader={false}>{APPLY_AS_INSTRUCTOR}</Typography>
          </Link>
        </span>
      )}
      <span
        ref={(ele) => ele && itemsRef.current.push(ele)}
        className="w-fit
            transition-all
            cursor-pointer
            opacity-0"
      >
        <Typography isHeader={false} onClick={logout}>
          {LOG_OUT}
        </Typography>
      </span>
      {!userApplicationId && (
        <span
          ref={(ele) => ele && itemsRef.current.push(ele)}
          className="lg:hidden w-fit h-fit opacity-0"
        >
          <Link href={STUDENT_APPLICATION} onClick={closeMenu}>
            <CTA label={APPLY_NOW} primary={true} />
          </Link>
        </span>
      )}
    </div>
  );
}
