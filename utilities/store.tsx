'use client'
import React, { createContext, useReducer, Dispatch } from "react";
import { ACTIONS } from "./constants/actions";

// possible values for the 'route' state
export const HOME_ROUTES = {
    HERO: 'hero',
    COURSES_ADVERT: 'courses-advert',
    RESOURCES_ADVERT: 'resources-advert',
    INSTRUCTORS: 'instructors'
} as const

export type homeRoutesType = typeof HOME_ROUTES

// create the type for the initial state of the store
type initialStateType = {
    // route can be any of the values from the HOME_ROUTES (key, value) pairs
    route: homeRoutesType[keyof homeRoutesType];
    showBoth: boolean;
    isLast: boolean;
}

// create the initial state
const initialState: initialStateType = {
    route: HOME_ROUTES.HERO,
    showBoth: false,
    isLast: false
}

// create the type of the action parameter for reducer
type actionType = {
    type: (typeof ACTIONS)[keyof (typeof ACTIONS)];
    payload?: any
}

const {
    UPDATE_ROUTE,
    SET_SHOWBOTH,
    SET_ISLAST
} = ACTIONS;

// create the reducer
function reducer (state: initialStateType, action: actionType) {
    const { type, payload } = action;
    switch(type) {
        case UPDATE_ROUTE:
            return {
                ...state,
                route: payload
            }
        case SET_SHOWBOTH:
            return {
                ...state,
                showBoth: payload
            }
        case SET_ISLAST:
            return {
                ...state,
                isLast: payload
            }
        default:
            return state;
    }
}

// create the type for the context
type CourseContextType = {
    state: initialStateType,
    dispatch: Dispatch<actionType>
}

// create the context
export const CourseContext = createContext<CourseContextType>({
    state: initialState,
    dispatch: () => null
});

// define type of props for context provider
type CourseContextProviderProps = {
    children: React.ReactNode
}

export function CourseContextProvider ({
    children
}: CourseContextProviderProps) {
    const [ state, dispatch ] = useReducer(reducer, initialState);

    return (
        <CourseContext.Provider value={{state, dispatch}}>
            {children}
        </CourseContext.Provider>
    )
}