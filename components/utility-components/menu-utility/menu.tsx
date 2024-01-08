'use client'
import React, { useCallback, useContext } from 'react';
import { CourseContext } from '@/utilities/stores/courseContextStore';
import BurgerMenu from '../svg-utilities/burger-menu';
import Typography from '../typography';
import { ACTIONS } from '../../../utilities/constants/actions';
import constants from '@/utilities/constants/constants';

const { MENU } = constants;

const { SET_MENU_STATE } = ACTIONS.COMMON_ACTIONS;

export default function Menu() {
    const { state, dispatch } = useContext(CourseContext);
    const { menuOn } = state;

    const onClick = useCallback(() => {
        dispatch({
            type: SET_MENU_STATE,
            payload: !menuOn
        })
    }, [menuOn])

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
