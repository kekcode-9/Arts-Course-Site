"use client";
import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseContext, HOME_ROUTES } from "@/utilities/store";
import dynamicImports from "@/utilities/dynamic-imports";

const { 
    HERO, 
    COURSES_ADVERT, 
    RESOURCES_ADVERT, 
    INSTRUCTORS 
} = HOME_ROUTES;

export default function LeftColumn() {
  const { state } = useContext(CourseContext);
  const { route } = state;

  const divLowerContent = () => {
    switch (route) {
      case HERO:
        return dynamicImports(HERO, "HeroLargeLeftColImage");
      case COURSES_ADVERT:
        return dynamicImports(COURSES_ADVERT, "CoursesAdvertLargeLeftCol");
      case RESOURCES_ADVERT:
        return dynamicImports(RESOURCES_ADVERT, "ResourcesAdvertLargeLeftCol");
      case INSTRUCTORS:
        return dynamicImports(INSTRUCTORS, 'InstructorLargeLeft');
      default:
        return dynamicImports(HERO, "HeroLargeLeftColImage");
    }
  };

  return (
    <div
      className={`
            w-full h-screen
        `}
    >
        <AnimatePresence>
            {
                route === HERO && (
                <motion.div
                    className="div-left-upper
                            flex justify-center
                            w-full h-1/2
                            lg:pt-[7.75rem]
                            bg-burnt-orange"
                    initial={{
                    transform: "scaleY(0)",
                    transformOrigin: "top",
                    }}
                    animate={{
                    transform: "scaleY(1)",
                    transformOrigin: "top",
                    }}
                    exit={{
                    transform: "scaleY(0)",
                    transformOrigin: "top",
                    }}
                >
                    {route === HERO && dynamicImports("hero", "ObjectiveSection")}
                </motion.div>
            )}
        </AnimatePresence>
        <div
          className={`div-left-lower
            relative
            ${
            route === RESOURCES_ADVERT &&
            "flex flex-col items-center justify-around"
            }
            w-full ${route === HERO ? "h-1/2" : "h-screen"}
          `}
        >
            {divLowerContent()}
        </div>
    </div>
  );
}
