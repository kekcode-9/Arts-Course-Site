'use client'
import React, { useContext } from 'react';
import MobileFooter from './mobile-footer';
import { CourseContext, HOME_ROUTES } from '@/utilities/store';
import dynamicImports from '@/utilities/dynamic-imports';
import { CourseAdvertMobile } from '../home/courses-advert';
import { InstructorMobileDevices } from '../home/instructors';

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
        return <CourseAdvertMobile/>;
      case RESOURCES_ADVERT:
        return dynamicImports(RESOURCES_ADVERT, 'ResourcesWrapper', 'ResourcesWrapper');
      case INSTRUCTORS:
        return <InstructorMobileDevices/>;
      default:
        return <></>
    }
  }

  return (
    <section
      className='relative flex flex-col items-center justify-end lg:hidden 
      h-full max-md:max-h-[calc(100vh-6rem)] md:max-lg:max-h-[calc(100vh-6rem)] min-h-[calc(632px-6rem)]'
    >
      {
        getContent()
      }
      <MobileFooter/>
    </section>
  )
}
