"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HeaderLogo } from "../logo";
import CommonHeaderSkeleton from "./common-header-skeleton";
import CTA from "../cta";
import SearchBar from "../search-bar";
import Menu from "../menu-utility/menu";
import constants from "@/utilities/constants/constants";
import Typography from "../typography";
import routes from "@/utilities/constants/routes";

const { LOGIN_SIGNUP, STUDENT_APPLICATION } = routes;

const { LOG_IN, APPLY_NOW } = constants;

function LeftSection() {
  const pathname = usePathname();
  return (
    <>
      <HeaderLogo />
      <span className="cta-span max-lg:hidden">
        <Link href={STUDENT_APPLICATION}>
          <CTA label={APPLY_NOW} primary={true} />
        </Link>
      </span>
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
  );
}

function RightSection() {
  return (
    <>
      <Link href={LOGIN_SIGNUP}>
        <Typography
          isHeader={false}
          additionalClasses="whitespace-nowrap font-sans cursor-pointer"
        >
          {LOG_IN}
        </Typography>
      </Link>
      <Menu />
    </>
  );
}

export default function CommonHeaderGeneral() {
  return (
    <CommonHeaderSkeleton
      leftSection={<LeftSection />}
      rightSection={<RightSection />}
    />
  );
}
