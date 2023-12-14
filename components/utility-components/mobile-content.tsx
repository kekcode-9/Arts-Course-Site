'use client'
import React, { useContext } from 'react';
import MobileFooter from './mobile-footer';
import { CourseContext, HOME_ROUTES } from '@/utilities/store';
import dynamicImports from '@/utilities/dynamic-imports';

const {
  COURSES_ADVERT,
  RESOURCES_ADVERT,
  INSTRUCTORS
} = HOME_ROUTES;

export default function MobileContent() {
  const { state } = useContext(CourseContext);
  const { route } = state;

  const getContent = () => {
    switch(route) {
      case COURSES_ADVERT:
        return dynamicImports(COURSES_ADVERT, 'CourseAdvertMobile');
      case RESOURCES_ADVERT:
        return dynamicImports(RESOURCES_ADVERT, 'ResourcesWrapper');
      case INSTRUCTORS:
        return dynamicImports(INSTRUCTORS, 'InstructorMobileDevices');
      default:
        return <></>
    }
  }

  return (
    <section
      className='relative flex flex-col items-center lg:hidden 
      h-full max-md:max-h-[calc(100vh-6rem)] md:max-lg:max-h-[calc(100vh-6rem)]'
    >
      {
        getContent()
      }
      <MobileFooter/>
    </section>
  )
}
