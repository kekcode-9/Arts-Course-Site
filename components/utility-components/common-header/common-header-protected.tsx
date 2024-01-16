'use client'
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { HeaderLogo } from '../logo';
import CommonHeaderSkeleton from './common-header-skeleton';
import ProfileMarker from '@/components/user/profile-marker';
import CTA from '../cta';
import SearchBar from '../search-bar';
import { UserContext } from '@/utilities/stores/userInfoStore';
import Menu from '../menu-utility/menu';
import constants from '@/utilities/constants/constants';
import UserMenu from '@/components/user/user-menu';

const { APPLY_NOW } = constants;

function LeftSection () {
  const { state } = useContext(UserContext);
  const { userApplicationId, userId } = state;

  return (
    <>
      <HeaderLogo/>
      {
        userId &&
        <>
          {
            !userApplicationId &&
            <span
              className='cta-span max-lg:hidden'
            >
              <CTA 
                label={APPLY_NOW} 
                primary={true} 
                headerButton={true}
              />
            </span>
          }
          <motion.span
            className='searchbar-span max-sm:hidden'
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
          >
            <SearchBar/>
          </motion.span>
        </>
      }
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
      <UserMenu/>
    </>
  )
}
