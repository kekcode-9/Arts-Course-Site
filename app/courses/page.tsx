import React from 'react';
import Cowboys from '@/public/robert-kelley-cowboys.webp';
import Image from 'next/image';
import StarIcon from '@/components/utility-components/svg-utilities/star-icon';
import Typography from '@/components/utility-components/typography';

function CourseCard () {
  return (
    <div 
      className='course-card
        w-[20.5rem] h-[19.5rem] 
        rounded-md overflow-clip
        bg-white'
    >
      <div
        className='card-image
        relative
        w-full h-1/2'
      >
        <Image
          src={Cowboys}
          alt='Dummy image'
          loading='lazy'
          placeholder='blur'
          fill
          className='object-cover'
        />
      </div>
      <div
        className='card-body
        flex flex-col items-start gap-2
        w-full h-1/2 
        p-4
        font-sans
        text-neutral-dark-gray-bg 
        bg-[linear-gradient(109deg,_#FFF_15.49%,_#FAF4EE_98.28%)]'
      >
        <span 
          className='card-header w-full'
        >
          <Typography 
            isHeader={false}
            size='text-base'
            additionalClasses='w-full 
            text-ellipsis overflow-hidden whitespace-nowrap'
          >
            <b>Morpho skeleton and bone reference points</b>
          </Typography>
        </span>
        <Typography 
          isHeader={false} 
          size='text-base' 
          additionalClasses='text-gray-500'
        >
          <b>Taught by:</b> John Doe
        </Typography>
        <div
          className='flex gap-2 text-gray-500'
        >
          <Typography isHeader={false} size='text-base'>
            <b>Level:</b> Beginner
          </Typography>
          <Typography isHeader={false} size='text-base'>
            <b>Duration:</b> 17 Hrs.
          </Typography>
        </div>
        <div
          className='rating-section text-gray-500
          flex gap-1'
        >
          <StarIcon/>
          <Typography isHeader={false} size='text-base'>
            <b>4.6</b>
          </Typography>
          <Typography isHeader={false} size='text-base'>
            (833 reviews)
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default function Courses() {
  return (
    <div
      className='flex flex-wrap items-center justify-center gap-6 lg:gap-8
      lg:w-[70%] h-fit'
    >
      {
        new Array(6).fill("").map((item, i) => {
          return (
            <CourseCard/>
          )
        })
      }
    </div>
  )
}
