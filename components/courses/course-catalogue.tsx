'use client'
import React, { 
  useCallback, 
  useEffect, 
  useState, 
  useContext, 
  Suspense 
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import {
  getAllDocumentsInCollection,
  getDocumentsWithQuery,
  getDocumentsWithTextSearch,
} from "@/lib/firebase/firestore-access";
import { CldImage } from "next-cloudinary";
import { CourseType, CourseFilterTypes, FilterArrayType } from "@/utilities/types";
import Typography from "../utility-components/typography";
import StarIcon from "../utility-components/svg-utilities/star-icon";
import Pill from "../utility-components/pill";
import dbCollections from "@/utilities/constants/dbCollections";
import FilterIcon from "../utility-components/svg-utilities/filter-icon";
import constants from "@/utilities/constants/constants";
import routes from "@/utilities/constants/routes";
import { CourseContext } from "@/utilities/stores/courseContextStore";
import { ACTIONS } from "@/utilities/constants/actions";

const { UPDATE_COURSE_FILTERS } = ACTIONS.COURSE_ACTIONS;

const { COURSES } = routes;

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
  return (
    <div
      className={`
        ${width || 'w-[18rem] lg:w-[21rem]'}
        ${height || 'h-[23.5rem]'}
        rounded-md overflow-clip
        bg-white 
      `}
    >
      <div
        className={`
          card-image
          relative
          w-full ${imageHeight || 'h-1/2'} 
          bg-dirty-white opacity-60
        `}
      ></div>
      <div
        className="flex flex-col items-start gap-4
        p-4"
      >
        {
          new Array(textLineCount).fill('').map((item, i) => {
            return (
              <div
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
  } = course;

  return (
    <div
      className="course-card
          w-[18rem] lg:w-[21rem] 
          h-[23.5rem] 
          rounded-md overflow-clip
          cursor-pointer
          font-sans
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
          alt="test"
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
            size="text-base"
            additionalClasses="w-full 
              text-ellipsis overflow-hidden whitespace-nowrap"
          >
            <b>{title}</b>
          </Typography>
        </span>
        <Typography
          isHeader={false}
          size="text-base"
          additionalClasses="text-gray-500"
        >
          <b>From:</b> {from}
        </Typography>
        <div className="flex gap-1 text-gray-500">
          <Typography isHeader={false} size="text-base">
            <b>{videos}</b>
          </Typography>
          <Typography
            isHeader={false}
            size="text-base"
            additionalClasses="opacity-60"
          >
            |
          </Typography>
          <Typography isHeader={false} size="text-base">
            <b>Duration:</b> {duration}
          </Typography>
        </div>
        <Typography
          isHeader={false}
          size="text-base"
          additionalClasses="text-gray-500"
        >
          <b>Level:</b> {level}
        </Typography>
        <div
          className="rating-section text-gray-500
            flex gap-1"
        >
          <StarIcon />
          <Typography isHeader={false} size="text-base">
            <b>{rating}</b>
          </Typography>
          <Typography isHeader={false} size="text-base">
            ({reviewsCount} reviews)
          </Typography>
        </div>
      </div>
    </div>
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
      <span className="flex gap-[2px]">
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

function Filters() {
  const { state, dispatch } = useContext(CourseContext);
  const { courseFilters } = state;
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
        type: UPDATE_COURSE_FILTERS,
        payload: {
          ...courseFilters,
          ...updatedFilters,
        },
      });
    } else if (remove && filterToRemove) {
      const newFilters = {
        ...courseFilters,
      };
      delete newFilters[filterToRemove];
      dispatch({
        type: UPDATE_COURSE_FILTERS,
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
    <div className="relative">
      <div
        className="lg:hidden 
              flex justify-end
              w-full h-fit
              cursor-pointer"
        onClick={() => setShowFiltersOnMobile(!showFiltersOnMobile)}
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
                  onRatingSelect={() => onRatingSelect(`${currentRating}`)}
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
                  onClick={() => onLevelSelect(currentLevel)}
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
  const { courseFilters, searchQuery } = state;
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const rating = searchParams.get("rating");
  const level = searchParams.get("level");
  const [courses, setCourses] = useState<DocumentData[]>();
  const [categories, setCategories] = useState<DocumentData[]>();
  const [updateURLFromContext, setUpdateURLFromContext] = useState(false);
  

  const buildQueriesArray = (filters: CourseFilterTypes) => {
    return Object.entries(filters).map(
      ([key, value]) => {
        return {
          field: `${key}`,
          operator: key !== "rating" ? "==" : ">=",
          value: key !== "rating" ? value : Number(value),
        };
      }
    );
  }

  const getAllCourses = () => {
    getAllDocumentsInCollection(PRE_RECORDED_COURSES)
      .then((allDocs) => setCourses(allDocs))
      .catch((err) => console.log(`error fetching courses: ${err}`));
  }

  const getCoursesByFilters = (filters: CourseFilterTypes) => {
    let categoryIsAll = false;

    if (filters.category && filters.category === 'All') {
      delete filters['category'];
      categoryIsAll = true;
    }

    if (Object.entries(filters).length > 0) {
      const filterArray: FilterArrayType = buildQueriesArray(filters);
      getDocumentsWithQuery(PRE_RECORDED_COURSES, filterArray)
        .then((allDocs) => setCourses(allDocs))
        .catch((error) => console.log(`error getting courses: ${error}`));
    } else if (categoryIsAll) {
      getAllCourses();
    }
  }

  const getCoursesBySearch = (searchQuery: string, courseFilters: CourseFilterTypes) => {
    if (courseFilters.category && courseFilters.category === 'All') {
      delete courseFilters['category'];
    }

    const filtersArray: FilterArrayType = buildQueriesArray(courseFilters);
      const searchTokens = searchQuery.split(' ');
      getDocumentsWithTextSearch(
        PRE_RECORDED_COURSES, 
        "courses", 
        searchTokens,
        filtersArray
      )
        .then((allDocs) => setCourses(allDocs))
        .catch((error) => console.log(`error finding courses: ${error}`))
  }

  useEffect(() => {
    let filtersChanged = false;
    // if courseFilters have changed
    if (
      (rating !== courseFilters?.rating ||
      level !== courseFilters?.level ||
      category !== courseFilters?.category) &&
      updateURLFromContext
    ) {
      filtersChanged = true;
      router.push(`?${new URLSearchParams(courseFilters)}`);
    }

    if (searchQuery) {
      getCoursesBySearch(searchQuery, courseFilters as CourseFilterTypes);
    } else if (filtersChanged) {
      getCoursesByFilters(courseFilters as CourseFilterTypes);
    }
  }, [searchQuery, courseFilters, updateURLFromContext])

  useEffect(() => {
    const currentParams: CourseFilterTypes = {};
    Array.from(searchParams.entries()).forEach(([key, value]) => {
      currentParams[key as keyof CourseFilterTypes] = value;
    });
    dispatch({
      type: UPDATE_COURSE_FILTERS,
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
      if (label !== courseFilters?.category) {
        dispatch({
          type: UPDATE_COURSE_FILTERS,
          payload: {
            ...courseFilters,
            category: label,
          },
        });
      }
    },
    [courseFilters]
  );

  return (
    <div
      className="course-catalogue-wrapper
      flex flex-col gap-12
      w-screen 
      h-screen lg:h-full
      max-sm:overflow-hidden
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
        {categories?.map((categoryDoc, i) => {
          return (
            <Pill
              key={i}
              label={categoryDoc.id}
              active={category === categoryDoc.id}
              onPillSelect={onCategoryChange}
            />
          );
        })}
      </div>
      <div
        className="flex flex-col lg:flex-row 
          max-lg:gap-6
          justify-between
          w-full h-full
          pb-16"
      >
        <Filters />
        <div
          className="flex flex-col
          w-full h-fit"
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
                overflow-y-scroll overflow-x-hidden py-4"
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
