"use client";
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { CldImage } from "next-cloudinary";
import { DocumentData } from "firebase/firestore";
import {
  getAllDocumentsInCollection,
  getDocumentsWithQuery,
  getRefsWithTextSearch,
} from "@/lib/firebase/firestore-access";
import { CourseContext } from "@/utilities/stores/courseContextStore";
import Pill from "../utility-components/pill";
import dbCollections from "@/utilities/constants/dbCollections";
import { ACTIONS } from "@/utilities/constants/actions";
import {
  FilterTypes,
  FilterArrayType,
  ReferenceType,
  ModelType,
} from "@/utilities/types";
import buildQueriesArray from "@/utilities/query-builder";
import ImageViewer from "../utility-components/image-viewer";

const { UPDATE_FILTERS, SET_SEARCH_QUERY } = ACTIONS.COMMON_ACTIONS;

const { REFERENCES, REFERENCE_CATEGORIES } = dbCollections;

export function ImageCardSkeleton() {
  const refItems: React.MutableRefObject<HTMLSpanElement[]> = useRef([]);

  useEffect(() => {
    if (refItems.current) {
      gsap.to(refItems.current, {
        opacity: 0.3,
        repeat: -1,
        yoyo: true,
      });
    }
  }, []);

  return (
    <div
      className="reference-card
        flex items-center justify-center
        w-[18rem]
        h-[21rem] 
        p-2
        rounded-md overflow-clip
        cursor-pointer
        font-sans bg-white
        hover:scale-[1.07] transition-all"
    >
      <div
        ref={(ele) => {
          ele && refItems.current.push(ele);
        }}
        className="relative
          w-full h-full 
          rounded
          bg-dirty-white"
      />
    </div>
  );
}

type ImageCardProps = {
  refDoc: ReferenceType | ModelType;
  onClick: (image: string, size: [string, string]) => void;
};

export function ImageCard({ refDoc, onClick }: ImageCardProps) {
  const { image, size, blurDataURL } = refDoc;
  const MotionImage = motion(CldImage);

  return (
    <div
      className="reference-card
        flex items-center justify-center
        w-[18rem]
        h-[21rem] 
        p-2
        rounded-md overflow-clip
        cursor-pointer
        font-sans bg-gray-500
        hover:scale-[1.07] transition-all"
    >
      <div
        className="relative
          w-full h-full 
          rounded"
      >
        <MotionImage
          src={image}
          alt="reference image"
          fill
          loading="lazy"
          className="object-cover"
          onClick={() => onClick(image, size)}
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
      </div>
    </div>
  );
}

export default function ReferenceCatalogue() {
  const { state, dispatch } = useContext(CourseContext);
  const router = useRouter();
  const { filters, searchQuery } = state;

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [references, setReferences] = useState<DocumentData[]>();
  const [categories, setCategories] = useState<DocumentData[]>();
  const [updateURLFromContext, setUpdateURLFromContext] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [focusedImage, setFocusedImage] =
    useState<[string, [string, string]]>();

  const pillSkeleRefs: React.MutableRefObject<HTMLDivElement[]> = useRef([]);

  const getAllRefs = () => {
    getAllDocumentsInCollection(REFERENCES)
      .then((allDocs) => {
        let currentIndex = allDocs.length;
        let randomIndex: number;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [allDocs[currentIndex], allDocs[randomIndex]] = [
            allDocs[randomIndex],
            allDocs[currentIndex],
          ];
        }

        setReferences(allDocs);
      })
      .catch((error) => console.log(`Could not fetch references: ${error}`));
  };

  const getRefsByFilters = (filters: FilterTypes) => {
    let categoryIsAll = false;

    if (filters.category && filters.category === "All") {
      delete filters["category"];
      categoryIsAll = true;
    }

    if (Object.entries(filters).length > 0) {
      const filterArray: FilterArrayType = buildQueriesArray(filters);
      getDocumentsWithQuery(REFERENCES, filterArray)
        .then((allDocs) => setReferences(allDocs))
        .catch((error) => console.log(`error getting references: ${error}`));
    } else if (categoryIsAll) {
      getAllRefs();
    }
  };

  const getRefsBySearch = (searchQuery: string, filters: FilterTypes) => {
    if (filters.category && filters.category === "All") {
      delete filters["category"];
    }

    const filtersArray: FilterArrayType = buildQueriesArray(filters);
    const searchTokens = searchQuery.split(" ");
    getRefsWithTextSearch(REFERENCES, searchTokens, filtersArray)
      .then((allDocs) => setReferences(allDocs))
      .catch((error) => console.log(`error finding courses: ${error}`));
  };

  useEffect(() => {
    let filtersChanged = false;

    if (category !== filters?.category && updateURLFromContext) {
      filtersChanged = true;
      router.push(`?${new URLSearchParams(filters)}`);
    }

    if (searchQuery) {
      // if there is a query on searchbar
      getRefsBySearch(searchQuery, filters as FilterTypes);
    } else if (filtersChanged) {
      getRefsByFilters(filters as FilterTypes);
    }
  }, [searchQuery, filters, updateURLFromContext]);

  useEffect(() => {
    dispatch({
      type: SET_SEARCH_QUERY,
      payload: undefined
    });
    
    if (pillSkeleRefs.current) {
      gsap.to(pillSkeleRefs.current, {
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
      });
    }

    // when url search parameters change, update the same to context
    const currentParams: FilterTypes = {};
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      currentParams[key as keyof FilterTypes] = value;
    });
    dispatch({
      type: UPDATE_FILTERS,
      payload: {
        ...currentParams,
      },
    });
    getRefsByFilters(currentParams);
    setUpdateURLFromContext(true);

    if (Object.entries(currentParams).length === 0) {
      getAllRefs();
    }

    getAllDocumentsInCollection(REFERENCE_CATEGORIES)
      .then((allDocs) => setCategories(allDocs))
      .catch((err) => console.log(`error fetching course categories: ${err}`));
  }, []);

  const onCategoryChange = useCallback(
    (label: string) => {
      if (label !== filters?.category) {
        dispatch({
          type: UPDATE_FILTERS,
          payload: {
            ...filters,
            category: label,
          },
        });
      }
    },
    [filters]
  );

  const onImageClick = (image: string, size: [string, string]) => {
    setShowViewer(true);
    setFocusedImage([image, size]);
  };

  return (
    <>
      {showViewer && focusedImage && (
        <ImageViewer
          image={focusedImage[0] as string}
          alt="reference image"
          size={focusedImage[1]}
          onClose={() => setShowViewer(false)}
        />
      )}
      <div
        className="reference-catalogue-wrapper
            fixed
            flex flex-col gap-12
            w-screen 
            h-screen lg:h-full
            px-8 md:px-16 pt-[10.5rem] pb-16"
      >
        <div
          className="pills-wrapper
            w-full
            h-fit min-h-[2.75rem] md:min-h-[3rem]
            overflow-x-scroll overflow-y-hidden
            flex gap-4"
        >
          <Pill
            label="All"
            active={!category || category === "All"}
            onPillSelect={onCategoryChange}
          />
          {categories
            ? categories?.map((categoryDoc, i) => {
                return (
                  <Pill
                    key={`pill-${categoryDoc.id}`}
                    label={categoryDoc.id}
                    active={category === categoryDoc.id}
                    onPillSelect={onCategoryChange}
                  />
                );
              })
            : new Array(5).fill("").map((item, i) => {
                return (
                  <div
                    ref={(ele) => {
                      if (ele) {
                        pillSkeleRefs.current[i] = ele;
                      }
                    }}
                    key={`pill-${i}`}
                    className="w-[6.5rem] min-w-[64px]
                    h-[2.75rem] md:h-12
                    rounded-[100px]
                    cursor-pointer
                    border-2
                    border-white bg-black"
                  />
                );
              })}
        </div>
        <div
          className="flex flex-col
            w-full h-full
            max-sm:pb-24 pb-16"
        >
          <div
            className="references-wrapper
                flex flex-wrap justify-center gap-6 sm:gap-8
                w-full h-full
                overflow-y-auto pt-4"
          >
            {references
              ? references.map((refDoc, i) => {
                  return (
                    <ImageCard
                      key={i}
                      refDoc={refDoc as ReferenceType}
                      onClick={onImageClick}
                    />
                  );
                })
              : new Array(16).fill("").map((item, i) => {
                  return <ImageCardSkeleton key={i} />;
                })}
          </div>
        </div>
      </div>
    </>
  );
}
