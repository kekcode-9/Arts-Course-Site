export default {
    ROOT: '/',
    COURSES: '/courses',
    INSTRUCTORS: '/instructors',
    STUDENT_APPLICATION: '/student-application',
    INSTRUCTOR_APPLICATION: '/instructor-application',
    ONLINE_INTERACTIVE_COURSES: '/online-interactive-courses',
    LOGIN_SIGNUP: '/login-signup',
    USER: (userName: string) => `/user/${userName}`,
    APPLICATION_STATUS: '/application-status',
    WORKSHOPS: '/workshops',
    BLOGS: '/blogs',
    MODELS: '/models',
    REFERENCES: '/references',
    HELP: '/help',
    FEEDBACK: '/feedback'
} as const