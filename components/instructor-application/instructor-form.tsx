"use client";
import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import * as EmailValidator from 'email-validator';
import BasicInput, {
  FormWrapper,
  DropdownInput,
} from "../utility-components/form-inputs";
import Typography from "../utility-components/typography";
import constants from "@/utilities/constants/constants";
import CTA from "../utility-components/cta";
import {
  BasicInfoType,
  ExperienceInfoType,
  InstructorApplicationFormType,
} from "@/utilities/types";
import { addDocumentToDB } from "@/lib/firebase/firestore-access";
import dbCollections from "@/utilities/constants/dbCollections";
import TrashIcon from "../utility-components/svg-utilities/trash-icon";
import SubmissionSuccessPage from "../utility-components/submission-success-page";

const { INSTRUCTOR_APPLICATIONS } = dbCollections;

const { INSTRUCTOR_FORM_LABELS, INSTRUCTOR_EXPERIENCE_INFO, DEGREE_LIST } =
  constants;

const {
  NAME,
  EMAIL,
  DOB,
  EDUCATION,
  SCHOOL_NAME,
  PORTFOLIO,
  EXPERTIES,
  EXPERIENCE,
  PICK_YOUR_SUBJECT,
} = INSTRUCTOR_FORM_LABELS;

const {
  STUDIO_NAME,
  ROLE,
  STARTED_AT,
  ENDED_AT,
  DESCRIPTION,
  REFERENCE_PERSON,
  ADD_ANOTHER: ADD_ANOTHER_EXPERIENCE,
} = INSTRUCTOR_EXPERIENCE_INFO;

type ApplicationType = {
  [key in keyof InstructorApplicationFormType]: InstructorApplicationFormType[key];
};

export default function InstructorForm() {
  type InstructorFormType = {
    [key: string]: BasicInfoType | ExperienceInfoType[];
  };
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [instructorApplicationForm, setInstructorApplicationForm] =
    useState<InstructorFormType>();
  const [applicationId, setApplicationId] = useState<string>();
  const [currentSection, setCurrentSection] = useState<number>(1);

  const BASIC = "basic";
  const DROPDOWN = "dropdown";

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
      mandatory: true,
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
    schoolName: {
      label: SCHOOL_NAME,
      mandatory: true,
      inputType: "text",
      fieldType: BASIC,
      dropdownList: null,
    },
    portfolio: {
      label: PORTFOLIO,
      mandatory: true,
      inputType: "url",
      fieldType: BASIC,
      dropdownList: null,
    },
    experties: {
      label: EXPERTIES,
      mandatory: true,
      inputType: null,
      fieldType: null,
      aditionAvailable: true,
      dropdownList: null,
    },
    experience: {
      label: EXPERIENCE,
      mandatory: true,
      inputType: null,
      fieldType: null,
      aditionAvailable: true,
      dropdownList: null,
      subFields: {
        studio: {
          label: STUDIO_NAME,
          mandatory: true,
          inputType: "text",
          fieldType: BASIC,
          dropdownList: null,
        },
        role: {
          label: ROLE,
          mandatory: true,
          inputType: "text",
          fieldType: BASIC,
          dropdownList: null,
        },
        startedAt: {
          label: STARTED_AT,
          mandatory: true,
          inputType: "date",
          fieldType: BASIC,
          dropdownList: null,
        },
        endedAt: {
          label: ENDED_AT,
          mandatory: true,
          inputType: "date",
          fieldType: BASIC,
          dropdownList: null,
        },
        description: {
          label: DESCRIPTION,
          mandatory: true,
          inputType: "textarea",
          fieldType: BASIC,
          dropdownList: null,
        },
        referencePerson: {
          label: REFERENCE_PERSON,
          mandatory: true,
          inputType: "email",
          fieldType: BASIC,
          dropdownList: null,
        },
      },
    },
    subjects: {
      label: PICK_YOUR_SUBJECT,
      mandatory: true,
      inputType: null,
      fieldType: null,
      aditionAvailable: true,
      dropdownList: null,
    },
  } as const;

  async function sendDocumentToDB(application: ApplicationType) {
    const docRef = await addDocumentToDB(INSTRUCTOR_APPLICATIONS, {
      ...application,
      status: "under review",
    });

    if (docRef) {
      const id = JSON.parse(docRef as string)["_key"]["path"]["segments"][1];
      setApplicationId(id);
      setSubmissionSuccess(true);
    }
  }

  const addToForm = useCallback(
    (formContent: BasicInfoType | ExperienceInfoType[], key: string) => {
      if (key === "basics") {
        const formFormat = {
          [key]: {
            ...(formContent as BasicInfoType),
          },
        };
        instructorApplicationForm
          ? setInstructorApplicationForm({
              ...instructorApplicationForm,
              [key]: {
                ...(formContent as BasicInfoType),
              },
            })
          : setInstructorApplicationForm({
              ...formFormat,
            });
      } else {
        const formFormat = {
          [key]: formContent,
        };
        const finalApplication = instructorApplicationForm
          ? {
              ...instructorApplicationForm,
              [key]: formContent,
            }
          : {
              ...formFormat,
            };

        const application: ApplicationType = {
          ...finalApplication["basics"],
          experience: finalApplication["experiences"] as ExperienceInfoType[],
        } as ApplicationType;

        sendDocumentToDB(application);
      }
    },
    [currentSection, instructorApplicationForm]
  );

  function FormSlideBasic() {
    type ObjectType = { [key: string]: string };

    const [expertiesCount, setExpertiesCount] = useState<number>(1);
    const [subjectsCount, setSubjectsCount] = useState<number>(1);
    const [uncheckedFields, updateUncheckedFields] = useState<string[]>();
    const [keysToRemove, setKeysToRemove] = useState<string[]>([]);
    const [formContent, setFormContent] = useState<ApplicationType>();
    const [subjects, setSubjects] = useState<ObjectType>();
    const [experties, setExperties] = useState<ObjectType>();

    const removeField = (
      key: string,
      keysToRemove: string[],
      experties: ObjectType,
      subjects: ObjectType,
      formContent: ApplicationType
    ) => {
      setKeysToRemove([...keysToRemove, key]);
      const keyType = key.split("-")[0];
      const isExpertiesField = keyType === "experties";
      const currentListValues = isExpertiesField
        ? { ...experties }
        : { ...subjects };

      delete currentListValues[key];

      isExpertiesField
        ? setExperties(currentListValues)
        : setSubjects(currentListValues);

      setFormContent({
        ...(formContent as ApplicationType),
        [keyType]: Object.values(currentListValues),
      });
    };

    const onChange = useCallback(
      (
        fieldName: keyof ApplicationType,
        fieldValue: string,
        currentForm: ApplicationType,
        listValues?: ObjectType,
        key?: string,
        keysToRemove?: string[],
        experties?: ObjectType,
        subjects?: ObjectType
      ) => {
        if (!fieldValue.replace(/\s/g, "").length) {
          // value is empty
          if (fieldName !== "experties" && fieldName !== "subjects") {
            const updatedForm = {
              ...currentForm,
            };
            fieldName in updatedForm && delete updatedForm[fieldName];
            setFormContent(updatedForm);
            uncheckedFields
              ? updateUncheckedFields([...uncheckedFields, fieldName])
              : updateUncheckedFields([fieldName]);
          } else if (key) {
            removeField(
              key,
              keysToRemove as string[],
              experties as ObjectType,
              subjects as ObjectType,
              currentForm
            );
          }
          return;
        }

        if (fieldName !== "experties" && fieldName !== "subjects") {
          if (uncheckedFields) {
            const fieldIndex = uncheckedFields.indexOf(fieldName);
            const updatedUnchecked = [...uncheckedFields];
            if (fieldIndex >= 0) {
              updatedUnchecked.splice(fieldIndex, 1);
              updateUncheckedFields([...updatedUnchecked]);
            }
          }
          setFormContent({
            ...currentForm,
            [fieldName]: fieldValue,
          });
        } else if (key) {
          const updatedListValues = {
            ...listValues,
            [key]: fieldValue,
          };

          // write/overwrite the field value in corresponding list
          fieldName === "experties"
            ? setExperties(updatedListValues)
            : setSubjects(updatedListValues);

          const valuesArr = Object.values(updatedListValues);

          setFormContent({
            ...currentForm,
            [fieldName]: [...valuesArr],
          });
        }
      },
      [uncheckedFields]
    );

    const handleSubmit = useCallback(() => {
      const unchecked: string[] = [];
      formContent
        ? Object.entries(formFields).map(([fieldName, fieldValue]) => {
            if (
              fieldName !== "experience" &&
              (!(fieldName in formContent) ||
                !formContent[fieldName as "experties" | "subjects"]?.length)
            ) {
              unchecked.push(fieldName);
            }
          })
        : Object.keys(formFields).map((fieldName: string) => {
            fieldName !== "experience" && unchecked.push(fieldName);
          });

      updateUncheckedFields(unchecked);

      if (!unchecked.length) {
        if (EmailValidator.validate(formContent?.email as string)) {
          addToForm(formContent as ApplicationType, "basics");
          setCurrentSection(2);
        } else {
          alert('Please enter a valid email id')
        }
      } else {
        alert("Please fill up all the mandatory fields");
      }
    }, [formContent]);

    return (
      <>
        {Object.entries(formFields).map(([fieldName, fieldSpecs], i) => {
          const { label, inputType, fieldType, dropdownList, mandatory } =
            fieldSpecs;

          if (label === EXPERTIES || label === PICK_YOUR_SUBJECT) {
            return (
              <div key={fieldName} className="flex flex-col items-start gap-8">
                <span
                  className={`
                    w-fit
                    ${uncheckedFields?.includes(fieldName) && "text-error-red"}
                `}
                >
                  <Typography
                    isHeader={false}
                    isInputLabel={true}
                    additionalClasses="flex items-start justify-start gap-2"
                    animateEntrance={true}
                  >
                    {label}
                    <Typography
                      isHeader={false}
                      size="text-2xl"
                      additionalClasses="text-orange"
                    >
                      *
                    </Typography>
                  </Typography>
                </span>
                <div className="flex flex-col items-start gap-6">
                  {label === EXPERTIES
                    ? new Array(expertiesCount).fill("").map((item, i) => {
                        const currentKey = `${fieldName}-${i}`;

                        if (keysToRemove.includes(currentKey)) {
                          return;
                        }

                        return (
                          <BasicInput
                            key={currentKey}
                            mandatory={true}
                            inputType="text"
                            onValueChange={(value) =>
                              onChange(
                                fieldName as keyof ApplicationType,
                                value,
                                formContent as ApplicationType,
                                experties,
                                currentKey,
                                keysToRemove,
                                experties,
                                subjects
                              )
                            }
                            showDeleteOption={true}
                            onRemove={() => {
                              removeField(
                                currentKey,
                                keysToRemove,
                                experties as ObjectType,
                                subjects as ObjectType,
                                formContent as ApplicationType
                              )
                            }}
                          />
                        );
                      })
                    : new Array(subjectsCount).fill("").map((item, i) => {
                        const currentKey = `${fieldName}-${i}`;
                        if (keysToRemove.includes(currentKey)) {
                          return;
                        }

                        return (
                          <BasicInput
                            key={currentKey}
                            mandatory={true}
                            inputType="text"
                            onValueChange={(value) =>
                              onChange(
                                fieldName as keyof ApplicationType,
                                value,
                                formContent as ApplicationType,
                                subjects,
                                currentKey,
                                keysToRemove,
                                experties,
                                subjects
                              )
                            }
                            showDeleteOption={true}
                            onRemove={() => {
                              removeField(
                                currentKey,
                                keysToRemove,
                                experties as ObjectType,
                                subjects as ObjectType,
                                formContent as ApplicationType
                              )
                            }}
                          />
                        );
                      })}
                </div>
                <Typography
                  isHeader={false}
                  additionalClasses="cursor-pointer"
                  animateEntrance={true}
                  onClick={() => {
                    label === EXPERTIES
                      ? setExpertiesCount(expertiesCount + 1)
                      : setSubjectsCount(subjectsCount + 1);
                  }}
                >
                  <u>+ Add another</u>
                </Typography>
              </div>
            );
          }

          if (label !== EXPERIENCE) {
            return fieldType === BASIC ? (
              <span
                key={fieldName}
                className={`
                    w-fit
                    ${uncheckedFields?.includes(fieldName) && "text-error-red"}
                `}
              >
                <BasicInput
                  mandatory={mandatory}
                  inputType={inputType}
                  label={label}
                  onValueChange={(value) =>
                    onChange(
                      fieldName as keyof ApplicationType,
                      value,
                      formContent as ApplicationType
                    )
                  }
                />
              </span>
            ) : (
              dropdownList && (
                <span
                  key={i}
                  className={`
                    w-fit
                    ${
                      uncheckedFields?.includes(fieldName) &&
                      "text-error-red"
                    }
                `}
                >
                  <DropdownInput
                    mandatory={mandatory}
                    label={label}
                    dropdownList={dropdownList}
                    onChange={(item: [string, string]) => {
                      onChange(
                        fieldName as keyof ApplicationType,
                        item[1],
                        formContent as ApplicationType
                      );
                    }}
                  />
                </span>
              )
            );
          }
        })}
        <CTA primary={true} label="Next" onClick={handleSubmit} />
      </>
    );
  }

  function FormSlideExperience() {
    type ExperienceFormType = {
      [key: string]: ExperienceInfoType; // key will be currentKey i.e., `experience-${i}`
    };
    type UncheckedFieldsetType = {
      [key: string]: string[]; // key will be currentKey i.e., `experience-${i}`
    };

    const [experienceCount, setExperienceCount] = useState<number>(1);
    const { label, subFields } = formFields.experience;
    const [uncheckedFields, updateUncheckedFields] =
      useState<UncheckedFieldsetType>();
    const [keysToRemove, setKeysToRemove] = useState<string[]>([]);
    const [formContent, setFormContent] = useState<ExperienceFormType>();
    const allExperienceFields = Object.keys(formFields.experience.subFields);

    const removeField = useCallback(
      (key: string) => {
        if (experienceCount > 1) {
          setKeysToRemove([...keysToRemove, key]);
          // setExperienceCount(experienceCount - 1);
        } else {
          alert('You need to have at least one work experience')
        }
      },
      [keysToRemove, experienceCount]
    );

    const validateLastExperience = useCallback(() => {
      const lastKey = `experience-${experienceCount - 1}`;

      if (formContent) {
        const lastForm = {
          ...formContent[lastKey as string],
        };
        const unchecked: string[] = [];

        allExperienceFields.map((key) => {
          !(key in lastForm) && unchecked.push(key);
        });

        if (unchecked.length) {
          updateUncheckedFields({
            ...uncheckedFields,
            [lastKey]: [...unchecked],
          });
          alert(`Please fill up all the fields in experience: ${unchecked}`);
          return false;
        }

        const startDate = new Date(lastForm.startedAt);
        const endDate = new Date(lastForm.endedAt);
        if (startDate.getTime() >= endDate.getTime()) {
          unchecked.push("startedAt");
          unchecked.push("endedAt");
          updateUncheckedFields({
            ...uncheckedFields,
            [lastKey]: [...unchecked],
          });
          alert(`Joining date should precede ending date.`);
          return false;
        }

        if (!EmailValidator.validate(lastForm.referencePerson as string)) {
          alert('Please enter valid email id for reference person');
          return false;
        }
      } else {
        alert("Please add at least one experience");
        return false;
      }
      return true;
    }, [formContent, uncheckedFields]);

    const onChange = useCallback(
      (
        fieldName: keyof ExperienceInfoType,
        fieldValue: string,
        currentForm: ExperienceFormType,
        key: string
      ) => {
        // check if the value is empty
        if (fieldValue.replace(/\s/g, "").length) {
          // not empty value

          const updatedForm = currentForm
            ? {
                ...currentForm,
                [key]: {
                  ...currentForm[key],
                  [fieldName]: fieldValue,
                },
              }
            : {
                [key]: {
                  [fieldName]: fieldValue,
                },
              };

          if (uncheckedFields && key in uncheckedFields) {
            const unchecked = uncheckedFields[key];
            const fieldIndex = unchecked.indexOf(fieldName);
            fieldIndex >= 0 && unchecked.splice(fieldIndex, 1);

            const updatedUncheckedFields = {
              ...uncheckedFields,
              [key]: [...unchecked],
            };

            !updatedUncheckedFields[key].length &&
              delete updatedUncheckedFields[key];

            updateUncheckedFields(updatedUncheckedFields);
          }

          setFormContent(updatedForm as ExperienceFormType);
        } else {
          const updatedForm = {
            ...currentForm,
          };
          key in updatedForm && delete updatedForm[key][fieldName];

          uncheckedFields
            ? updateUncheckedFields({
                ...uncheckedFields,
                [key]: uncheckedFields[key]
                  ? [...uncheckedFields[key], fieldName]
                  : [fieldName],
              })
            : updateUncheckedFields({
                [key]: [fieldName],
              });

          setFormContent(updatedForm);
        }
      },
      [uncheckedFields]
    );

    const handleSubmit = useCallback(
      (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (uncheckedFields && Object.keys(uncheckedFields).length) {
          alert("Please fill up empty fields");
        }
        if (formContent) {
          const experienceList: ExperienceInfoType[] =
            Object.values(formContent);
          addToForm(experienceList, "experiences");
          e.preventDefault();
        }
      },
      [formContent, uncheckedFields]
    );

    return (
      <>
        <div
          className="flex items-center justify-center
            w-[20rem] md:w-[30rem]
            pb-4
            border-b border-b-white"
        >
          <Typography isHeader={false} size="text-2xl" animateEntrance={true}>
            {label}
          </Typography>
        </div>
        <>
          {new Array(experienceCount).fill("").map((item, i) => {
            const currentKey = `experience-${i}`;

            if (keysToRemove.includes(currentKey)) {
              return;
            }

            return (
              <div key={currentKey} className="flex flex-col gap-12">
                {Object.entries(subFields).map(([fieldName, fieldSpecs]) => {
                  const { label, inputType, mandatory } = fieldSpecs;
                  const isUnchecked =
                    uncheckedFields &&
                    currentKey in uncheckedFields &&
                    uncheckedFields[currentKey].includes(fieldName);

                  if (label === STARTED_AT) {
                    return (
                      <div
                        key={`${fieldName}-${i}`}
                        className="flex flex-col md:flex-row
                        items-start gap-12 md:gap-0
                        md:items-center md:justify-between
                        w-[20rem] md:w-[30rem]"
                      >
                        <span
                          key={`${label}-${i}`}
                          className={`
                              w-fit
                              ${isUnchecked && "text-error-red"}
                          `}
                        >
                          <BasicInput
                            mandatory={mandatory}
                            inputType={inputType}
                            label={label}
                            onValueChange={(value) => {
                              onChange(
                                fieldName as keyof ExperienceInfoType,
                                value,
                                formContent as ExperienceFormType,
                                currentKey
                              );
                            }}
                          />
                        </span>
                        <span
                          key={`${label}-${i + 1}`}
                          className={`
                              w-fit
                              ${isUnchecked && "text-error-red"}
                          `}
                        >
                          <BasicInput
                            mandatory={mandatory}
                            inputType={inputType}
                            label={ENDED_AT}
                            onValueChange={(value) => {
                              onChange(
                                "endedAt" as keyof ExperienceInfoType,
                                value,
                                formContent as ExperienceFormType,
                                currentKey
                              );
                            }}
                          />
                        </span>
                      </div>
                    );
                  }

                  if (label === ENDED_AT) {
                    return;
                  }

                  return (
                    <span
                      key={`${label}-${i}`}
                      className={`
                          w-fit
                          ${isUnchecked && "text-error-red"}
                      `}
                    >
                      <BasicInput
                        mandatory={mandatory}
                        inputType={inputType}
                        label={label}
                        secondaryLabel={
                          label === REFERENCE_PERSON
                            ? "Please enter work email"
                            : undefined
                        }
                        onValueChange={(value) => {
                          onChange(
                            fieldName as keyof ExperienceInfoType,
                            value,
                            formContent as ExperienceFormType,
                            currentKey
                          );
                        }}
                      />
                    </span>
                  );
                })}
                <div>
                  <div
                    className="flex justify-end items-start gap-2
                      w-[20rem] md:w-[30rem]
                      cursor-pointer"
                    onClick={() => removeField(currentKey)}
                  >
                    <TrashIcon />
                    <Typography isHeader={false} animateEntrance={true}>
                      Remove experience
                    </Typography>
                  </div>
                  <div
                    className="divider-div
                    w-[20rem] md:w-[30rem] 
                    h-[1px] bg-white"
                  />
                </div>
              </div>
            );
          })}
          <Typography
            isHeader={false}
            additionalClasses="cursor-pointer"
            animateEntrance={true}
            onClick={() => {
              const validated = validateLastExperience();
              validated && setExperienceCount(experienceCount + 1);
            }}
          >
            <u>+ {ADD_ANOTHER_EXPERIENCE}</u>
          </Typography>
        </>
        <CTA
          primary={true}
          label="Submit Application"
          canPlay={true}
          onClick={(e) => {
            const validated = validateLastExperience();
            validated && handleSubmit(e);
          }}
        />
      </>
    );
  }

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
          applicationType={INSTRUCTOR_APPLICATIONS}
        />
      ) : (
        <FormWrapper>
          <Typography isHeader={true} animateEntrance={true}>
            Instructor Application Form
          </Typography>
          <div
            className="sections-nav
              flex justify-center gap-[4rem]
              w-full"
          >
            <motion.span
              className={`
                  pb-[2px] 
                  cursor-pointer
              `}
              initial={{
                borderWidth: 0
              }}
              animate={
                currentSection === 1 ? {
                  borderBottomWidth: '1px',
                  transition: {
                    duration: 0.3
                  }
                } : {
                  borderBottomWidth: '0px'
                }
              }
            >
              <Typography isHeader={false} animateEntrance={true}>
                1
              </Typography>
            </motion.span>
            <motion.span
              className={`
                  pb-[2px] 
                  cursor-pointer
              `}
              initial={{
                borderWidth: 0
              }}
              animate={
                currentSection === 2 && {
                  borderBottomWidth: '1px',
                  transition: {
                    duration: 0.3
                  }
                }
              }
            >
              <Typography isHeader={false} animateEntrance={true}>
                2
              </Typography>
            </motion.span>
          </div>
          {currentSection === 1 ? <FormSlideBasic /> : <FormSlideExperience />}
        </FormWrapper>
      )}
    </div>
  );
}
