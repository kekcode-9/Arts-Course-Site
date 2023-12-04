'use client'
import React, { useContext } from 'react';
import dynamicImports from '@/utilities/dynamic-imports';
import { CourseContext, HOME_ROUTES } from '@/utilities/store';

const { 
    HERO,
    COURSES_ADVERT,
    RESOURCES_ADVERT,
    INSTRUCTORS
} = HOME_ROUTES;

type MiddleColumnProps = {
    position?: string;
    flex?: string;
    additionalClasses?: string;
}

export default function MiddleColumn({
    position,
    flex,
    additionalClasses
}: MiddleColumnProps) {
    const { state } = useContext(CourseContext);
    const { route } = state;

    const divContent = () => {
        switch(route) {
            case HERO:
                return dynamicImports(HERO, 'HeroLargeMiddleCol');
            case COURSES_ADVERT:
                return dynamicImports(COURSES_ADVERT, 'MiddleColumn');
            case RESOURCES_ADVERT:
                return dynamicImports(RESOURCES_ADVERT, 'ResourcesWrapper');
            default:
                return dynamicImports(HERO, 'HeroLargeMiddleCol');
        }
    }

  return (
    <div
        className={`
            ${route === INSTRUCTORS && 'hidden'}
            ${position}
            ${flex}
            w-full h-full
            ${additionalClasses}
        `}
    >
        {
            divContent()
        }
    </div>
  )
}
