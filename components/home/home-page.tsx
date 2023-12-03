'use client'
import React, { useContext } from 'react';
import Hero from './hero';
import CoursesAdvert from './courses-advert';
import ResourcesAdvert from './resources-advert';
import Instructors from './instructors';
import { 
    CourseContextProvider, 
    CourseContext, 
    HOME_ROUTES
} from '@/utilities/store';

const {
    HERO,
    COURSES_ADVERT,
    RESOURCES_ADVERT,
    INSTRUCTORS
} = HOME_ROUTES

const getActiveSection = (route: string) => {
    switch(route) {
        case HERO:
            return <Hero/>
        case COURSES_ADVERT:
            return <CoursesAdvert/>
        case RESOURCES_ADVERT:
            return <ResourcesAdvert/>
        case INSTRUCTORS:
            return <Instructors/>
        default:
            return <Hero/>
    }
}

function Test () {
    const { state } = useContext(CourseContext);
    const { route } = state;
    return (
        <>
            {getActiveSection(route)}
        </>
    )
}

export default function HomePage() {
  return (
    <CourseContextProvider>
        <Test/>
    </CourseContextProvider>
  )
}
