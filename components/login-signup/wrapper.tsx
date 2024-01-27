'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "@/components/login-signup/signup";
import LoginForm from "@/components/login-signup/login";
import DownArrowCircular from "../utility-components/svg-utilities/down-arrow-circular";
import Typography from "@/components/utility-components/typography";
import constants from "@/utilities/constants/constants";
import DarkArt from "@/public/henrickaau-art-dark.webp";
import LightArt from "@/public/henrikaau-art-light.webp";



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
  const MotionImage = motion(Image);

  return (
    <div
      className="relative
      flex items-center justify-center
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
            backgroundColor: "transparent"
        }}
        animate={{
            backgroundColor: "#772F06"
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
              src={hasAccount ? DarkArt : LightArt}
              alt={"Art by Henrik Aa. Uldalen"}
              loading="lazy"
              placeholder="blur"
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
            <Typography isHeader={true} animateEntrance={true} >
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
              <Typography isHeader={false} animateEntrance={true} >
                Art by <b>Henrik Aa. Uldalen</b>
              </Typography>
            </span>
          </Link>
        </div>
        <motion.span
            className="absolute
            bottom-[4.5%] left-[48px]"
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
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
          relative
          flex flex-col lg:flex-col-reverse gap-8 items-center justify-center
          w-screen lg:w-[70%]
          h-full
        `}
      >
        {hasAccount ? (
          <Typography
            isHeader={false}
            additionalClasses="cursor-pointer"
            animateEntrance={true}
            onClick={() => setHasAccount(false)}
          >
            {DONT_HAVE_ACCOUNT} <u>{CREATE_A_NEW_ACCOUNT}</u>
          </Typography>
        ) : (
          <Typography
            isHeader={false}
            additionalClasses="cursor-pointer"
            animateEntrance={true}
            onClick={() => setHasAccount(true)}
          >
            {MEMBER_ALREADY} <u>{LOG_IN}</u>
          </Typography>
        )}
        <div
            className="relative
            flex items-center justify-center
            w-screen sm:w-fit 
            h-fit
            px-[2rem] 
            backdrop-blur-sm"
        >
            {hasAccount ? <LoginForm /> : <SignupForm />}
        </div>
        <div
            className={`
                image-div
                lg:hidden
                absolute -z-10
                w-screen 
                h-screen lg:min-h-[53rem]
            `}
        >
            <MotionImage
                src={DarkArt}
                alt='Art by Henrik Aa. Uldalen'
                loading="lazy"
                placeholder="blur"
                fill
                className={`
                    object-cover
                `}
            />
        </div>
      </div>
    </div>
  );
}
