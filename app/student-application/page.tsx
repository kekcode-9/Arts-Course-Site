import React from 'react';
import StudentApplicationHome from '@/components/student-application/application-home';

export default function StudentApplication() {

  return (
    <section
        className={`
          flex flex-col items-center
          w-screen h-max min-h-full
        `}
    >
      <StudentApplicationHome/>
    </section>
  )
}
