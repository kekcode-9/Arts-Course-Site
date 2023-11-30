"use client";
import React, { useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import MobileContent from "../utility-components/mobile-content";
import Typography from "../utility-components/typography";
import RightColumn from "../utility-components/right-column";
import constants from "@/utilities/constants/constants";
import Logo from "../utility-components/logo";
import References from "@/public/references.webp";
import Models from "@/public/models.webp";
import Videos from "@/public/videos.webp";

const { HRS_OF_VIDEO, FIFTEENK_REFERENCES, THREEHUNDRED_3D_MODELS } = constants;

const labels = [HRS_OF_VIDEO, FIFTEENK_REFERENCES, THREEHUNDRED_3D_MODELS];

type ResourseOverviewProps = {
  src: StaticImageData;
  alt: string;
  label?: string;
  lgHeight?: string;
};

function ResourseOverview({
  src,
  alt,
  label,
  lgHeight,
}: ResourseOverviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgControls = useAnimationControls();

  useEffect(() => {
    if (imgRef.current && wrapperRef.current) {
        imgControls.start({
            transform: "translateY(0px)",
            transition: {
                duration: 9,
                repeat: Infinity
            }
        });
        imgControls.set({
            transform: `translateY(-${
                imgRef.current &&
                `${
                  wrapperRef.current &&
                  imgRef.current.offsetHeight - wrapperRef.current.offsetHeight
                }px`
              })`
        });
    }
  }, [imgRef.current, wrapperRef.current])
  return (
    <div
      ref={wrapperRef}
      className={`relative flex items-start justify-center flex-grow flex-shrink
            w-full h-[33.33%] ${lgHeight} border-
            lg:border-2 lg:border-white
            overflow-clip`}
    >
      <motion.div
        className="max-lg:absolute max-lg:-z-9 h-fit"
        animate={imgControls}
      >
        <Image
            ref={imgRef}
            src={src}
            alt={alt}
            loading="lazy"
            placeholder="blur"
            quality={100}
            className="w-auto h-auto"
        />
      </motion.div>
      <div
        className="absolute -z-9 top-0 
                block lg:hidden
                w-full h-full 
                bg-neutral-dark-gray-bg opacity-0 lg:opacity-50"
      />
      <div
        className="flex lg:hidden items-center justify-center 
                w-full h-full"
      >
        <div
          className="relative z-100 flex items-center justify-center 
                    w-full h-max 
                    py-2
                    text-white bg-black"
        >
          <Typography isHeader={false}>{label}</Typography>
        </div>
      </div>
    </div>
  );
}

function ResourcesWrapper() {
  return (
    <div
      className="relative lg:z-10 flex flex-col items-center gap-2
            w-full h-full bg-black"
    >
      <ResourseOverview
        src={Videos}
        alt={HRS_OF_VIDEO}
        label={HRS_OF_VIDEO}
        lgHeight="lg:h-[30%]"
      />
      <ResourseOverview
        src={References}
        alt={FIFTEENK_REFERENCES}
        label={FIFTEENK_REFERENCES}
        lgHeight="lg:h-[30%]"
      />
      <ResourseOverview
        src={Models}
        alt={THREEHUNDRED_3D_MODELS}
        label={THREEHUNDRED_3D_MODELS}
        lgHeight="lg:h-[40%]"
      />
    </div>
  );
}

function ResourcesAdvertLargeScreen() {
  return (
    <section className="hidden lg:flex w-full h-screen overflow-clip">
      <div className="w-full h-full flex flex-col items-center justify-around">
        <div className="absolute bottom-0 w-[1px] h-screen bg-white" />
        {labels.map((label, i) => {
          return (
            <div key={i}
              className={`relative z-10 w-full h-max py-4 ${
                i == 2 ? "mb-32" : "mb-12"
              } bg-neutral-dark-gray-bg`}
            >
              <Typography isHeader={false}>{label}</Typography>
            </div>
          );
        })}
        <div
          className="absolute z-10 bottom-12
                    flex flex-col gap-2 items-center 
                    w-full h-max 
                    py-4
                    bg-neutral-dark-gray-bg"
        >
          <Typography isHeader={false}>@</Typography>
          <Logo position="relative" bottom="bottom-0" />
        </div>
      </div>
      <ResourcesWrapper />
      <RightColumn showBoth={true} isLast={false} />
    </section>
  );
}

function ResourcesAdvertMobile() {
  return (
    <MobileContent>
      <ResourcesWrapper />
    </MobileContent>
  );
}

export default function ResourcesAdvert() {
  return (
    <>
      <ResourcesAdvertLargeScreen />
      <ResourcesAdvertMobile />
    </>
  );
}
