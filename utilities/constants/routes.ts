export default {
    ROOT: '/',
    COURSES: '/courses',
    STUDENT_APPLICATION: '/student-application',
    INSTRUCTOR_APPLICATION: '/instructor-application',
    SUBSCRIPTION_PLANS: '/online-subscription-courses',
    ONLINE_INTERACTIVE_COURSES: '/online-interactive-courses',
    LOGIN_SIGNUP: '/login-signup',
    USER: (userName: string) => `/user/${userName}`
} as const