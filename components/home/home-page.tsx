'use client'
import React, { useContext, useEffect } from 'react';
import { HeroMobileDevices } from './hero';
import LeftColumn from '../utility-components/left-column';
import RightColumn from '../utility-components/right-column';
import MiddleColumn from '../utility-components/middle-column';
import MobileContent from '../utility-components/mobile-content';
import { 
    CourseContextProvider, 
    CourseContext, 
    HOME_ROUTES
} from '@/utilities/store';

const { HERO } = HOME_ROUTES

function AssembledContentLarge() {
    return (
        <section
            className='relative
            hidden lg:flex
            w-full h-screen
            overflow-clip'
        >
            <LeftColumn/>
            <MiddleColumn/>
            <RightColumn/>
        </section>
    )
}

type mainProps = {
    d: any;
}

function Main ({ d }: mainProps) {
    const { state, dispatch } = useContext(CourseContext);
    const { route, data } = state;
    useEffect(() => {
        d.then((dt: any) => {
            dispatch({
                type: 'TEST',
                payload: dt
            })
        })
    }, [])
    return (
        <>
            {
                // route === HERO ? <HeroMobileDevices/> : <MobileContent/>
            }
            {/*<AssembledContentLarge/>*/}
            {
                data && <>{JSON.stringify(data)}</>
            }
        </>
    )
}

type HomeProps = {
    data: any;
}

export default function HomePage({
    data
}: HomeProps) {
    useEffect(() => {
        // data.then((d: any) => {alert(JSON.stringify(d))}).catch((e: any) => alert(JSON.stringify(e)))
    }, [])
  return (
    <CourseContextProvider>
        <Main d={data}/>
    </CourseContextProvider>
  )
}
