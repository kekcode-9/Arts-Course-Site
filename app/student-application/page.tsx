import React from 'react';
import StudentForm from '@/components/student-application/student-form';

export default function StudentApplication() {
  return (
    <section
        className={`
        flex flex-col items-center
        w-screen h-max
        `}
    >
        <StudentForm/>
    </section>
  )
}
