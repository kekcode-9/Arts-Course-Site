'use client'
import React, { useContext } from 'react';
import { UserContext } from '@/utilities/stores/userInfoStore';
import Typography from '../utility-components/typography';

export default function ProfileMarker() {
    const { state } = useContext(UserContext);
    const { userFullName } = state;

    const getNameInitials = () => {
        const nameArr = userFullName.split(' ');
        let initials: string;
        if (nameArr.length >= 2) {
            initials = nameArr[0][0] + nameArr[1][0];
        } else {
            initials = nameArr[0][0];
        }
        return initials?.toUpperCase();
    }

  return (
    <div
        className='profile-marker
        flex items-center justify-center
        w-[2.75rem] sm:w-[3.75rem] 
        h-[2.75rem] sm:h-[3.75rem] 
        rounded-[100%] 
        border-2 border-white
        bg-black'
    >
        <Typography isHeader={false}>
            {userFullName && getNameInitials()}
        </Typography>
    </div>
  )
}
