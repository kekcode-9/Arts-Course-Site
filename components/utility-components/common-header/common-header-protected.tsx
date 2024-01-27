"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeaderLogo } from "../logo";
import CommonHeaderSkeleton from "./common-header-skeleton";
import ProfileMarker from "@/components/user/profile-marker";
import CTA from "../cta";
import SearchBar from "../search-bar";
import { usePathname } from "next/navigation";
import { UserContext } from "@/utilities/stores/userInfoStore";
import Menu from "../menu-utility/menu";
import constants from "@/utilities/constants/constants";
import UserMenu from "@/components/user/user-menu";
import routes from "@/utilities/constants/routes";

const { STUDENT_APPLICATION } = routes;

const { APPLY_NOW } = constants;

function LeftSection() {
  const { state } = useContext(UserContext);
  const { userApplicationId, userId } = state;

  const pathname = usePathname();

  return (
    <>
      <HeaderLogo />
      {userId && (
        <>
          {!userApplicationId && (
            <span className="cta-span max-lg:hidden">
              <Link href={STUDENT_APPLICATION}>
                <CTA label={APPLY_NOW} primary={true} headerButton={true} />
              </Link>
            </span>
          )}
          {!pathname.includes("/user") &&
            !pathname.includes("/models") &&
            !pathname.includes("/instructors") && (
              <motion.span
                className="searchbar-span max-sm:hidden"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
              >
                <SearchBar />
              </motion.span>
            )}
        </>
      )}
    </>
  );
}

function RightSection() {
  const { state } = useContext(UserContext);
  const { userId } = state;

  if (userId) {
    return (
      <>
        <ProfileMarker />
        <Menu />
      </>
    );
  }
  return
}

export default function CommonHeaderProtected() {
  return (
    <>
      <CommonHeaderSkeleton
        leftSection={<LeftSection />}
        rightSection={<RightSection />}
      />
      <UserMenu />
    </>
  );
}
