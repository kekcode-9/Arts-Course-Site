"use client";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { DocumentData } from "firebase/firestore";
import Typography from "../utility-components/typography";
import Logo from "../utility-components/logo";
import constants from "@/utilities/constants/constants";
import { getAllDocumentsInCollection } from "@/lib/firebase/firestore-access";
import dbCollections from "@/utilities/constants/dbCollections";
import { InstructorType } from "@/utilities/types";
import routes from "@/utilities/constants/routes";

const { INSTRUCTORS } = dbCollections;

const { MEET_INSTRUCTORS, SEE_ALL_INSTRUCTORS } = constants;

export function InstructorSkeleton() {
    const [flexDirection, setFlexDirection] = useState("flex-row");

    useEffect(() => {
        const changeFlexDirection = () => {
          if (screen.width <= 1100) {
            setFlexDirection("flex-col");
          } else {
            setFlexDirection("flex-row");
          }
        };
        changeFlexDirection();
        if (window) {
          window.addEventListener("resize", changeFlexDirection);
        }
        return () => {
          window && window.removeEventListener("resize", changeFlexDirection);
        };
      }, []);
    
    return (
        <div
            className={`instructor-skeleton
            flex ${flexDirection} gap-4 
            items-start justify-center 
            w-fit h-fit 
            p-4
            font-sans font-semibold
            cursor-pointer`}
        >
            <div
                className="relative flex items-start
                    w-[4.5rem] md:w-[6.5rem] 
                    h-[4.5rem] md:h-[6.5rem] 
                    border-4 border-double border-[#C5C5C5]
                    rounded-full 
                    overflow-clip"
            />
            <div
                className={`flex flex-col gap-4 items-start
                w-[20rem]`}
            >
                <div className="flex flex-col gap-1 items-start
                w-full">
                    <div
                        className={`
                            w-[40%]
                            h-[8px] 
                            rounded-[20px]
                            bg-dirty-white
                            opacity-60
                        `}
                    />
                    <div
                        className={`
                            w-full
                            h-[8px] 
                            rounded-[20px]
                            bg-dirty-white
                            opacity-60
                        `}
                    />
                </div>
                <div className="flex flex-col items-start gap-2 w-full">
                    <div
                        className={`
                            w-full
                            h-[12px] 
                            rounded-[20px]
                            bg-dirty-white
                            opacity-60
                        `}
                    />
                    <div
                        className={`
                            w-full
                            h-[12px] 
                            rounded-[20px]
                            bg-dirty-white
                            opacity-60
                        `}
                    />
                </div>
            </div>
        </div>
    )
}

type CardProps = {
  cardItem: InstructorType;
  id: string;
  tl?: gsap.core.Timeline;
};

export function InstructorCard({ cardItem, id, tl }: CardProps) {
  const { image, name, experties, experience } = cardItem;
  const [flexDirection, setFlexDirection] = useState("flex-row");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const instructor = name.toLowerCase().split(' ').join('-');

  useEffect(() => {
    const changeFlexDirection = () => {
      if (screen.width <= 1100) {
        setFlexDirection("flex-col");
      } else {
        setFlexDirection("flex-row");
      }
    };
    changeFlexDirection();
    if (window) {
      window.addEventListener("resize", changeFlexDirection);
    }
    return () => {
      window && window.removeEventListener("resize", changeFlexDirection);
    };
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        {
          opacity: 0,
          translateY: "10px",
        },
        {
          opacity: 1,
          translateY: "0px",
          delay: 0.5,
        }
      );
    }
  }, [cardRef.current]);

  return (
    <Link href={`${routes.INSTRUCTORS}/${instructor}?id=${id}`}>
      <div
        ref={cardRef}
        className={`flex ${flexDirection} gap-4 
          items-start justify-center 
          w-max h-max 
          p-4
          font-sans font-semibold
          cursor-pointer
          opacity-0`}
      >
        <div
          className="relative flex items-start
              w-[4.5rem] md:w-[6.5rem] 
              h-[4.5rem] md:h-[6.5rem] 
              border-4 border-double border-[#C5C5C5]
              rounded-full 
              overflow-clip"
        >
          <CldImage
            src={image}
            alt={name}
            fill
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div
          className={`flex flex-col gap-2 items-start
          max-w-[22.5rem] w-[80%]`}
        >
          <div className="flex flex-col gap-1 items-start">
            <Typography isHeader={false}>{name},</Typography>
            <Typography
              isHeader={false}
              size="text-base"
              additionalClasses="underline text-left"
            >
              {experties}
            </Typography>
          </div>
          <Typography
            isHeader={false}
            size="text-base"
            additionalClasses={` 
              text-left
              text-dirty-white line-clamp-2`}
          >
            {experience}
          </Typography>
        </div>
      </div>
    </Link>
  );
}

type InstructorCardsProps = {
  tl?: gsap.core.Timeline;
  getAll?: boolean;
};

export function InstructorCards({ tl, getAll }: InstructorCardsProps) {
  const [instructors, setInstructors] = useState<DocumentData[]>();

  useEffect(() => {
    getAllDocumentsInCollection(INSTRUCTORS, !getAll ? 4 : undefined)
      .then((allDocs) => setInstructors(allDocs))
      .catch((error) => console.log(`error fetching instructors - ${error}`));
  }, []);

  return (
    <motion.div
      className={`
        instructor-cards-wrapper
        flex flex-wrap gap-6 sm:gap-8 max-lg:justify-start
        w-full h-fit max-h-[55vh]
        max-lg:px-12 ${getAll ? 'px-8 md:px-16 pr-8 md:pr-16' : 'lg:pr-[6.5rem]'} pb-16
        overflow-scroll
      `}
      exit={{
        translateY: "-8px",
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      }}
    >
      {
        instructors ?
        instructors.map((instructor, i) => {
          return (
            <InstructorCard
              cardItem={instructor as InstructorType}
              id={instructor.id}
              tl={tl}
              key={i}
            />
          );
        }):
        new Array(4).fill('').map((item, i) => {
            return <InstructorSkeleton key={`skele-${i}`}/>
        })
      }
    </motion.div>
  );
}

function Header() {
  return (
    <Typography
      additionalClasses="text-left font-normal md:font-bold"
      size="text-2xl md:text-[2rem]"
      isHeader={false}
    >
      {MEET_INSTRUCTORS}
    </Typography>
  );
}

export function InstructorLargeLeft() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerDivRef = useRef<HTMLDivElement | null>(null);

  const tl = gsap.timeline();

  useEffect(() => {
    if (containerRef.current) {
      tl.set(containerRef.current, {
        width: "100%",
      });
    }
    if (headerDivRef.current) {
      gsap.fromTo(
        headerDivRef.current,
        {
          opacity: 0,
          translateY: "40px",
        },
        {
          opacity: 1,
          translateY: "0px",
          duration: 0.3,
        }
      );
    }
  }, [containerRef.current, headerDivRef.current]);

  return (
    <>
      <div
        ref={containerRef}
        className="relative z-10 top-0 left-0 
          flex flex-col gap-12
          w-full h-full
          pl-[6.5rem] pt-[1.7rem]
          overflow-clip"
      >
        <div
            className="flex flex-col gap-2 items-start"
        >
            <motion.div
            ref={headerDivRef}
            className="flex items-center 
                    w-full 
                    min-h-[6rem] md:h-28 lg:h-[7rem]"
            exit={{
                translateY: "-14px",
                opacity: 0,
                transition: {
                duration: 0.5,
                },
            }}
            >
              <Header />
            </motion.div>
            <Link href={routes.INSTRUCTORS}>
              <Typography isHeader={false} additionalClasses="underline cursor-pointer">
                  {SEE_ALL_INSTRUCTORS}
              </Typography>
            </Link>
        </div>
        <InstructorCards tl={tl} />
      </div>
      <Logo customInset="left-[6.5rem] bottom-12" />
    </>
  );
}

export function InstructorMobileDevices() {
  return (
    <motion.div
      className="instructor-mobile-wrapper
        flex flex-col items-center justify-center gap-8
        w-full h-full overflow-scroll
        my-12"
      initial={
        screen.width < 920 && {
          opacity: 0,
        }
      }
      animate={
        screen.width < 920 && {
          opacity: 1,
          transition: {
            duration: 0.5,
          },
        }
      }
    >
      <div
        className="flex flex-col md:flex-row items-start md:items-center justify-between 
        w-full
        px-12"
      >
        <Header />
        <Typography isHeader={false} additionalClasses="underline">
          {SEE_ALL_INSTRUCTORS}
        </Typography>
      </div>
      <InstructorCards />
    </motion.div>
  );
}
