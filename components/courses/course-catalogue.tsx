'use client'
import React, { 
  useCallback, 
  useEffect, 
  useState, 
  useContext, 
  useRef
} from "react";
import gsap from "gsap";
import { useRouter, useSearchParams } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import {
  getAllDocumentsInCollection,
  getDocumentsWithQuery,
  getCoursesWithTextSearch,
} from "@/lib/firebase/firestore-access";
import { CldImage } from "next-cloudinary";
import { CourseType, FilterTypes, FilterArrayType } from "@/utilities/types";
import Typography from "../utility-components/typography";
import StarIcon from "../utility-components/svg-utilities/star-icon";
import Pill from "../utility-components/pill";
import dbCollections from "@/utilities/constants/dbCollections";
import FilterIcon from "../utility-components/svg-utilities/filter-icon";
import constants from "@/utilities/constants/constants";
import { CourseContext } from "@/utilities/stores/courseContextStore";
import { ACTIONS } from "@/utilities/constants/actions";
import buildQueriesArray from "@/utilities/query-builder";
import Link from "next/link";

const { UPDATE_FILTERS, SET_SEARCH_QUERY } = ACTIONS.COMMON_ACTIONS;

const { ADVANCE, INTERMEDIATE, BEGINNER } = constants;

const courseLevels = [ADVANCE, INTERMEDIATE, BEGINNER];

const { PRE_RECORDED_COURSES, COURSE_CATEGORIES } = dbCollections;

type CardSkeletonProps = {
  width?: string;
  height?: string;
  imageHeight?: string;
  textLineCount: number;
}

function CardSkeleton ({
  width,
  height,
  imageHeight,
  textLineCount
}: CardSkeletonProps) {
  const refItems: React.MutableRefObject<HTMLSpanElement[]> = useRef([]);

  useEffect(() => {
    if (refItems.current) {
      gsap.to(refItems.current, {
        opacity: 0.3,
        repeat: -1,
        yoyo: true
      })
    }
  }, [])

  return (
    <div
      className={`
        ${width || 'w-[14rem] sm:w-[18rem] lg:w-[21rem]'}
        ${height || 'h-[18rem] sm:h-[23.5rem]'}
        rounded-md overflow-clip
        bg-white 
      `}
    >
      <div
        ref={(ele) => {
          if (ele) {
            refItems.current[0] = ele;
          }
        }}
        className={`
          card-image
          relative
          w-full ${imageHeight || 'h-1/2'} 
          bg-dirty-white opacity-60
        `}
      />
      <div
        className="flex flex-col items-start gap-4
        p-4"
      >
        {
          new Array(textLineCount).fill('').map((item, i) => {
            return (
              <div
                ref={(ele) => {
                  if(ele) {
                    refItems.current[i+1] = ele;
                  }
                }}
                key={i}
                className={`
                  ${!i ? 'w-full' : 'w-1/2'}
                  h-[12px] 
                  rounded-[20px]
                  bg-dirty-white
                  opacity-60
                `}
              />
            )
          })
        }
      </div>
    </div>
  )
}

type CourseCardType = {
  course: CourseType;
};

function CourseCard({ course }: CourseCardType) {
  const {
    title,
    from,
    videos,
    duration,
    level,
    rating,
    reviewsCount,
    thumbnail,
    link
  } = course;

  return (
    <Link href={link} target="_blank">
      <div
        className="course-card
        w-[14rem] sm:w-[18rem] lg:w-[21rem] 
        h-[18rem] sm:h-[23.5rem] 
        rounded-md overflow-clip
        cursor-pointer
        text-neutral-dark-gray-bg 
        bg-white 
        hover:scale-[1.07] transition-all"
      >
        <div
          className="card-image
            relative
            w-full h-1/2"
        >
          <CldImage
            src={thumbnail}
            alt="course thumbnail"
            fill
            loading="lazy"
            className="object-cover"
          />
        </div>
        <div
          className="card-body
            flex flex-col items-start gap-2
            w-full h-1/2 
            p-4
            bg-[linear-gradient(109deg,_#FFF_15.49%,_#FAF4EE_98.28%)]"
        >
          <span className="card-header w-full">
            <Typography
              isHeader={false}
              size="text-xs sm:text-base"
              additionalClasses="w-full 
                text-ellipsis overflow-hidden whitespace-nowrap"
            >
              <b>{title}</b>
            </Typography>
          </span>
          <Typography
            isHeader={false}
            size="text-xs sm:text-base"
            additionalClasses="text-gray-500"
          >
            <b>From:</b> {from}
          </Typography>
          <div className="flex gap-1 text-gray-500">
            <Typography isHeader={false} size="text-xs sm:text-base">
              <b>videos:</b> {videos}
            </Typography>
          </div>
          <Typography
            isHeader={false}
            size="text-xs sm:text-base"
            additionalClasses="text-gray-500"
          >
            <b>Level:</b> {level}
          </Typography>
          <div
            className="rating-section text-gray-500
              flex gap-1"
          >
            <span className="sm:hidden">
              <StarIcon small />
            </span>
            <span className="max-sm:hidden">
              <StarIcon />
            </span>
            <Typography isHeader={false} size="text-xs sm:text-base">
              <b>{rating}</b>
            </Typography>
            <Typography isHeader={false} size="text-xs sm:text-base">
              ({reviewsCount} reviews)
            </Typography>
          </div>
        </div>
      </div>
    </Link>
  );
}

type RatingFilterOptionsProps = {
  starCount: number;
  active: boolean;
  onRatingSelect: (starCount: number) => void;
};

function RatingFilterOptions({
  starCount,
  onRatingSelect,
  active,
}: RatingFilterOptionsProps) {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => onRatingSelect(starCount)}
    >
      <span className="flex sm:hidden gap-[2px]">
        {new Array(starCount).fill("").map((item, i) => {
          return <StarIcon small outline={!active} key={i} fill="white" />;
        })}
      </span>
      <span className="flex max-sm:hidden gap-[2px]">
        {new Array(starCount).fill("").map((item, i) => {
          return <StarIcon outline={!active} key={i} fill="white" />;
        })}
      </span>
      <Typography isHeader={false} additionalClasses="whitespace-nowrap">
        above {starCount}
      </Typography>
    </div>
  );
}

function Filters({
  disabled
}: {
  disabled: boolean
}) {
  const { state, dispatch } = useContext(CourseContext);
  const { filters } = state;
  const searchParams = useSearchParams();
  const rating = searchParams.get("rating");
  const level = searchParams.get("level");
  const [showFiltersOnMobile, setShowFiltersOnMobile] = useState(false);

  const updateFilters = (
    remove: Boolean,
    updatedFilters: {
      rating?: string;
      level?: string;
    },
    filterToRemove?: "rating" | "level"
  ) => {
    if (!remove) {
      dispatch({
        type: UPDATE_FILTERS,
        payload: {
          ...filters,
          ...updatedFilters,
        },
      });
    } else if (remove && filterToRemove) {
      const newFilters = {
        ...filters,
      };
      delete newFilters[filterToRemove];
      dispatch({
        type: UPDATE_FILTERS,
        payload: {
          ...newFilters,
        },
      });
    }
  };

  const onRatingSelect = useCallback(
    (currentRating: string) => {
      if (currentRating !== rating) {
        updateFilters(false, { rating: `${currentRating}` });
      } else {
        updateFilters(true, {}, "rating");
      }
    },
    [rating, updateFilters]
  );

  const onLevelSelect = useCallback(
    (currentLevel: string) => {
      if (currentLevel !== level) {
        updateFilters(false, { level: currentLevel });
      } else {
        updateFilters(true, {}, "level");
      }
    },
    [level, updateFilters]
  );

  return (
    <div className={`
      relative
      ${disabled ? 'opacity-50' : 'opacity-100'}
    `}>
      <div
        className="lg:hidden 
          flex justify-end
          w-full h-fit
          cursor-pointer"
        onClick={() => !disabled && setShowFiltersOnMobile(!showFiltersOnMobile)}
      >
        <FilterIcon />
      </div>
      <div
        className={`
          course-catalogue-filters 
          max-lg:absolute max-lg:z-20 max-lg:right-0
          ${showFiltersOnMobile ? "flex flex-col gap-4" : "hidden"}
          lg:flex lg:flex-col lg:gap-6
          lg:w-max 
          max-lg:p-6 lg:pr-12
          max-lg:mt-2
          max-lg:bg-black
        `}
      >
        <div className="flex flex-col gap-4">
          <Typography isHeader={false}>
            <b>Rating</b>
          </Typography>
          <div className="flex flex-col gap-4 pl-4">
            {new Array(4).fill("").map((item, i) => {
              const currentRating = 4 - i;
              return (
                <RatingFilterOptions
                  key={currentRating}
                  starCount={currentRating}
                  active={rating === `${currentRating}`}
                  onRatingSelect={() => !disabled && onRatingSelect(`${currentRating}`)}
                />
              );
            })}
          </div>
        </div>
        <div className="w-full h-[1px] bg-white" />
        <div className="flex flex-col gap-4">
          <Typography isHeader={false}>
            <b>Level</b>
          </Typography>
          <div className="flex flex-col gap-4 pl-4">
            {courseLevels.map((currentLevel, i) => {
              return (
                <div
                  key={i}
                  className={`level-filter-option
                    w-fit
                    pb-[2px]
                    cursor-pointer
                  `}
                  onClick={() => !disabled && onLevelSelect(currentLevel)}
                >
                  <Typography isHeader={false}>{currentLevel}</Typography>
                  <div
                    className={`
                      max-lg:hidden
                      ${
                        level === currentLevel
                          ? "scale-x-1"
                          : "scale-x-0"
                      }
                      w-full h-[1px] bg-white
                      transition-all origin-left
                    `}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CourseCatalogue() {
  const { state, dispatch } = useContext(CourseContext);
  const router = useRouter();
  const { filters, searchQuery } = state;

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const rating = searchParams.get("rating");
  const level = searchParams.get("level");

  const [courses, setCourses] = useState<DocumentData[]>();
  const [categories, setCategories] = useState<DocumentData[]>();
  const [updateURLFromContext, setUpdateURLFromContext] = useState(false);

  const pillSkeleRefs: React.MutableRefObject<HTMLDivElement[]> = useRef([]);

  const getAllCourses = () => {
    getAllDocumentsInCollection(PRE_RECORDED_COURSES)
      .then((allDocs) => setCourses(allDocs))
      .catch((err) => console.log(`error fetching courses: ${err}`));
  }

  const getCoursesByFilters = (filters: FilterTypes) => {
    let categoryIsAll = false;

    if (filters.category && filters.category === 'All') {
      delete filters['category'];
      categoryIsAll = true;
    }

    if (Object.entries(filters).length > 0) {
      const filterArray: FilterArrayType = buildQueriesArray(filters);
      getDocumentsWithQuery(PRE_RECORDED_COURSES, filterArray, "rating")
        .then((allDocs) => setCourses(allDocs))
        .catch((error) => console.log(`error getting courses: ${error}`));
    } else if (categoryIsAll) {
      getAllCourses();
    }
  }

  const getCoursesBySearch = (searchQuery: string, filters: FilterTypes) => {
    if (filters.category && filters.category === 'All') {
      delete filters['category'];
    }

    const filtersArray: FilterArrayType = buildQueriesArray(filters);
    const searchTokens = searchQuery.split(' ');
    getCoursesWithTextSearch(
      PRE_RECORDED_COURSES,
      searchTokens,
      filtersArray
    )
      .then((allDocs) => setCourses(allDocs))
      .catch((error) => console.log(`error finding courses: ${error}`))
  }

  useEffect(() => {
    let filtersChanged = false;
    // if filters have changed
    if (
      (rating !== filters?.rating ||
      level !== filters?.level ||
      category !== filters?.category) &&
      updateURLFromContext
    ) {
      filtersChanged = true;
      router.push(`?${new URLSearchParams(filters)}`);
    }

    if (searchQuery) {
      getCoursesBySearch(searchQuery, filters as FilterTypes);
    } else if (filtersChanged) {
      getCoursesByFilters(filters as FilterTypes);
    }
  }, [searchQuery, filters, updateURLFromContext])

  useEffect(() => {
    dispatch({
      type: SET_SEARCH_QUERY,
      payload: undefined
    });
    
    if (pillSkeleRefs.current) {
      gsap.to(pillSkeleRefs.current, {
        opacity: 0.2,
        repeat: -1,
        yoyo: true
      })
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
    getCoursesByFilters(currentParams);
    setUpdateURLFromContext(true);

    if (Object.entries(currentParams).length === 0) {
      getAllCourses();
    }

    getAllDocumentsInCollection(COURSE_CATEGORIES)
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

  return (
    <div
      className="course-catalogue-wrapper
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
        {
          categories ?
          categories?.map((categoryDoc, i) => {
            return (
              <Pill
                key={`pill-${categoryDoc.id}`}
                label={categoryDoc.id}
                active={category === categoryDoc.id}
                onPillSelect={onCategoryChange}
              />
            );
          }) :
          new Array(7).fill('').map((item, i) => {
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
            )
          })
        }
      </div>
      <div
        className="flex flex-col lg:flex-row 
          max-lg:gap-6
          justify-between
          w-full h-full pb-16"
      >
        <Filters disabled={!courses} />
        <div
          className="flex flex-col
          w-full h-full 
          max-sm:pb-24 pb-16"
        >
          {/*<span>
            <Typography isHeader={false}>
              {
                courses?.length ?
                `( showing ${courses.length} results )` :
                '( no results found )'
              }
            </Typography>
            </span>*/}
          <div
            className="courses-wrapper
                flex flex-wrap justify-center gap-6 sm:gap-8
                w-full h-full
                overflow-y-auto pt-4"
          >
            {
              courses ?
              courses.map((courseDoc, i) => {
                return (
                  <CourseCard key={i} course={courseDoc as CourseType} />
                )
              }) :
              new Array(10).fill('').map((item, i) => {
                return <CardSkeleton key={i} textLineCount={6}/>
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}
