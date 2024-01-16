'use client'
import React, { createContext, useReducer, Dispatch } from "react";
import { ACTIONS } from "../constants/actions";

type initialStateType = {
    userId: string | undefined;
    userFullName: string | undefined;
    userName: string | undefined;
    userEmail: string | undefined;
    userApplicationType?: string | undefined;
    userApplicationId?: string | undefined;
    userMenu: boolean;
}

const initialState: initialStateType = {
    userId: undefined,
    userFullName: undefined,
    userName: undefined,
    userEmail: undefined,
    userMenu: false
}

const { USER_ACTIONS } = ACTIONS;
const { 
    ADD_APPLICATION_DATA, 
    ADD_CURRENT_USER,
    REMOVE_USER,
    SET_USER_MENU_STATE
} = USER_ACTIONS;

export type actionType = {
    type: (typeof USER_ACTIONS)[keyof (typeof USER_ACTIONS)];
    payload?: any
}

function reducer (state: initialStateType, action: actionType) {
    const { type, payload } = action;

    switch(type) {   
        case SET_USER_MENU_STATE: {
            const finalState: initialStateType = {
                ...state,
                userMenu: payload
            }
            return finalState;
        }
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
        case REMOVE_USER: 
            {
                const finalState: initialStateType = {
                    ...state,
                    userId: undefined,
                    userFullName: undefined,
                    userName: undefined,
                    userEmail: undefined,
                    userApplicationType: undefined,
                    userApplicationId: undefined
                }
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