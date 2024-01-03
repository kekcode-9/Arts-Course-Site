export default {
    OR: 'or',
    PLUS: '+',
    LOGO: 'Esner Academy',
    // buttons
    APPLY_NOW: 'Apply now',
    EXPLORE_ALL_COURSES: 'Explore all courses',
    SEE_ALL_INSTRUCTORS: 'See all instructors',
    // Hero page
    NAME_HEADER: (<>Esner <br/> Academy</>),
    HERO_OBJECTIVE: 'Kickstart your career as a professional artist with our structured curriculum, personal feedback and thousands of lessons curated with care.',
    LABEL_FOR_CLASSES: 'For in-person, interactive and personalized classes',
    ARE_YOU_INSTRUCTOR: 'Are you an instructor',
    // Header links
    LOG_IN: 'Log in',
    MENU: 'menu',
    // Courses advert
    WE_OFFER: 'At Esner Academy we offer',
    IN_PERSON_COURSES: 'In-person courses at our studio',
    INTERACTIVE_ONLINE: 'Interactive online classes and workshops',
    // resources advert
    HRS_OF_VIDEO: '2500+ hrs of videos',
    FIFTEENK_REFERENCES: '15000+ references',
    THREEHUNDRED_3D_MODELS: '300+ 3D models',
    // instructors
    MEET_INSTRUCTORS: 'Meet the instructors',
    INSTRUCTORS: [
        {
            image: '/bauman-instructor-1.jpg',
            name: 'Stephen Bauman',
            experties: 'Drawing, Painting',
            work: 'Former Director of Anatomy & Ecorche in Sweden and USA'
        },
        {
            image: '/bauman-instructor-1.jpg',
            name: 'Stephen Bauman',
            experties: 'Drawing, Painting',
            work: 'Former Director of Anatomy & Ecorche in Sweden and USA'
        },
        {
            image: '/bauman-instructor-1.jpg',
            name: 'Stephen Bauman',
            experties: 'Drawing, Painting',
            work: 'Former Director of Anatomy & Ecorche in Sweden and USA'
        },
        {
            image: '/bauman-instructor-1.jpg',
            name: 'Stephen Bauman',
            experties: 'Drawing, Painting',
            work: 'Former Director of Anatomy & Ecorche in Sweden and USA'
        }
    ],
    // student application form
    APPLY_FOR: "Apply for",
    IN_PERSON_CLASSES: "In Person Classes",
    ONLINE_INTERACTIVE_CLASSES: "Online interactive live classes",
    SUBSCRIBE_TO_ONLINE_COURSES: (<><u>Subscribe</u> to our pre-recorded online courses</>),
    APPLICATION_SUCCESSFUL: "Application submitted successfully !",
    LOG_IN_FOR_STATUS: "Log in to see your application status",
    BACK_TO_HOME: "Go back to home page",
    // Student application form labels
    STUDENT_FORM_LABELS: {
        NAME: 'Full name',
        EMAIL: 'Email id',
        DOB: 'Date of Birth',
        EDUCATION: 'Highest level of education',
        PORTFOLIO: 'Portfolio link',
        SKILL: 'Where are you at in your art journey ?',
        SCHOOL_NAME: 'Name of School',
        DEGREE: 'Degree',
        PROJECT: 'Project links',
        COMPANY: 'Name of company',
        ROLE: 'Current role',
        YOE: 'Years of experience',
        PURPOSE: 'How would this course help you in your career ?',
        COURSE: 'Select a course',
        SLOT: 'Pick a slot'
    },
    // Application form inputs
    DEGREE_LIST: {
        HIGH_SCHOOL: 'High School',
        VOCATIONAL: 'Vocational qualification',
        BACHELORS: 'Bachelors',
        MASTERS: 'Masters',
        HIGHER: 'Doctorate or higher'
    },
    SKILL_LEVEL: {
        BEGINNER: 'Beginner',
        ART_SCHOOL: 'Attended / Attending Art School',
        SELF_LEARNER: 'Self Learner',
        PROFESSIONAL: 'Professional Artist'
    },
    COURSES: {
        ANATOMY: {
            name: 'Human Anatomy for Artists with Safique Hussain',
            slots: [
                'Starting from January 16th, 2024 - Every Tue 9 am - 12 pm',
                'Starting from January 19th, 2024 - Every Fri 3 pm - 6 pm'
            ]
        },
        CHARCOAL: {
            name: 'Figure Drawing with Charcoal with Jeremiah Tomlinson',
            slots: [
                'Starting from January 16th, 2024 - Every Tue 12 pm - 3 pm',
                'Starting from January 24th, 2024 - Every Wed 8 am - 11 am'
            ]
        },
        OBSERVATIONAL_DRAWING: {
            name: 'Fundamentals of Observational Drawing Natalia Reed',
            slots: [
                'Starting from January 16th, 2024 - Every Tue 3 pm - 6 pm',
                'Starting from January 24th, 2024 - Every Wed 12 am - 3 pm'
            ]
        },
        OIL: {
            name: 'Still Life Oil Painting with Katja Wolski',
            slots: [
                'Starting from January 11th, 2024 - Every Thu 8 am - 11 am',
                'Starting from January 17th, 2024 - Every Wed 12 am - 3 pm'
            ]
        }
    },
    // login / signup
    DONT_HAVE_ACCOUNT: "Don't have an account ?",
    SIGN_UP: 'Sign up',
    MEMBER_ALREADY: 'Are you a member already ?',
    CREATE_A_NEW_ACCOUNT: 'Create a new account',
    LOGIN_FORM_LABELS: {
        EMAIL: 'Email',
        PASSWORD: 'Password',
        FORGOT_PASSWORD: 'Forgot password ?'
    },
    SIGN_UP_FORM_LABELS: {
        NAME: 'Full name',
        EMAIL: 'Email',
        CREATE_PASSWORD: 'Create password',
        REENTER_PASSWORD: 'Re-enter password'
    }
} as const;