"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useRouter, usePathname } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import { getCurrentUser } from "@/lib/firebase/firebase-auth";
import routes from "@/utilities/constants/routes";
import { getAllDocumentsInCollection } from "@/lib/firebase/firestore-access";
import constants from "@/utilities/constants/constants";
import Typography from "../utility-components/typography";
import dbCollections from "@/utilities/constants/dbCollections";
import ImageViewer from "../utility-components/image-viewer";

const {
  PRE_RECORDED_COURSES,
  REFERENCES: REFERENCE_COLLECTION,
  MODELS,
} = dbCollections;

const { ROOT } = routes;

const { COURSES, THREED_MODELS, REFERENCES, WORKSHOPS } = constants.MENU_ITEMS;

function MiniCardSkeleton() {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      gsap.to(divRef.current, {
        opacity: 0.6,
        repeat: -1,
        yoyo: true,
      });
    }
  }, [])

  return (
    <div
      ref={divRef}
      className="mini-card 
      flex flex-col flex-shrink-0
      items-start
      w-[15rem] h-[15rem] 
      rounded-md overflow-clip
      cursor-pointer
      bg-dirty-white
      hover:scale-105 transition-all"
    />
  )
}

type MiniCardProps = {
  image: string;
  quickInfo?: React.ReactNode | string;
  cardTitle?: string;
  secondaryInfo?: string;
  link?: string;
  blurDataURL: string;
};

function MiniCard({
  image,
  quickInfo,
  cardTitle,
  secondaryInfo,
  link,
  blurDataURL
}: MiniCardProps) {
  const MotionImage = motion(CldImage);

  return (
    <Link href={link || ":"} target="_blank">
      <div
        className="mini-card 
        flex flex-col flex-shrink-0
        items-start
        w-[15rem] h-[15rem] 
        rounded-md overflow-clip
        cursor-pointer
        bg-white text-neutral-dark-gray-bg 
        hover:scale-105 transition-all"
      >
        <div
          className={`
            mini-card-image
            relative
            w-full ${cardTitle ? 'h-[60%]' : 'h-full'}
            ${(!cardTitle && !quickInfo) && 'border-2 border-white'}
          `}
        >
          <MotionImage
            src={image}
            alt="dummyImage"
            fill
            className="object-cover"
            blurDataURL={blurDataURL}
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
          {
            !cardTitle && quickInfo &&
            (
              <div
                className="absolute bottom-0
                w-full h-[30%] 
                p-4
                bg-white text-black"
              >
                <Typography isHeader={false} size="text-base" additionalClasses="line-clamp-2">
                  {quickInfo}
                </Typography>
              </div>
            )
          }
        </div>
        {
          cardTitle &&
          <div
            className="flex flex-col items-start gap-2
            p-4"
          >
            <div className="card-title">
              <Typography isHeader={false} size="text-base" additionalClasses="line-clamp-1">
                {cardTitle}
              </Typography>
            </div>
            {secondaryInfo && (
              <div
                className="secondary-info
                text-gray-500 font-medium"
              >
                <Typography isHeader={false} size="text-base">
                  {secondaryInfo}
                </Typography>
              </div>
            )}
            {quickInfo && (
              <div
                className="quick-info
                text-gray-500 font-medium"
              >
                {React.isValidElement(quickInfo) ? (
                  quickInfo
                ) : (
                  <Typography isHeader={false} size="text-base">
                    {quickInfo}
                  </Typography>
                )}
              </div>
            )}
          </div>
        }
      </div>
    </Link>
  );
}

type CardsRowProps = {
  rowHeader: string;
  cardsType: "courses" | "references" | "models";
  documentsArray?: DocumentData[];
  onImageClick?: (image: string, alt: string, size: [string, string]) => void;
};

function CardsRow({ rowHeader, cardsType, documentsArray, onImageClick }: CardsRowProps) {
  return (
    <div
      className="content-overview
      flex flex-col items-start gap-[2rem] 
      w-full h-fit"
    >
      <span className="flex max-sm:flex-col gap-2">
        <Typography isHeader={false} size="text-2xl">
          {rowHeader}
        </Typography>
        <Link
          href={`/${cardsType}`}
        >
          <Typography isHeader={false} additionalClasses="cursor-pointer">
            ( <u>see all</u> )
          </Typography>
        </Link>
      </span>
      <div
        className="content-wrapper
        flex items-center gap-6 sm:gap-8
        w-full h-fit 
        p-[8px]
        overflow-x-scroll"
      >
        {
          documentsArray ?
          documentsArray.map((cardItem, i) => {
            if (cardsType === "courses") {
              const { thumbnail, title, from, link, blurDataURL } = cardItem;
  
              return (
                <MiniCard
                  key={`${cardsType}-${i}`}
                  image={thumbnail}
                  cardTitle={title}
                  quickInfo={from}
                  link={link}
                  blurDataURL={blurDataURL}
                />
              )
            }

            const { image, size, blurDataURL } = cardItem;
            return (
              <div
                key={`${cardsType}-${i}`}
                className="w-fit h-fit"
                onClick={() => {
                  onImageClick && onImageClick(image, cardsType, size);
                }}
              >
                <MiniCard
                  image={image}
                  quickInfo={"keywords" in cardItem && cardItem.keywords.join(" | ")}
                  blurDataURL={blurDataURL}
                />
              </div>
            )
          }) :
          new Array(10).fill("").map((item, i) => {
            return <MiniCardSkeleton key={`minicard-skeleton-${i}`}/>
          })
        }
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const pathName = usePathname();

  const [courseSamples, setCourseSamples] = useState<DocumentData[]>();
  const [referenceSamples, setReferenceSamples] = useState<DocumentData[]>();
  const [modelSamples, setModelSamples] = useState<DocumentData[]>();
  const [showViewer, setShowViewer] = useState(false);
  const [focusedImage, setFocusedImage] = useState<[string, string, [string, string]]>();

  useEffect(() => {
    let atUserHome = true; // cleanup flag

    getCurrentUser((user) => {
      if (!user && atUserHome && pathName.includes('/user')) {
        router.push(routes.ROOT);
      }
    });
    // get courses
    getAllDocumentsInCollection(PRE_RECORDED_COURSES, 10)
      .then((allDocs) => atUserHome && setCourseSamples(allDocs))
      .catch((err) => console.log(`error fetching courses: ${err}`));

    // get references
    getAllDocumentsInCollection(REFERENCE_COLLECTION, 10)
      .then((allDocs) => atUserHome && setReferenceSamples(allDocs))
      .catch((err) => console.log(`error fetching references: ${err}`));

    // get models
    getAllDocumentsInCollection(MODELS, 10)
      .then((allDocs) => atUserHome && setModelSamples(allDocs))
      .catch((err) => console.log(`error fetching 3d models: ${err}`));

    return () => {
      atUserHome = false;
    }
  }, []);

  const onImageClick = (image: string, alt: string, size: [string, string]) => {
    setShowViewer(true);
    setFocusedImage([image, `${alt}-image`, size]);
  }

  return (
    <>
      {
        showViewer && focusedImage &&
        <ImageViewer
          image={focusedImage[0]}
          alt={focusedImage[1]}
          size={focusedImage[2]}
          onClose={() => setShowViewer(false)}
        />
      }
      <div
        className="home-content-wrapper
        flex flex-col items-start gap-8 md:gap-[5rem]
        w-screen min-w-0 
        h-screen min-h-0
        px-8 md:px-16 pt-[8.5rem] sm:pt-[10.5rem] pb-16
        overflow-x-hidden overflow-y-scroll"
      >
        <CardsRow
          rowHeader={COURSES}
          cardsType="courses"
          documentsArray={courseSamples}
          onImageClick={onImageClick}
        />
        <CardsRow
          rowHeader={REFERENCES}
          cardsType="references"
          documentsArray={referenceSamples}
          onImageClick={onImageClick}
        />
        <CardsRow
          rowHeader={THREED_MODELS}
          cardsType="models"
          documentsArray={modelSamples}
          onImageClick={onImageClick}
        />
        {/*<CardsRow rowHeader={WORKSHOPS} />*/}
      </div>
    </>
  );
}