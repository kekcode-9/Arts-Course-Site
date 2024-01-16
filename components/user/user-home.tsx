'use client'
import React, { useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getCurrentUser } from '@/lib/firebase/firebase-auth';
import routes from '@/utilities/constants/routes';
import { UserContext } from '@/utilities/stores/userInfoStore';
import constants from '@/utilities/constants/constants';
import Typography from '../utility-components/typography';
import dummyImage from '@/public/brent-cotton-luminist-art.webp';

const { ROOT } = routes;

const {
  COURSES,
  THREED_MODELS,
  REFERENCES,
  WORKSHOPS
} = constants.MENU_ITEMS;

type MiniCardProps = {
  image?: string;
  quickInfo?: React.ReactNode | string;
  cardTitle: string;
  secondaryInfo?: string;
}

function MiniCard ({
  image,
  quickInfo,
  cardTitle,
  secondaryInfo
}: MiniCardProps) {
  return (
    <div
      className='mini-card 
      flex flex-col flex-shrink-0
      items-start
      w-[15rem] h-[15rem] 
      rounded-md overflow-clip
      cursor-pointer
      bg-dirty-white text-neutral-dark-gray-bg 
      hover:scale-105 transition-all'
    >
      <div
        className='mini-card-image
        relative
        w-full h-[60%]'
      >
        <Image
          src={image || dummyImage}
          alt='dummyImage'
          fill
          className='object-cover'
        />
      </div>
      <div
        className='flex flex-col items-start gap-2
        p-4'
      >
        <div
          className='card-title'
        >
          <Typography isHeader={false} size='text-base'>
            {cardTitle}
          </Typography>
        </div>
        {
          secondaryInfo &&
          <div
            className='secondary-info
            text-gray-500 font-medium'
          >
            <Typography isHeader={false} size='text-base'>
              {secondaryInfo}
            </Typography>
          </div>
        }
        {
          quickInfo &&
          <div
            className='quick-info
            text-gray-500 font-medium'
          >
            {
              React.isValidElement(quickInfo) ?
              quickInfo :
              <Typography isHeader={false} size='text-base'>
                {quickInfo}
              </Typography>
            }
          </div>
        }
      </div>
    </div>
  )
}

type CardsRowProps = {
  rowHeader: string;
  cardCollection?: string;
}

function CardsRow ({
  rowHeader,
}: CardsRowProps) {
  return (
    <div
      className='content-overview
      flex flex-col items-start gap-[2rem] 
      w-full h-fit'
    >
      <span
        className='flex gap-2'
      >
        <Typography isHeader={false} size='text-2xl'>
          {rowHeader}
        </Typography>
        <Typography isHeader={false} additionalClasses='cursor-pointer'>
          ( <u>see all</u> )
        </Typography>
      </span>
      <div
        className='content-wrapper
        flex items-center gap-[2rem]
        w-full h-fit 
        p-[8px]
        overflow-x-scroll'
      >
        {
          new Array(14).fill('').map(() => {
            return (
              <MiniCard
                cardTitle='dummy card title'
                quickInfo='dummy quick info'
                secondaryInfo='dummy secondary info'
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default function Home() {
    const router = useRouter();
    const {state} = useContext(UserContext);

    useEffect(() => {
        getCurrentUser((user) => {
            if (!user) {
                router.push(ROOT);
            }
        })
    }, [])

  return (
    <div
      className='home-content-wrapper
      flex flex-col items-start gap-8 md:gap-[5rem]
      w-screen min-w-0 
      h-screen min-h-0
      px-8 md:px-16 pt-[10.5rem] pb-16
      overflow-x-hidden overflow-y-scroll'
    >
      <CardsRow rowHeader={COURSES}/>
      <CardsRow rowHeader={THREED_MODELS}/>
      <CardsRow rowHeader={REFERENCES}/>
      <CardsRow rowHeader={WORKSHOPS}/>
    </div>
  )
}
