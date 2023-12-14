"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "../utility-components/typography";
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
  delay?: number;
  tl?: gsap.core.Timeline;
};

function ResourseOverview({
  src,
  alt,
  label,
  lgHeight,
  delay,
  tl
}: ResourseOverviewProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgParent = useRef<HTMLDivElement | null>(null);

  const imageInfiniteScroll = () => {
    const tranlateLength = (imgRef.current && wrapperRef.current) && `${imgRef.current.offsetHeight - wrapperRef.current.offsetHeight}px`;

    gsap.fromTo(imgParent.current, {
      translateY: `-${tranlateLength}`,
    }, {
      translateY: `0px`,
      duration: 15,
      repeat: -1
    });
  };

  const wrapperEntryAnimation = () => {
    if (wrapperRef.current) {
      tl && tl.to(wrapperRef.current, {
        opacity: 1
      }, `<+=${delay}`);
    }
  }

  useEffect(() => {
    wrapperEntryAnimation();
  }, [imgRef.current, wrapperRef.current]);

  return (
    <AnimatePresence>
      <motion.div
        ref={wrapperRef}
        className={`relative flex items-start justify-center flex-grow flex-shrink
        w-full h-[33.33%] ${lgHeight} border-
        lg:border-2 lg:border-white
        opacity-0
        overflow-clip
        `}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.5
          }
        }}
      >
        <motion.div
          ref={imgParent}
          className="max-lg:absolute max-lg:-z-9 h-fit"
        >
          <Image
            ref={imgRef}
            src={src}
            alt={alt}
            loading="lazy"
            placeholder="blur"
            quality={100}
            className="w-auto h-auto"
            onLoad={() => imageInfiniteScroll()}
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
      </motion.div>
    </AnimatePresence>
  );
}

export function ResourcesWrapper() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tl = gsap.timeline();

  return (
    <motion.div
      key={'middleColumnResources'}
      ref={containerRef}
      className="container-div
      relative lg:z-10 flex flex-col items-center gap-2
      w-full h-full"
      exit={{
        opacity: 0,
        transition: {
          duration: 0.5
        }
      }}
    >
      <ResourseOverview
        src={Videos}
        alt={HRS_OF_VIDEO}
        label={HRS_OF_VIDEO}
        lgHeight="lg:h-[30%]"
        delay={0.3}
        tl={tl}
      />
      <ResourseOverview
        src={References}
        alt={FIFTEENK_REFERENCES}
        label={FIFTEENK_REFERENCES}
        lgHeight="lg:h-[30%]"
        delay={0.5}
        tl={tl}
      />
      <ResourseOverview
        src={Models}
        alt={THREEHUNDRED_3D_MODELS}
        label={THREEHUNDRED_3D_MODELS}
        lgHeight="lg:h-[40%]"
        delay={1}
        tl={tl}
      />
    </motion.div>
  );
}

export function ResourcesAdvertLargeLeftCol() {
  const lineDivRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const labelRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const labelsEntryAnimation = () => {
    const tl = gsap.timeline();
    tl.to(lineDivRef.current, {
      scaleY: 1,
      transformOrigin: "top",
      delay: 0.3,
      duration: 3,
    })
      .to(
        labelRefs[0].current,
        {
          opacity: 1,
        },
        "<+=0.2"
      )
      .to(
        labelRefs[1].current,
        {
          opacity: 1,
        },
        "<+=0.4"
      )
      .to(
        labelRefs[2].current,
        {
          opacity: 1,
        },
        "<+=0.6"
      )
      .to(
        logoRef.current,
        {
          opacity: 1,
        },
        "<+=0.6"
      );
  };

  useEffect(() => {
    if (lineDivRef.current) {
      labelsEntryAnimation();
    }
  }, [lineDivRef.current]);

  return (
    <>
      <motion.div
        ref={lineDivRef}
        className="absolute bottom-0 
        w-[1px] h-screen 
        scale-y-0
        bg-white"
        exit={{
          scaleY: 0,
          transformOrigin: 'top',
          transition: {
            duration: 0.5
          }
        }}
      />
      {labels.map((label, i) => {
        return (
          <motion.div
            key={i}
            ref={labelRefs[i]}
            className={`relative z-10 w-full h-max py-4 ${
              i == 2 ? "mb-32" : "mb-12"
            } 
            opacity-0
            bg-neutral-dark-gray-bg`}
            exit={{
              opacity: 0,
              transition: {
                delay: (2-i)/10
              }
            }}
          >
            <Typography isHeader={false}>{label}</Typography>
          </motion.div>
        );
      })}
      <motion.div
        ref={logoRef}
        className="absolute z-10 bottom-12
        flex flex-col gap-2 items-center 
        w-full h-max 
        py-4
        opacity-0
        bg-neutral-dark-gray-bg"
        exit={{
          opacity: 0
        }}
      >
        <Typography isHeader={false}>@</Typography>
        <Logo position="relative" bottom="bottom-0" />
      </motion.div>
    </>
  );
}
