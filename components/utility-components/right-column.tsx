"use client";
import React, { useContext } from "react";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import HeaderLinks from "./header-links";
import Arrows from "./arrows";
import dynamicImports from "@/utilities/dynamic-imports";

const { HERO, COURSES_ADVERT, INSTRUCTORS } = HOME_ROUTES;

export default function RightColumn() {
  const { state } = useContext(CourseContext);
  const { showBoth, route } = state;

  const imageContent = () => {
    switch (route) {
      case HERO:
        return dynamicImports(HERO, "HeroLargeRightImage");
      case COURSES_ADVERT:
        return dynamicImports(COURSES_ADVERT, "CourseAdvertLargeRightImage");
      default:
        return <></>;
    }
  };

  return (
    <div
      className={`
            ${route === INSTRUCTORS && "absolute z-10 right-0"}
            flex flex-col 
            ${route === INSTRUCTORS ? "w-[33.33%]" : "w-full"} 
            h-screen
        `}
    >
      <HeaderLinks
        hideOnLarge={false}
        height={showBoth || route === INSTRUCTORS ? "lg:h-1/6" : null}
      />
      <div
        className={`relative basis-auto
            w-full h-full
            ${route === COURSES_ADVERT ? "bg-white" : ""}
            `}
      >
        {
            imageContent()
        }
        <Arrows/>
      </div>
    </div>
  );
}
