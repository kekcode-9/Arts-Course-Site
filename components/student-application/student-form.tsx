"use client";
import React, { useCallback, useEffect, useState } from "react";
import BasicInput, {
  FormWrapper,
  DropdownInput,
} from "../utility-components/form-inputs";
import constants from "@/utilities/constants/constants";
import CTA from "../utility-components/cta";
import Typography from "../utility-components/typography";
import {
  StudentApplicationFormType,
  ArtSchoolInfoType,
  ProfessionInfoType,
} from "@/utilities/types";
import { addDocumentToDB } from "@/lib/firebase/firestore-access";
import dbCollections from "@/utilities/constants/dbCollections";
import SubmissionSuccessPage from "../utility-components/submission-success-page";

const { STUDENT_APPLICATIONS } = dbCollections;

const { DEGREE_LIST, SKILL_LEVEL, COURSES_IN_PERSON, STUDENT_FORM_LABELS } =
  constants;

const {
  NAME,
  EMAIL,
  DOB,
  EDUCATION,
  PORTFOLIO,
  SKILL,
  SCHOOL_NAME,
  DEGREE,
  PROJECT,
  COMPANY,
  ROLE,
  YOE,
  PURPOSE,
  COURSE,
  SLOT,
} = STUDENT_FORM_LABELS;

/**
 * courses is a key value pair where each pair indicates a course
 */
const courses: {
  [key: string]: string;
} = {};
Object.entries(COURSES_IN_PERSON).forEach(([key, value]) => {
  courses[key] = value.name;
});

/**
 * allSlots is a key value pair where the key indicates a course key and the
 * value is a string array where each item describes an available time slot for the course
 */
const allSlots: {
  [key: string]: string[];
} = {};
Object.entries(COURSES_IN_PERSON).forEach(([key, value]) => {
  /**
   * using concat since value.slots has all readonly items but slots[key] is of type string[] which is mutable
   */
  allSlots[key] = value.slots.concat();
});

/**
 * ApplicationType explanation:
 * it is an object i.e. set of {key: value} pairs where -->
 *      each key is optional and belongs from the set of keys available on the ApplicationType
 *      each value is of the type corresponding to the key OR it is undefined
 */
export type ApplicationType = {
  [key in keyof StudentApplicationFormType<
    typeof courses,
    typeof allSlots
  >]?: StudentApplicationFormType<typeof courses, typeof allSlots>[key];
};

export default function StudentForm() {
  // component states
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [showDegreeDiv, setShowDegreeDiv] = useState(false);
  const [showProfessionDiv, setShowProfessionDiv] = useState(false);
  const [mandatoryChecklist, setMandatoryChecklist] = useState<{
    [key: string]:
      | boolean
      | {
          [key: string]: boolean;
        };
  }>();
  const [uncheckedFields, updateUncheckedFields] = useState<string[]>();
  const [availableSlots, setAvailableSlots] = useState<{
    [key: string]: string;
  }>({ "": "" });
  const [studentApplicationForm, setStudentApplicationForm] = useState<
    ApplicationType | undefined
  >();
  const [applicationId, setApplicationId] = useState<string | undefined>();

  const BASIC = "basic";
  const DROPDOWN = "dropdown";

  /**
   * the keys in formFields are the keys to be used when storing the form information in db
   * the values hold information about the input field itself
   * The sole purpose of formFields is to be mapped over to render out the input fields
   */
  const formFields = {
    name: {
      label: NAME,
      mandatory: true,
      inputType: "text",
      fieldType: BASIC,
      dropdownList: null,
    },
    email: {
      label: EMAIL,
      mandatory: true,
      inputType: "email",
      fieldType: BASIC,
      dropdownList: null,
    },
    dob: {
      label: DOB,
      mandatory: false,
      inputType: "date",
      fieldType: BASIC,
      dropdownList: null,
    },
    education: {
      label: EDUCATION,
      mandatory: true,
      inputType: null,
      fieldType: DROPDOWN,
      dropdownList: DEGREE_LIST,
    },
    portfolio: {
      label: PORTFOLIO,
      mandatory: false,
      inputType: "url",
      fieldType: BASIC,
      dropdownList: null,
    },
    skill: {
      label: SKILL,
      mandatory: true,
      inputType: null,
      fieldType: DROPDOWN,
      dropdownList: SKILL_LEVEL,
      schoolInfoFields: {
        schoolName: {
          label: SCHOOL_NAME,
          mandatory: true,
          inputType: "text",
          fieldType: BASIC,
          dropdownList: null,
        },
        degree: {
          label: DEGREE,
          mandatory: true,
          inputType: "text",
          fieldType: BASIC,
          dropdownList: null,
        },
        projectLink: {
          label: PROJECT,
          mandatory: false,
          inputType: "url",
          fieldType: BASIC,
          dropdownList: null,
        },
      },
      professionalInfoFields: {
        companyName: {
          label: COMPANY,
          mandatory: true,
          inputType: "text",
          fieldType: BASIC,
          dropdownList: null,
        },
        currentRole: {
          label: ROLE,
          mandatory: true,
          inputType: "text",
          fieldType: BASIC,
          dropdownList: null,
        },
        yoe: {
          label: YOE,
          mandatory: true,
          inputType: "number",
          fieldType: BASIC,
          dropdownList: null,
        },
        purpose: {
          label: PURPOSE,
          mandatory: false,
          inputType: "textarea",
          fieldType: BASIC,
          dropdownList: null,
        },
      },
    },
    course: {
      label: COURSE,
      mandatory: true,
      inputType: null,
      fieldType: DROPDOWN,
      dropdownList: courses,
    },
    slot: {
      label: SLOT,
      mandatory: true,
      inputType: null,
      fieldType: DROPDOWN,
      dropdownList: availableSlots,
    },
  };

  useEffect(() => {
    const checkList: { [key: string]: false } = {};
    Object.entries(formFields).map(([field, value]) => {
      if (value.mandatory) {
        /**
         * initially all fields in the checklist are unfilled so the check value is false
         */
        checkList[field] = false;
      }
    });
    setMandatoryChecklist(checkList);
  }, []);

  const onSkillLevelChange = (
    item: [string, string],
    currentForm: typeof studentApplicationForm
  ) => {
    const skill = item[1];
    // check if skill has changed
    if (currentForm?.skill?.skillLevel !== skill) {
      setStudentApplicationForm({
        ...currentForm,
        skill: undefined, // remove older value
      });
    }
    if (skill === SKILL_LEVEL.ART_SCHOOL) {
      setShowDegreeDiv(true);
      setShowProfessionDiv(false);
      const schoolInfo: { [key: string]: boolean } = {};
      Object.keys(formFields.skill.schoolInfoFields).map((key) => {
        schoolInfo[key] = false;
      });
      setMandatoryChecklist({
        ...mandatoryChecklist,
        skill: {
          ...schoolInfo,
        },
      });
    } else if (skill === SKILL_LEVEL.PROFESSIONAL) {
      setShowDegreeDiv(false);
      setShowProfessionDiv(true);
      const professionInfo: { [key: string]: boolean } = {};
      Object.keys(formFields.skill.professionalInfoFields).map((key) => {
        professionInfo[key] = false;
      });
      setMandatoryChecklist({
        ...mandatoryChecklist,
        skill: {
          ...professionInfo,
        },
      });
    } else {
      setStudentApplicationForm({
        ...currentForm,
        skill: {
          skillLevel: skill as
            | typeof SKILL_LEVEL.BEGINNER
            | typeof SKILL_LEVEL.SELF_LEARNER,
        },
      });
      setShowDegreeDiv(false);
      setShowProfessionDiv(false);
      setMandatoryChecklist({
        ...mandatoryChecklist,
        skill: true,
      });
    }
  };

  const onCourseChange = (item: [string, string]) => {
    const slots: {
      [key: string]: string;
    } = {};
    const courseKey = item[0];
    allSlots[courseKey].map((slot, i) => {
      slots[`${courseKey}-slot${i}`] = slot;
    });
    setAvailableSlots(slots);
  };

  function onSchoolInfoUpdate<T extends keyof ArtSchoolInfoType>(
    name: T,
    value: ArtSchoolInfoType[T],
    currentForm: typeof studentApplicationForm
  ) {
    currentForm &&
      setStudentApplicationForm({
        ...currentForm,
        skill: {
          ...(currentForm.skill as ArtSchoolInfoType),
          skillLevel: SKILL_LEVEL.ART_SCHOOL,
          [name]: value,
        },
      });
    if (mandatoryChecklist?.skill) {
      mandatoryChecklist.skill &&
        setMandatoryChecklist({
          ...mandatoryChecklist,
          skill: {
            ...(mandatoryChecklist.skill as { [key: string]: boolean }),
            [name]: value ? true : false,
          },
        });
    } else {
      setMandatoryChecklist({
        ...mandatoryChecklist,
        skill: {
          [name]: value ? true : false,
        },
      });
    }
  }

  function onProfessionInfoUpdate<T extends keyof ProfessionInfoType>(
    name: T,
    value: ProfessionInfoType[T],
    currentForm: typeof studentApplicationForm
  ) {
    currentForm &&
      setStudentApplicationForm({
        ...currentForm,
        skill: {
          ...(currentForm.skill as ProfessionInfoType),
          skillLevel: SKILL_LEVEL.PROFESSIONAL,
          [name]: value,
        },
      });
    if (mandatoryChecklist?.skill) {
      mandatoryChecklist.skill &&
        setMandatoryChecklist({
          ...mandatoryChecklist,
          skill: {
            ...(mandatoryChecklist.skill as { [key: string]: boolean }),
            [name]: value ? true : false,
          },
        });
    } else {
      setMandatoryChecklist({
        ...mandatoryChecklist,
        skill: {
          [name]: value ? true : false,
        },
      });
    }
  }

  const onChange = useCallback(
    (
      [fieldLabel, fieldValue]: [string, string],
      currentForm: typeof studentApplicationForm,
      fieldName: string
    ) => {
      if (fieldLabel in SKILL_LEVEL) {
        onSkillLevelChange([fieldLabel, fieldValue], currentForm);
      } else if (fieldLabel in courses) {
        onCourseChange([fieldLabel, fieldValue]);
      }

      const hasLength = fieldValue.replace(/\s/g, "").length;
      const isMandatory =
        formFields[fieldName as keyof typeof formFields].mandatory;

      if (fieldName !== "skill" && hasLength) {
        if (isMandatory && uncheckedFields?.includes(fieldName)) {
          const indexOfField = uncheckedFields.indexOf(fieldName);
          const unchecked = [...uncheckedFields];
          unchecked.splice(indexOfField, 1);
          updateUncheckedFields([...unchecked]);
        }

        setStudentApplicationForm({
          ...currentForm,
          [fieldName as keyof StudentApplicationFormType<
            typeof courses,
            typeof allSlots
          >]: fieldValue,
        });
        if (formFields[fieldName as keyof typeof formFields].mandatory) {
          setMandatoryChecklist({
            ...mandatoryChecklist,
            [fieldName]: fieldValue ? true : false,
          });
        }
      } else if (!hasLength && isMandatory) {
        if (!uncheckedFields?.includes(fieldName)) {
          const unchecked = uncheckedFields
            ? [...uncheckedFields, fieldName]
            : [fieldName];
          updateUncheckedFields(unchecked);
        }
      }
    },
    [uncheckedFields]
  );

  async function sendDocumentToDB(application: ApplicationType) {
    const docRef = await addDocumentToDB(STUDENT_APPLICATIONS, {
      ...application,
      status: "under review",
    });
    if (docRef) {
      const id = JSON.parse(docRef as string)["_key"]["path"]["segments"][1];
      setApplicationId(id);
      setSubmissionSuccess(true);
    }
  }

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const unchecked: string[] = [];
      mandatoryChecklist &&
        Object.entries(mandatoryChecklist).map(([field, value]) => {
          if (!value) {
            /**
             * for fields other than 'skill', which is nested, value will be boolean
             * value of 'true' means checked or filled, 'false' means unchecked or empty
             */
            unchecked.push(field);
          } else if (field === "skill") {
            Object.entries(value).map(([skillInfo, checked]) => {
              if (!checked) {
                unchecked.push(skillInfo);
              }
            });
          }
        });
      updateUncheckedFields(unchecked);
      if (!unchecked.length) {
        sendDocumentToDB(studentApplicationForm as ApplicationType);
      } else {
        e.preventDefault();
      }
    },
    [mandatoryChecklist, studentApplicationForm]
  );

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-12
        w-screen
        ${submissionSuccess ? "h-screen" : "h-fit"} 
        max-sm:px-8 pt-8 pb-[10rem] md:pt-16 md:pb-[14rem]
      `}
    >
      {submissionSuccess ? (
        <SubmissionSuccessPage
          applicationId={applicationId as string}
          applicationType={STUDENT_APPLICATIONS}
        />
      ) : (
        <FormWrapper>
          <Typography isHeader={true} animateEntrance={true}>
            Student Application Form
          </Typography>
          {Object.entries(formFields).map(([fieldName, fieldSpecs], i) => {
            const { label, inputType, fieldType, dropdownList, mandatory } =
              fieldSpecs;

            return fieldType === BASIC ? (
              <span
                key={`${fieldName}-${i}`}
                className={`
                    w-fit
                    ${uncheckedFields?.includes(fieldName) && "text-error-red"}
                  `}
              >
                <BasicInput
                  key={fieldName}
                  mandatory={mandatory}
                  inputType={inputType}
                  label={label}
                  onValueChange={(selectedValue) => {
                    onChange(
                      [label, selectedValue],
                      studentApplicationForm,
                      fieldName
                    );
                  }}
                />
              </span>
            ) : (
              dropdownList && (
                <div key={`${fieldName}-${i}`}
                  className="flex flex-col gap-12
                  w-fit"
                >
                  <span
                    key={`${fieldName}-${i}`}
                    className={`
                      w-fit
                      ${
                        uncheckedFields?.includes(fieldName) && "text-error-red"
                      }
                    `}
                  >
                    <DropdownInput
                      key={fieldName}
                      mandatory={mandatory}
                      label={label}
                      dropdownList={dropdownList}
                      onChange={(item: [string, string]) =>
                        onChange(item, studentApplicationForm, fieldName)
                      }
                    />
                  </span>
                  {showDegreeDiv && (
                    <>
                      {"schoolInfoFields" in fieldSpecs &&
                        Object.entries(fieldSpecs.schoolInfoFields).map(
                          ([infoField, infoFieldSpecs], j) => {
                            return (
                              infoFieldSpecs.fieldType === BASIC && (
                                <span
                                  key={j}
                                  className={`
                                    w-fit
                                    ${
                                      uncheckedFields?.includes(infoField) &&
                                      "text-error-red"
                                    }
                                  `}
                                >
                                  <BasicInput
                                    key={infoField}
                                    mandatory={mandatory}
                                    inputType={infoFieldSpecs.inputType}
                                    label={infoFieldSpecs.label}
                                    onValueChange={(selectedValue) => {
                                      onSchoolInfoUpdate(
                                        infoField as keyof ArtSchoolInfoType,
                                        selectedValue,
                                        studentApplicationForm
                                      );
                                    }}
                                  />
                                </span>
                              )
                            );
                          }
                        )}
                    </>
                  )}
                  {showProfessionDiv && (
                    <>
                      {"professionalInfoFields" in fieldSpecs &&
                        Object.entries(fieldSpecs.professionalInfoFields).map(
                          ([infoField, infoFieldSpecs], i) => {
                            return (
                              infoFieldSpecs.fieldType === BASIC && (
                                <span
                                  key={i}
                                  className={`
                                    w-fit
                                    ${
                                      uncheckedFields?.includes(infoField) &&
                                      "text-error-red"
                                    }
                                  `}
                                >
                                  <BasicInput
                                    key={infoField}
                                    mandatory={mandatory}
                                    inputType={infoFieldSpecs.inputType}
                                    label={infoFieldSpecs.label}
                                    onValueChange={(selectedValue) => {
                                      onProfessionInfoUpdate(
                                        infoField as keyof ProfessionInfoType,
                                        selectedValue,
                                        studentApplicationForm
                                      );
                                    }}
                                  />
                                </span>
                              )
                            );
                          }
                        )}
                    </>
                  )}
                </div>
              )
            );
          })}
          <CTA
            primary={true}
            label="Submit Application"
            canPlay={true}
            onClick={handleSubmit}
          />
        </FormWrapper>
      )}
    </div>
  );
}
