'use client'
import React, { useContext } from 'react';
import { HeaderLogo } from '../logo';
import CommonHeaderSkeleton from './common-header-skeleton';
import ProfileMarker from '@/components/user/profile-marker';
import CTA from '../cta';
import SearchBar from '../search-bar';
import { UserContext } from '@/utilities/stores/userInfoStore';
import Menu from '../menu-utility/menu';
import constants from '@/utilities/constants/constants';

const { APPLY_NOW } = constants;

function LeftSection () {
  const { state } = useContext(UserContext);
  const { userApplicationId } = state;

  return (
    <>
      <HeaderLogo/>
      {
        (!userApplicationId && userApplicationId != undefined) &&
        <span
          className='cta-span max-lg:hidden'
        >
          <CTA label={APPLY_NOW} primary={true} />
        </span>
      }
      <span
        className='searchbar-span max-sm:hidden'
      >
        <SearchBar/>
      </span>
    </>
  )
}

function RightSection () {
  return (
    <>
      <ProfileMarker/>
      <Menu/>
    </>
  )
}

export default function CommonHeaderProtected() {
  return (
    <>
      <CommonHeaderSkeleton
        isProtected={true}
        leftSection={<LeftSection/>}
        rightSection={<RightSection/>}
      />
    </>
  )
}
