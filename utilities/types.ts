import constants from "./constants/constants";

const {
    DEGREE_LIST,
    SKILL_LEVEL,
    INSTRUCTOR_EXPERIENCE_INFO
} = constants;

// Types for student application form
/**
 * ArtSchoolInfoType is a type showing what information is expected to be provided by
 * an applicant who is attending or has attended an art school
 */
export type ArtSchoolInfoType = {
    skillLevel: typeof SKILL_LEVEL.ART_SCHOOL;
    schoolName: string;
    degree: string;
    projectLink: URL | null;
};

/**
 * ProfessionInfoType is a type showing what information is expected to be provided by
 * an applicant who is a professional artist
 */
export type ProfessionInfoType = {
skillLevel: typeof SKILL_LEVEL.PROFESSIONAL;
companyName: string;
currentRole: string;
yoe: string;
purpose: string;
};

type OtherSkillInfoType = {
skillLevel: typeof SKILL_LEVEL.BEGINNER | typeof SKILL_LEVEL.SELF_LEARNER;
};

/**
 * StudentApplicationFormType generics T and S explained:
 * T is an object where each key (string) acts as an identifier for the value (string) which is the course name.
 * S is an object where each key indicates (string) a course and the value (string[]) is an array of time slots 
 * for that course
 */
export type StudentApplicationFormType<T, S extends {[key: string]: string[]}> = {
    name: string;
    email: string;
    dob: string;
    education: (typeof DEGREE_LIST)[keyof typeof DEGREE_LIST];
    portfolio: URL | null;
    skill: ArtSchoolInfoType | ProfessionInfoType | OtherSkillInfoType;
    course: T[keyof T];
    slot: S[keyof S][number];
};

// Instructor application form type
export type ExperienceInfoType = {
    studio: string;
    role: string;
    startedAt: string;
    endedAt: string;
    description: string;
    referencePerson: string; // ask for work email
}

export type BasicInfoType = {
    name: string;
    email: string;
    dob: string;
    education: (typeof DEGREE_LIST)[keyof typeof DEGREE_LIST];
    schoolName: string;
    portfolio: URL | null;
    experties: string[];
    subjects: string[];
}

export type InstructorApplicationFormType = {
    name: string;
    email: string;
    dob: string;
    education: (typeof DEGREE_LIST)[keyof typeof DEGREE_LIST];
    schoolName: string;
    portfolio: URL | null;
    experties: string[];
    experience: ExperienceInfoType[];
    subjects: string[];
}


// Types for courses, references
export type CourseLevelTypes = 'Beginner' | 'Intermediate' | 'Advance';

export type CourseType = {
    title: string;
    from: string;
    category: string;
    level: CourseLevelTypes;
    videos: number;
    duration: string;
    rating: number;
    reviewsCount: number;
    thumbnail: string;
    blurDataURL?: string;
    link: string;
}

export type ModelType = {
    image: string;
    size: [string, string];
    blurDataURL?: string;
}

export type ReferenceType = {
    category: string;
    image: string;
    keywords: string[];
    size: [string, string];
    blurDataURL?: string;
}

export type FilterTypes = {
    rating?: string;
    level?: string;
    category?: string;
}

export type FilterArrayType = {
    field: string,
    operator: string,
    value: string | number | boolean
  }[]

// Type for instructors
export type InstructorType = {
    name: string;
    description: string;
    experience: string;
    experties: string;
    image: string;
    linkText: string;
    site: string;
}