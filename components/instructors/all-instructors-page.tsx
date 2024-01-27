'use client'
import React, { useEffect, useState } from 'react';
import { getAllDocumentsInCollection } from '@/lib/firebase/firestore-access';
import dbCollections from '@/utilities/constants/dbCollections';
import routes from '@/utilities/constants/routes';
import { DocumentData } from 'firebase/firestore';
import { InstructorCards } from '../home/instructors';
import Typography from '../utility-components/typography';
import constants from '@/utilities/constants/constants';

const { MEET_INSTRUCTORS } = constants;

const { INSTRUCTORS } = dbCollections;

const { INSTRUCTORS: INSTRUCTOR_ROUTE } = routes;

export default function AllInstructors() {
  return (
    <div
        className='flex flex-col gap-12
        pt-[8.5rem] sm:pt-[10.5rem] pb-16'
    >
        <Typography
            additionalClasses="text-left font-normal md:font-bold
            px-8 md:px-16"
            size="text-2xl md:text-[2rem]"
            isHeader={false}
        >
            {MEET_INSTRUCTORS}
        </Typography>
        <InstructorCards getAll={true} />
    </div>
  )
}
