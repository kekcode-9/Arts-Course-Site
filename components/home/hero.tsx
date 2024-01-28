import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import CTA from "../utility-components/cta";
import Arrows from "../utility-components/arrows";
import Typography from "../utility-components/typography";
import constants from "@/utilities/constants/constants";
import RobertKelleysCowboys from "@/public/robert-kelley-cowboys.webp";
import BaumansGirls from "@/public/bauman-04.webp";
import ValuesOfHead from "@/public/values-of-head.webp";
import routes from "@/utilities/constants/routes";

const { STUDENT_APPLICATION, INSTRUCTOR_APPLICATION } = routes;

const {
  OR,
  NAME_HEADER,
  HERO_OBJECTIVE,
  LABEL_FOR_CLASSES,
  ARE_YOU_INSTRUCTOR,
  APPLY_NOW,
} = constants;

export function ApplySection() {
  const spanRefs = [
    useRef<HTMLSpanElement | null>(null),
    useRef<HTMLSpanElement | null>(null),
    useRef<HTMLSpanElement | null>(null),
  ];

  useEffect(() => {
    const tl = gsap.timeline();
    spanRefs.forEach((ref) => {
      if (ref.current) {
        tl.fromTo(
          ref.current,
          {
            translateY: "20px",
            opacity: 0,
          },
          {
            translateY: "0px",
            opacity: 1,
            duration: 0.3,
          },
          "<+0.07"
        );
      }
    });
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-6 
            w-[16.5rem]"
    >
      <span ref={spanRefs[0]}>
        <Typography isHeader={false}>{LABEL_FOR_CLASSES}</Typography>
      </span>
      <span ref={spanRefs[1]}>
        <Link href={STUDENT_APPLICATION}>
          <CTA label={APPLY_NOW} primary={true} />
        </Link>
      </span>
      <span ref={spanRefs[2]}>
        <Typography isHeader={false}>
          {OR} <br />
          <Link href={INSTRUCTOR_APPLICATION}>
            <span className="underline"> {ARE_YOU_INSTRUCTOR} </span> ?
          </Link>
        </Typography>
      </span>
    </div>
  );
}

export function HeaderSection() {
  return <Typography isHeader={true}>{NAME_HEADER}</Typography>;
}

export function ObjectiveSection() {
  return (
    <Typography
      additionalClasses="lg:w-full xxl:w-1/2 
      px-[3rem] xxl:px-[0rem]
      lg:text-left text-center md:leading-[2rem]"
      isHeader={false}
      animateEntrance={true}
    >
      {HERO_OBJECTIVE}
    </Typography>
  );
}

function MobileHeroImage() {
  const MotionImage = motion(Image);

  return (
    <MotionImage
      src={ValuesOfHead}
      alt="anatomy of the back"
      fill
      objectFit="cover"
      quality={100}
      loading="lazy"
      placeholder="blur"
      className="relative -z-10"
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
  );
}

export function HeroLargeLeftColImage() {
  const MotionImage = motion(Image);
  return (
    <MotionImage
      src={RobertKelleysCowboys}
      alt="Art by Robert Kelley"
      fill
      objectFit="cover"
      loading="lazy"
      placeholder="blur"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5,
        },
      }}
    />
  );
}

export function HeroLargeMiddleCol() {
  return (
    <>
      <div
        className="flex items-center justify-center 
                w-full 
                h-1/2"
      >
        <HeaderSection />
      </div>
      <div
        className="flex items-center justify-center
                w-full h-1/2 
                bg-burnt-orange"
      >
        <ApplySection />
      </div>
    </>
  );
}

export function HeroLargeRightImage() {
  const MotionImage = motion(Image);

  return (
    <MotionImage
      src={BaumansGirls}
      alt="Art by Stephen Bauman"
      fill
      objectFit="cover"
      loading="lazy"
      placeholder="blur"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 2,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 2,
        },
      }}
    />
  );
}

export function HeroMobileDevices() {
  return (
    <section
      className="hero-mobile flex flex-col lg:hidden 
            h-full"
    >
      <div className="relative flex flex-grow items-center">
        <MobileHeroImage />
        <div className="flex flex-col gap-6 items-center my-8">
          <motion.span
            initial={{
              opacity: 0,
              translateY: "10px",
            }}
            animate={{
              opacity: 1,
              translateY: "0px",
              transition: {
                duration: 0.3,
              },
            }}
          >
            <HeaderSection />
          </motion.span>
          <span>
            <ObjectiveSection />
          </span>
        </div>
      </div>
      <motion.div
        className="flex flex-col flex-grow items-center justify-between"
        initial={{
          scaleY: 0,
        }}
        animate={{
          scaleY: 1,
          transformOrigin: "bottom",
          transition: {
            duration: 0.5,
          },
        }}
      >
        <div className="flex justify-center w-full my-8">
          <ApplySection />
        </div>
        <Arrows />
      </motion.div>
    </section>
  );
}
