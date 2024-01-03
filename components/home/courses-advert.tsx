'use client'
import React, { useEffect, useState, useRef, useContext } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import dynamic from "next/dynamic";
import Typography from "../utility-components/typography";
import CTA from "../utility-components/cta";
import Logo from "../utility-components/logo";
import routes from "@/utilities/constants/routes";
import constants from "@/utilities/constants/constants";
import DownArrowPlain from "../utility-components/svg-utilities/down-arrow-plain";
import Skeletons from "@/public/skeletons.png";
import { CourseContext, HOME_ROUTES } from "@/utilities/stores/courseContextStore";

const { HERO } = HOME_ROUTES;

const { COURSES } = routes;

const Slider = dynamic(
  () => import("../../components/utility-components/slider"),
  {
    loading: () => <p>Loading...</p>,
  }
);

const {
  PLUS,
  WE_OFFER,
  IN_PERSON_COURSES,
  INTERACTIVE_ONLINE,
  EXPLORE_ALL_COURSES,
} = constants;

export function MiddleColumn() {
  const { state } = useContext(CourseContext);
  const { route } = state;

  const [showArrow, setShowArrow] = useState(true);
  const [showCTA, setShowCTA] = useState(false);

  const headerSpanRef = useRef<HTMLSpanElement | null>(null);
  const arrowSpanRef = useRef<HTMLSpanElement | null>(null);
  const coursesWrapperRef = useRef<HTMLDivElement | null>(null);
  const ctaSpanRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (
      arrowSpanRef.current &&
      coursesWrapperRef.current &&
      ctaSpanRef.current
    ) {
        const tl = gsap.timeline();
        tl.to(headerSpanRef.current, {
            opacity: 1,
            translateY: '0px',
            duration: 0.3
        })
        .to(arrowSpanRef.current, {
            scaleY: 1,
            transformOrigin: 'top',
            duration: 0.3
        })
        .to(coursesWrapperRef.current, {
            opacity: 1,
            translateY: '0px',
            duration: 0.3,
        })
        .to(ctaSpanRef.current, {
            opacity: 1,
            duration: 0.1,
            onComplete: () => setShowCTA(true)
        });
    }
  }, [arrowSpanRef.current, coursesWrapperRef.current, ctaSpanRef.current]);

  useEffect(() => {
    const setArrowVisibility = (e: UIEvent | null, mounted?: boolean) => {
      if (screen.height < 892 && screen.width < 920) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
        if (!mounted) {
          gsap.to(arrowSpanRef.current, {
            scaleY: 1,
            transformOrigin: 'top',
            duration: 0.3
          });
        }
      }
    };
    setArrowVisibility(null, true);
    if (window) {
      window.addEventListener("resize", setArrowVisibility);
    }
    return () => {
      if (window) {
        window.removeEventListener("resize", setArrowVisibility);
      }
    };
  }, []);

  return (
    <motion.div
      key={"middleColumnCourses"}
      className="relative z-10 
            flex flex-col items-center justify-center gap-6 lg:gap-8 
            w-full h-full max-lg:py-8"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
    >
        <motion.span 
          ref={headerSpanRef} 
          className="opacity-0 translate-y-[20px]"
          exit={{
            translateY: route === HERO ? '20px' : '-20px',
            transition: {
              duration: 0.3
            }
          }}
        >
            <Typography
                additionalClasses="max-w-[80%] m-auto"
                isHeader={false}
                size="text-2xl"
            >
                {WE_OFFER}
            </Typography>
        </motion.span>
      {showArrow && (
        <motion.span 
          ref={arrowSpanRef} 
          className="scale-y-0"
          initial={{
            // scaleY: 0
          }}
          animate={{
            // scaleY: 1,
            // transformOrigin: 'top',
            // transition: {
            //   duration: 0.3
            // }
          }}
          exit={{
            scaleY: 0,
            transformOrigin: 'top',
            transition: {
              duration: 0.2
            }
          }}
        >
          <DownArrowPlain />
        </motion.span>
      )}
      <motion.div
        ref={coursesWrapperRef}
        className="flex flex-col gap-2 lg:gap-6 items-center opacity-0 translate-y-[20px]"
        exit={{
          translateY: route === HERO ? '20px' : '-20px',
          transition: {
            duration: 0.3
          }
        }}
      >
        <Typography isHeader={false} additionalClasses="max-w-[80%] m-auto">
          {IN_PERSON_COURSES}
        </Typography>
        <Typography isHeader={false} additionalClasses="max-w-[80%] m-auto">
          {PLUS}
        </Typography>
        <Typography isHeader={false} additionalClasses="max-w-[80%] m-auto">
          {INTERACTIVE_ONLINE}
        </Typography>
      </motion.div>
      <span ref={ctaSpanRef} 
        className="w-52 h-[48px] opacity-0"
      >
        {
          showCTA && 
          <Link href={COURSES}>
            <CTA label={EXPLORE_ALL_COURSES} primary={false} />
          </Link>
        }
      </span>
    </motion.div>
  );
}

export function CoursesAdvertLargeLeftCol() {
  return (
    <>
      <Slider imageFile="drawing-in-studio" total={4} />
      <Logo />
    </>
  );
}

export function CourseAdvertLargeRightImage() {
  const MotionImage = motion(Image);

  return (
    <MotionImage
      src={Skeletons}
      alt="back anatomy sketch"
      fill
      loading="lazy"
      placeholder="blur"
      className="object-contain"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.7,
          duration: 1,
        },
      }}
      exit={{
        objectFit: "cover",
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
    />
  );
}

export function CourseAdvertMobile() {
  return (
    <motion.div
      className="relative flex items-center flex-grow 
      w-full h-fit
      overflow-scroll"
      initial={screen.width < 920 && {
        opacity: 0
      }}
      animate={ screen.width < 920 && {
        opacity: 1,
        transition: {
          duration: 0.5
        }
      }}
    >
      <Image
        src={Skeletons}
        alt="skeletons"
        placeholder="blur"
        fill
        objectFit="cover"
        className="relative -z-10"
      />
      <div
        className="absolute -z-9 top-0 
                w-full h-full 
                bg-neutral-dark-gray-bg opacity-70"
      />
      <div className="w-full max-h-[calc(100vh-21rem)] overflow-scroll">
        <MiddleColumn />
      </div>
    </motion.div>
  );
}
