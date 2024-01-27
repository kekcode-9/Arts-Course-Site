'use client'
import React, { useState } from "react";
import CourseTypeSelection from "./course-type-selection";
import StudentForm from "./student-form";

export default function StudentApplicationWrapper() {
  const [showCourseTypeOptions, setShowCourseTypeOptions] = useState(true);
  const [showInPersonForm, setShowInPersonForm] = useState(false);
  const [showOnlineInteractiveOptions, setShowOnlineInteractiveOptions] =
    useState(false);

  return (
    <>
      {
        showCourseTypeOptions &&
        <CourseTypeSelection
          onInPersonOption={() => {
            setShowInPersonForm(true);
            setShowCourseTypeOptions(false);
          }}
          onOnlineInteractiveOption={() => {
            setShowOnlineInteractiveOptions(true);
            setShowCourseTypeOptions(false);
          }}
        />
      }
      {
        showInPersonForm && <StudentForm/>
      }
    </>
  )
}
