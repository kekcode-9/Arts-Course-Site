export default {
    OR: 'or',
    PLUS: '+',
    LOGO: 'Esner Academy',
    // buttons
    APPLY_NOW: 'Apply now',
    EXPLORE_ALL_COURSES: 'Explore all courses',
    SEE_ALL_INSTRUCTORS: 'See all instructors',
    // profile menu items
    USER_MENU_ITEMS: {
        LOG_OUT: 'Log out',
        CHECK_APPLICATION_STATUS: 'Check application status',
        MY_COURSES: 'My courses',
        APPLY_AS_INSTRUCTOR: 'Apply as an instructor'
    },
    // menu items
    MENU_ITEMS: {
        COURSES: 'Course catalogue',
        THREED_MODELS: '3d models',
        REFERENCES: 'Reference images',
        WORKSHOPS: 'Workshops',
        BLOG: 'Blog',
        HELP: 'Help',
        FEEDBACK: 'Feedback & Suggestions'
    },
    // Hero page
    NAME_HEADER: (<>Esner <br/> Academy</>),
    HERO_OBJECTIVE: 'Kickstart your career as a professional artist with our structured curriculum, personal feedback and thousands of lessons curated with care.',
    LABEL_FOR_CLASSES: 'For in-person, interactive and personalized classes',
    ARE_YOU_INSTRUCTOR: 'Are you an instructor',
    // Header links
    LOG_IN: 'Log in',
    MENU: 'Explore',
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
        SCHOOL_NAME: 'Name of school', 
        DEGREE: 'Degree', 
        PROJECT: 'Project links', 
        COMPANY: 'Name of company/studio', 
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
        HIGHER: 'Doctorate or higher',
    },
    SKILL_LEVEL: {
        BEGINNER: 'Beginner',
        ART_SCHOOL: 'Attended / Attending Art School',
        SELF_LEARNER: 'Self Learner',
        PROFESSIONAL: 'Professional Artist'
    },
    // Instructor Application Form labels
    INSTRUCTOR_FORM_LABELS: {
        NAME: 'Full name',
        EMAIL: 'Email id',
        DOB: 'Date of Birth',
        EDUCATION: 'Highest level of education',
        SCHOOL_NAME: 'Last attended school',
        PORTFOLIO: 'Portfolio link', 
        EXPERTIES: 'Subject of experties',
        EXPERIENCE: 'Work experience',
        PICK_YOUR_SUBJECT: 'Pick the subjects you want to teach'
    },
    ADD_ANOTHER: 'Add another',
    // Instructor Experience fields
    INSTRUCTOR_EXPERIENCE_INFO: {
        STUDIO_NAME: 'Studio/Company',
        ROLE: 'Role',
        STARTED_AT: 'Joined at',
        ENDED_AT: 'Role ended at',
        DESCRIPTION: 'Describe some highlights of your work',
        REFERENCE_PERSON: 'Person of reference',
        ADD_ANOTHER: 'Add another experience'
    },
    COURSES_IN_PERSON: {
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
    ENTER_REGISTERED_EMAIL: "Enter your registered email",
    RESET_MAIL_SENT: "Password reset email has been sent to",
    RESET_PASSWORD: "Reset password", 
    SIGN_UP: 'Sign up',
    MEMBER_ALREADY: 'Are you a member already ?',
    CREATE_A_NEW_ACCOUNT: 'Create a new account',
    PASSWORD_REQUIREMENT: 'Password must have at least 8 characters, an uppercase, a lowercase, a numeric and a special character',
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
    },
    // course levels
    ADVANCE: 'Advance',
    INTERMEDIATE: 'Intermediate',
    BEGINNER: 'Beginner'
} as const;