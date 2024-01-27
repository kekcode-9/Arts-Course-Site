"use client";
import React, { createContext, useReducer, Dispatch } from "react";
import { FilterTypes } from "../types";
import { ACTIONS } from "../constants/actions";

// possible values for the 'route' state
export const HOME_ROUTES = {
  HERO: "hero",
  COURSES_ADVERT: "courses-advert",
  RESOURCES_ADVERT: "resources-advert",
  INSTRUCTORS: "instructors",
} as const;

export type homeRoutesType = (typeof HOME_ROUTES)[keyof typeof HOME_ROUTES];

// create the type for the initial state of the store
type initialStateType = {
  // route can be any of the values from the HOME_ROUTES (key, value) pairs
  isSplashScreen: boolean;
  route: homeRoutesType;
  lastRoute: homeRoutesType;
  showBoth: boolean;
  isLast: boolean;
  explore: boolean;
  filters?: FilterTypes;
  searchQuery?: string;
};

// create the initial state
const initialState: initialStateType = {
  isSplashScreen: true,
  lastRoute: HOME_ROUTES.HERO,
  route: HOME_ROUTES.HERO,
  showBoth: false,
  isLast: false,
  explore: false,
};

const { HOME_ROUTE_ACTIONS, COMMON_ACTIONS } = ACTIONS;

// create the type of the action parameter for reducer
type actionType = {
  type:
    | (typeof HOME_ROUTE_ACTIONS)[keyof typeof HOME_ROUTE_ACTIONS]
    | (typeof COMMON_ACTIONS)[keyof typeof COMMON_ACTIONS];
  payload?: any;
};

const {
  UPDATE_ROUTE,
  SET_SHOWBOTH,
  SET_ISLAST,
  SET_UNSET_SPLASH_SCREEN,
  SET_HOME_TO_ROOT,
  RESET_ROUTE,
} = HOME_ROUTE_ACTIONS;

const { SET_MENU_STATE, SET_SEARCH_QUERY, UPDATE_FILTERS } = COMMON_ACTIONS;

// create the reducer
function reducer(state: initialStateType, action: actionType) {
  const { type, payload } = action;
  switch (type) {
    case SET_MENU_STATE: {
      const finalState: initialStateType = {
        ...state,
        explore: payload,
      };
      return finalState;
    }
    case SET_UNSET_SPLASH_SCREEN: {
      const finalState: initialStateType = {
        ...state,
        isSplashScreen: payload,
      };
      return finalState;
    }
    case UPDATE_ROUTE: {
      const updated: initialStateType = {
        ...state,
        lastRoute: state.route,
      };
      const finalState: initialStateType = {
        ...updated,
        route: payload,
      };
      return finalState;
    }
    case RESET_ROUTE: {
      const finalState: initialStateType = {
        ...state,
        lastRoute: HOME_ROUTES.HERO,
        route: HOME_ROUTES.HERO,
        showBoth: false,
        isLast: false
      }
      return finalState;
    }
    case SET_SHOWBOTH: {
      const finalState: initialStateType = {
        ...state,
        showBoth: payload,
      };
      return finalState;
    }
    case SET_ISLAST: {
      const finalState: initialStateType = {
        ...state,
        isLast: payload,
      };
      return finalState;
    }
    case SET_HOME_TO_ROOT: {
      const updated: initialStateType = {
        ...state,
        lastRoute: state.route,
      };
      const finalState: initialStateType = {
        ...updated,
        route: HOME_ROUTES.HERO,
        showBoth: false,
        isLast: false,
      };
      return finalState;
    }
    case UPDATE_FILTERS: {
      const finalState: initialStateType = {
        ...state,
        filters: {
          ...payload,
        },
      };
      return finalState;
    }
    case SET_SEARCH_QUERY: {
      const finalState: initialStateType = {
        ...state,
        searchQuery: payload,
      };
      return finalState;
    }
    default:
      return state;
  }
}

// create the type for the context
type CourseContextType = {
  state: initialStateType;
  dispatch: Dispatch<actionType>;
};

// create the context
export const CourseContext = createContext<CourseContextType>({
  state: initialState,
  dispatch: () => null,
});

// define type of props for context provider
type CourseContextProviderProps = {
  children: React.ReactNode;
};

export function CourseContextProvider({
  children,
}: CourseContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CourseContext.Provider value={{ state, dispatch }}>
      {children}
    </CourseContext.Provider>
  );
}
