import constants from "./constants/constants";

const {
    DEGREE_LIST,
    SKILL_LEVEL
} = constants;

/**
 * artSchoolInfoType is a type showing what information is expected to be provided by
 * an applicant who is attending or has attended an art school
 */
export type artSchoolInfoType = {
    skillLevel: typeof SKILL_LEVEL.ART_SCHOOL;
    schoolName: string;
    degree: string;
    projectLink: URL | null;
};

/**
 * professionInfoType is a type showing what information is expected to be provided by
 * an applicant who is a professional artist
 */
export type professionInfoType = {
skillLevel: typeof SKILL_LEVEL.PROFESSIONAL;
companyName: string;
currentRole: string;
yoe: string;
purpose: string;
};

type otherSkillInfoType = {
skillLevel: typeof SKILL_LEVEL.BEGINNER | typeof SKILL_LEVEL.SELF_LEARNER;
};

/**
 * studentApplicationFormType generics T and S explained:
 * T is an object where each key (string) acts as an identifier for the value (string) which is the course name.
 * S is an object where each key indicates (string) a course and the value (string[]) is an array of time slots 
 * for that course
 */
export type studentApplicationFormType<T, S extends {[key: string]: string[]}> = {
    name: string;
    email: string;
    dob: string;
    education: (typeof DEGREE_LIST)[keyof typeof DEGREE_LIST];
    portfolio: string | null;
    skill: artSchoolInfoType | professionInfoType | otherSkillInfoType;
    course: T[keyof T];
    slot: S[keyof S][number];
};