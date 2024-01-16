'use client'
import React, { useCallback, useContext } from 'react';
import { CourseContext } from '@/utilities/stores/courseContextStore';
import { UserContext } from '@/utilities/stores/userInfoStore';
import BurgerMenu from '../svg-utilities/burger-menu';
import Typography from '../typography';
import { ACTIONS } from '../../../utilities/constants/actions';
import constants from '@/utilities/constants/constants';

const { MENU } = constants;

const { SET_USER_MENU_STATE } = ACTIONS.USER_ACTIONS;

const { SET_MENU_STATE } = ACTIONS.COMMON_ACTIONS;

export default function Menu() {
    const { state, dispatch } = useContext(CourseContext);
    const { explore } = state;

    const { dispatch: userContextDispatch } = useContext(UserContext);

    const onClick = useCallback(() => {
        if (!explore) {
            userContextDispatch({
                type: SET_USER_MENU_STATE,
                payload: false
            })
        }

        dispatch({
            type: SET_MENU_STATE,
            payload: !explore
        })
    }, [explore])

  return (
    <>
        <Typography 
            isHeader={false}
            additionalClasses='max-lg:hidden cursor-pointer font-sans'
            onClick={onClick}
        >
            {MENU}
        </Typography>
        <span
            className='burger-span lg:hidden cursor-pointer'
            onClick={onClick}
        >
            <BurgerMenu/>
        </span>
    </>
  )
}
