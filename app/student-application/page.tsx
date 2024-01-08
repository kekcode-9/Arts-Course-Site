import React from 'react';
import StudentApplicationWrapper from '@/components/student-application/wrapper';

export default function StudentApplication() {

  return (
    <section
        className={`
          flex flex-col items-center
          w-screen h-max min-h-full
        `}
    >
      <StudentApplicationWrapper/>
    </section>
  )
}
