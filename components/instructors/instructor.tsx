"use client";
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useSearchParams, useRouter } from "next/navigation";
import Typography from "../utility-components/typography";
import { CldImage } from "next-cloudinary";
import { getDocumentFromDB } from "@/lib/firebase/firestore-access";
import dbCollections from "@/utilities/constants/dbCollections";
import { InstructorType } from "@/utilities/types";
import Link from "next/link";

const { INSTRUCTORS } = dbCollections;

function InstructorSkeleton() {
  const router = useRouter();
  const refItems: React.MutableRefObject<HTMLDivElement[]> = useRef([]);

  useEffect(() => {
    gsap.to(refItems.current, {
      opacity: 0.6,
      repeat: -1,
      yoyo: true,
      stagger: 0.07,
    });
  }, []);

  return (
    <div
      className="flex flex-col
            gap-6 lg:gap-8
            w-[80%] sm:w-[60%] h-fit
            pb-16"
    >
      <Typography
        isHeader={false}
        onClick={() => router.back()}
        additionalClasses="group cursor-pointer"
      >
        <span
          className="inline-block 
                group-hover:-translate-x-1 group-hover:transition-all"
        >
          &larr;
        </span>{" "}
        <span className="pb-[2px] border-b border-b-white">
          Back to instructors
        </span>
      </Typography>
      <div
        ref={(ele) => ele && refItems.current.push(ele)}
        className="relative flex items-start
            w-[8.5rem] md:w-[12.5rem] 
            h-[8.5rem] md:h-[12.5rem] 
            border-4 border-double border-[#C5C5C5]
            bg-dirty-white
            rounded-full 
            overflow-clip"
      />
      <div className="flex flex-col gap-2">
        <div
          ref={(ele) => ele && refItems.current.push(ele)}
          className="w-[40%] rounded-md h-2 bg-dirty-white"
        />
        <div
          ref={(ele) => ele && refItems.current.push(ele)}
          className="w-[30%] rounded-md h-2 bg-dirty-white"
        />
        <div
          ref={(ele) => ele && refItems.current.push(ele)}
          className="w-[70%] rounded-md h-2 bg-dirty-white"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div
          ref={(ele) => ele && refItems.current.push(ele)}
          className="w-[26.25] rounded-md h-6 bg-dirty-white"
        />
        <div
          ref={(ele) => ele && refItems.current.push(ele)}
          className="h-[20rem] rounded-md bg-dirty-white"
        />
      </div>
    </div>
  );
}

export default function Instructor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const instructorId = searchParams.get("id");
  const [instructor, setInstructor] = useState<InstructorType>();

  useEffect(() => {
    getDocumentFromDB(INSTRUCTORS, instructorId as string)
      .then((docData) => setInstructor(docData as InstructorType))
      .catch((error) => console.log(`could not get instructor - ${error}`));
  }, []);

  return (
    <div
      className="flex justify-center
        w-screen h-screen
        px-8 md:px-16 pt-[8.5rem] sm:pt-[10.5rem] pb-16"
    >
      {instructor ? (
        <div
          className="flex flex-col
            gap-6 lg:gap-8
            w-[80%] sm:w-[60%] h-fit
            pb-16"
        >
          <Typography
            isHeader={false}
            onClick={() => router.back()}
            additionalClasses="group cursor-pointer"
            animateEntrance={true}
          >
            <span
              className="inline-block 
                    group-hover:-translate-x-1 group-hover:transition-all"
            >
              &larr;
            </span>{" "}
            <span className="pb-[2px] border-b border-b-white">
              Back to instructors
            </span>
          </Typography>
          <div
            className="relative flex items-start
                w-[8.5rem] md:w-[12.5rem] 
                h-[8.5rem] md:h-[12.5rem] 
                border-4 border-double border-[#C5C5C5]
                rounded-full 
                overflow-clip"
          >
            <CldImage
              src={instructor.image}
              alt={instructor.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              isHeader={false}
              size={"text-2xl"}
              animateEntrance={true}
            >
              {instructor.name}
            </Typography>
            <Link href={instructor.site} target="_blank">
              <Typography
                isHeader={false}
                additionalClasses="text-golden"
                animateEntrance={true}
                animateDelay={0.2}
              >
                <u>
                  <i>@{instructor.linkText}</i>
                </u>
              </Typography>
            </Link>
            <Typography
              isHeader={false}
              animateEntrance={true}
              animateDelay={0.3}
            >
              <u>{instructor.experties}</u>
            </Typography>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <Typography
                isHeader={false}
                animateEntrance={true}
                animateDelay={0.4}
              >
                <b>Experience:</b>
              </Typography>
              <Typography
                isHeader={false}
                additionalClasses="text-dirty-white"
                animateEntrance={true}
                animateDelay={0.5}
              >
                {instructor.experience}
              </Typography>
            </div>
            <Typography
              isHeader={false}
              additionalClasses="text-dirty-white"
              animateEntrance={true}
              animateDelay={0.6}
            >
              {instructor.description}
            </Typography>
          </div>
        </div>
      ) : (
        <InstructorSkeleton />
      )}
    </div>
  );
}
