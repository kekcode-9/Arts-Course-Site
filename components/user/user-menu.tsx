import React, { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Typography from '../utility-components/typography';
import constants from '@/utilities/constants/constants';
import routes from '@/utilities/constants/routes';
import { UserContext } from '@/utilities/stores/userInfoStore';
import CTA from '../utility-components/cta';

const { ROOT } = routes;

const { 
    LOG_OUT, 
    CHECK_APPLICATION_STATUS, 
    MY_COURSES 
} = constants.USER_MENU_ITEMS;

const { APPLY_NOW } = constants;

export default function UserMenu() {
    const menuRef = useRef<HTMLDivElement>(null);
    const { state } = useContext(UserContext);
    const { userMenu } = state;

    useEffect(() => {
        if (menuRef.current) {
            if (!userMenu) {
                gsap.to(menuRef.current, {
                    scaleY: 0,
                    transformOrigin: "top"
                  });
            } else {
                gsap.to(menuRef.current, {
                    scaleY: 1,
                    transformOrigin: "top"
                  });
            }
        }
    }, [userMenu, menuRef.current])

  return (
    <div
        ref={menuRef}
        className='absolute z-10 right-0
        flex flex-col gap-12
        w-fit h-fit
        p-8 md:px-16
        bg-black
        scale-y-0'
    >
        <span
            className="w-fit
            hover:border-b-[1px] hover:border-b-white 
            transition-all
            cursor-pointer"
        >
            <Typography isHeader={false}>
                {CHECK_APPLICATION_STATUS}
            </Typography>
        </span>
        <span
            className="w-fit
            hover:border-b-[1px] hover:border-b-white 
            transition-all
            cursor-pointer"
        >
            <Typography isHeader={false}>
                {LOG_OUT}
            </Typography>
        </span>
        <span
            className='lg:hidden w-fit h-fit'
        >
            <CTA label={APPLY_NOW} primary={true} />
        </span>
    </div>
  )
}
