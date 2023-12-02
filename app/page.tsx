import Image from 'next/image';
import Hero from '@/components/home/hero';
import CoursesAdvert from '@/components/home/courses-advert';
import ResourcesAdvert from '@/components/home/resources-advert';
import Instructors from '@/components/home/instructors';
import HeaderLinks from '@/components/utility-components/header-links';

export default function Home() {
  return (
    <div className='max-lg:flex max-lg:flex-col h-full text-center'>
        <HeaderLinks hideOnLarge={true} />
        <div className='max-md:mt-[6rem] md:max-lg:mt-[7rem] relative flex flex-col h-full lg:h-max'>
          <Hero/>
          {/*<CoursesAdvert/>*/}
          {/*<ResourcesAdvert/>*/}
          <Instructors/>
        </div>
    </div>
  )
}
