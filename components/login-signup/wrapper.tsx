"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import SignupForm from "@/components/login-signup/signup";
import LoginForm from "@/components/login-signup/login";
import DownArrowCircular from "../utility-components/svg-utilities/down-arrow-circular";
import Typography from "@/components/utility-components/typography";
import constants from "@/utilities/constants/constants";

const LightURL = 'https://res.cloudinary.com/dxvx3y6ch/image/upload/f_auto,q_auto/v1/other/Henrick-aau-light';
const DarkURL = 'https://res.cloudinary.com/dxvx3y6ch/image/upload/f_auto,q_auto/v1/other/Henrick-aau-dark';

const LightBlur = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAM0lEQVR4nAEoANf/AP/+99DCu//9+QC4qaBhSEDSyMQAp5WPRCgcw7KrAJJzbiMAAKWTjvU4FU41yzQfAAAAAElFTkSuQmCC';
const DarkBlur = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAKElEQVR4nGPg5eWVEBfn5eVlUFZU+P/8loS4OIOIsNCS7maQGDsMAACK5AZQ21vMOQAAAABJRU5ErkJggg==';

const {
  DONT_HAVE_ACCOUNT,
  CREATE_A_NEW_ACCOUNT,
  LOG_IN,
  MEMBER_ALREADY,
  LOGO,
} = constants;

export default function UserRegistrationWrapper() {
  const [hasAccount, setHasAccount] = useState(true);
  const router = useRouter();
  const MotionImage = motion(CldImage);

  return (
    <div
      className="relative
      flex lg:items-center justify-center
      w-screen 
      h-screen min-h-fit lg:min-h-[53rem]"
    >
      <motion.div
        className={`
            decor-div
            max-lg:hidden
            w-1/2 
            h-screen min-h-[53rem] 
            ${hasAccount ? "text-white" : "text-neutral-dark-gray-bg"}
        `}
        initial={{
          backgroundColor: "transparent",
        }}
        animate={{
          backgroundColor: "#772F06",
        }}
      >
        <div
          className={`
            relative
            w-full h-[80%]
            ${hasAccount ? "bg-neutral-dark-gray-bg" : "bg-white"}
          `}
        >
          <Link
            href="https://www.instagram.com/henrikaau/?hl=en"
            target="_blank"
          >
            <MotionImage
              src={hasAccount ? DarkURL : LightURL}
              alt={"Art by Henrik Aa. Uldalen"}
              loading="lazy"
              placeholder="blur"
              blurDataURL={hasAccount ? DarkBlur : LightBlur}
              fill
              className="object-cover"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 1,
                },
              }}
            />
          </Link>
          <span
            className="absolute z-10
                    top-0 bottom-[50%] left-0 right-0 m-auto
                    w-fit h-fit"
          >
            <Typography isHeader={true} animateEntrance={true}>
              {LOGO}
            </Typography>
          </span>
          <Link
            href="https://www.instagram.com/henrikaau/?hl=en"
            target="_blank"
          >
            <span
              className={`absolute z-10
                bottom-[1.5rem] right-[1.5rem]
                cursor pointer
                hover:border-b-[1px] 
                ${
                  hasAccount
                    ? "hover:border-b-white "
                    : "hover:border-b-neutral-dark-gray-bg"
                }
                transition-all
                `}
            >
              <Typography isHeader={false} animateEntrance={true}>
                Art by <b>Henrik Aa. Uldalen</b>
              </Typography>
            </span>
          </Link>
        </div>
        <motion.span
          className="absolute
            bottom-[4.5%] left-[48px]"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <DownArrowCircular
            onClick={() => router.back()}
            fill="fill-neutral-dark-gray-bg"
            rotate="rotate-90"
          />
        </motion.span>
      </motion.div>
      <div
        className={`form-div
          relative z-0
          flex flex-col lg:flex-col-reverse gap-12 items-center justify-center
          w-screen lg:w-[70%]
          h-fit
          max-sm:px-8 max-lg:pt-16 max-lg:pb-[10rem] 
          max-lg:bg-black
        `}
      >
        <Typography
          isHeader={true}
          animateEntrance
          additionalClasses="lg:hidden"
        >
          {LOGO}
        </Typography>
        {hasAccount ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <Typography
              isHeader={false}
              additionalClasses="cursor-pointer text-center"
              animateEntrance={true}
              onClick={() => setHasAccount(false)}
            >
              {DONT_HAVE_ACCOUNT}
            </Typography>
            <Typography
              isHeader={false}
              additionalClasses="cursor-pointer text-center"
              animateEntrance={true}
              onClick={() => setHasAccount(false)}
            >
              <u>{CREATE_A_NEW_ACCOUNT}</u>
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <Typography
              isHeader={false}
              additionalClasses="cursor-pointer text-center"
              animateEntrance={true}
              onClick={() => setHasAccount(true)}
            >
              {MEMBER_ALREADY}
            </Typography>
            <Typography 
              isHeader={false}
              additionalClasses="cursor-pointer text-center"
              animateEntrance={true}
              onClick={() => setHasAccount(true)}
            >
              <u>{LOG_IN}</u>
            </Typography>
          </div>
        )}
        <div
          className="relative
            flex items-center justify-center
            w-screen sm:w-fit 
            h-fit
            px-[2rem]"
        >
          {hasAccount ? <LoginForm /> : <SignupForm />}
        </div>
        <div
          className={`
            image-div
            lg:hidden
            absolute -z-10
            w-screen 
            h-screen
            top-0 left-0
          `}
        >
          <MotionImage
            src={DarkURL}
            alt="Art by Henrik Aa. Uldalen"
            loading="lazy"
            placeholder="blur"
            blurDataURL={DarkBlur}
            fill
            className={`
              object-cover blur-[32px]
            `}
          />
        </div>
      </div>
    </div>
  );
}
