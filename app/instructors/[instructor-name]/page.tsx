import React from 'react';
import Instructor from '@/components/instructors/instructor';

export default function InstructorPage({ params }: { params: { instructor: string }}) {
  return (
    <Instructor/>
  )
}
