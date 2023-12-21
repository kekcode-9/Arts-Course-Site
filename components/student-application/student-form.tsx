"use client";
import React, { useState } from "react";
import CourseTypeSelection from "./course-type-selection";
import BasicInput, {
  FormWrapper,
  DropdownInput,
  HiddenDiv,
} from "../utility-components/form-inputs";
import constants from "@/utilities/constants/constants";

const { DEGREE_LIST, SKILL_LEVEL, COURSES } = constants;

const courses: {
  [key: string]: string
} = {};
Object.entries(COURSES).forEach(([key, value]) => {
  courses[key] = value.name
});

const allSlots: {
  [key: string]: string[]
} = {};
Object.entries(COURSES).forEach(([key, value]) => {
  /**
   * using concat since value.slots has all readonly items but slots[key] is of type string[] which is mutable
   */
  allSlots[key] = value.slots.concat();
});

export default function StudentForm() {
  // component states
  const [showDegreeDiv, setShowDegreeDiv] = useState(false);
  const [showProfessionDiv, setShowProfessionDiv] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<{ [key: string]: string }>({
    '': ''
  });

  const onSkillLevelChange = (item: [string, string]) => {
    const skill = item[1];
    if (skill === SKILL_LEVEL.ART_SCHOOL) {
      setShowDegreeDiv(true);
      setShowProfessionDiv(false);
    } else if (skill === SKILL_LEVEL.PROFESSIONAL) {
      setShowDegreeDiv(false);
      setShowProfessionDiv(true);
    } else {
      setShowDegreeDiv(false);
      setShowProfessionDiv(false);
    }
  };

  const onCourseChange = (item: [string, string]) => {
    const slots: {
      [key: string]: string
    } = {};
    const courseKey = item[0];
    allSlots[courseKey].map((slot, i) => {
      slots[`${courseKey}-slot${i}`] = slot;
    })
    setAvailableSlots(slots);
  };

  return (
    <div
      className="flex items-center justify-center
      w-screen h-fit max-sm:px-[2rem] max-md:px-[8rem]
    "
    >
      <FormWrapper>
        <BasicInput label="Full name" />
        <BasicInput label="Email id" inputType="email" />
        <BasicInput label="D.O.B" inputType="date" />
        <DropdownInput
          label="Highest level of education"
          dropdownList={DEGREE_LIST}
        />
        <BasicInput label="Portfolio link" inputType="url" />
        <DropdownInput
          label="Where are you at in your art journey ?"
          dropdownList={SKILL_LEVEL}
          onChange={onSkillLevelChange}
        />
        <HiddenDiv show={showDegreeDiv || showProfessionDiv}>
          {showDegreeDiv ? (
            <>
              <BasicInput label="Name of School" inputType="text" />
              <BasicInput label="Degree" inputType="text" />
              <BasicInput label="Project links" inputType="url" />
            </>
          ) : (
            <>
              <BasicInput label="Name of company" inputType="text" />
              <BasicInput label="Current role" inputType="text" />
              <BasicInput label="Years of experience" inputType="number" />
              <BasicInput
                label="How would this course help you in your career ?"
                inputType="textarea"
              />
            </>
          )}
        </HiddenDiv>
        <DropdownInput
          label="Select a course"
          dropdownList={courses}
          onChange={onCourseChange}
        />
        <DropdownInput
          label="Pick a slot"
          dropdownList={availableSlots}
        />
      </FormWrapper>
    </div>
  );
}
