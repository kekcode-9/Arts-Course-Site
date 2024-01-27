'use client'
import React, { useContext } from 'react';
import DownArrowRect from './svg-utilities/down-arrow-rect';
import DownArrowTallRect from './svg-utilities/down-arrow-tall-rect';
import DownArrowCircular from './svg-utilities/down-arrow-circular';
import UpArrowcircular from './svg-utilities/up-arrow-circular';
import { CourseContext, HOME_ROUTES } from '@/utilities/stores/courseContextStore';
import { ACTIONS } from '@/utilities/constants/actions';

const ROUTES = Object.values(HOME_ROUTES);
const {
    UPDATE_ROUTE,
    SET_SHOWBOTH,
    SET_ISLAST
} = ACTIONS.HOME_ROUTE_ACTIONS;

export default function Arrows() {
    const { state, dispatch } = useContext(CourseContext);
    const { route } = state;
    const { showBoth, isLast } = state;

    const onArrowUp = () => {
        const prevIndex = ROUTES.indexOf(route) - 1;
        if (prevIndex >= 0) {
          dispatch({
            type: UPDATE_ROUTE,
            payload: ROUTES[prevIndex],
          });
          dispatch({
            type: SET_SHOWBOTH,
            payload: prevIndex !== 0,
          });
          dispatch({
            type: SET_ISLAST,
            payload: false,
          });
        }
    };
    
    const onArrowDown = () => {
    const nextIndex = ROUTES.indexOf(route) + 1;
    if (nextIndex <= ROUTES.length - 1) {
        dispatch({
        type: UPDATE_ROUTE,
        payload: ROUTES[nextIndex],
        });
        dispatch({
        type: SET_SHOWBOTH,
        payload: nextIndex < ROUTES.length - 1,
        });
        dispatch({
        type: SET_ISLAST,
        payload: nextIndex === ROUTES.length - 1,
        });
    }
    };

  return (
    <div 
        className='Arrows
        lg:absolute lg:bottom-[4.25rem]
        w-max lg:w-full lg:h-max'
    >
        <div 
          className='hidden 
          lg:flex lg:flex-col items-end gap-6 col-end-4 
          lg:pr-[4.5rem] xl:pr-[6.5rem]'
        >
            {showBoth ?
            <>
                <DownArrowRect up={true} onClick={onArrowUp} />
                <DownArrowRect up={false} onClick={onArrowDown} />
            </> : <DownArrowTallRect up={isLast} onClick={isLast ? onArrowUp : onArrowDown} />
            }
        </div>
        <div className='lg:hidden'>
            {
                showBoth ?
                <div
                    className='flex flex-col items-center'
                >
                    <UpArrowcircular onClick={onArrowUp} />
                    <DownArrowCircular onClick={onArrowDown} />
                </div> : (
                  isLast ? <UpArrowcircular onClick={onArrowUp} /> : <DownArrowCircular onClick={onArrowDown}/>
                )
            }
        </div>
    </div>
  )
}
