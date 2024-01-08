'use client'
import React, { createContext, useReducer, Dispatch } from "react";
import { ACTIONS } from "../constants/actions";

type initialStateType = {
    userId: string,
    userFullName: string,
    userName: string,
    userEmail: string,
    userApplicationType?: string,
    userApplicationId?: string
}

const initialState: initialStateType = {
    userId: '',
    userFullName: '',
    userName: '',
    userEmail: '',
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
            {
                const finalState : initialStateType = {
                    ...state,
                    userId: payload.uid,
                    userFullName: payload.name,
                    userName: payload.userName,
                    userEmail: payload.userEmail
                };
                return finalState;
            }
        case ADD_APPLICATION_DATA:
            {
                const finalState: initialStateType = {
                    ...state,
                    userApplicationType: payload.applicationType,
                    userApplicationId: payload.applicationId
                };
                return finalState;
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