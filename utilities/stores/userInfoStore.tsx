'use client'
import React, { createContext, useReducer, Dispatch } from "react";
import { ACTIONS } from "../constants/actions";

type initialStateType = {
    userId: string,
    userName: string,
    userEmail: string,
    userApplicationType?: string,
    userApplicationId?: string
}

const initialState: initialStateType = {
    userId: '',
    userName: '',
    userEmail: ''
}

const { USER_ACTIONS } = ACTIONS;
const { ADD_APPLICATION_DATA, ADD_CURRENT_USER } = USER_ACTIONS;

type actionType = {
    type: (typeof USER_ACTIONS)[keyof (typeof USER_ACTIONS)];
    payload?: any
}

function reducer (state: initialStateType, action: actionType) {
    const { type, payload } = action;

    switch(type) {
        case ADD_CURRENT_USER:
            return {
                ...state,
                userId: payload.userId,
                userName: payload.userName,
                userEmail: payload.userEmail
            }
        case ADD_APPLICATION_DATA:
            return {
                ...state,
                userApplicationType: payload.applicationType,
                userApplicationId: payload.applicationId
            }
        default:
            return state;
    }
}

type UserContextType = {
    state: initialStateType,
    dispatch: Dispatch<actionType>
}

export const UserContext = createContext<UserContextType>({
    state: initialState,
    dispatch: () => null
})

type UserContextProviderProps = {
    children: React.ReactNode
}

export function UserContextProvider({
    children
}: UserContextProviderProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}