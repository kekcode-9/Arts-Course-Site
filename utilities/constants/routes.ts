export default {
    ROOT: '/',
    COURSES: '/courses',
    STUDENT_APPLICATION: '/student-application',
    INSTRUCTOR_APPLICATION: '/instructor-application',
    SUBSCRIPTION_PLANS: '/subscription-plans',
    LOGIN_SIGNUP: '/login-signup',
    USER: (uid: string) => `/user/${uid}`
} as const