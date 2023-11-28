import Image from 'next/image';
import Hero from '@/components/home/hero';
import CoursesAdvert from '@/components/home/courses-advert';
import HeaderLinks from '@/components/utility-components/header-links';

export default function Home() {
  return (
    <div className='max-lg:flex max-lg:flex-col h-full text-center'>
        <HeaderLinks hideOnLarge={true} />
        <div className='max-lg:mt-[6rem] relative flex flex-col h-full lg:h-max'>
          <Hero/>
          <CoursesAdvert/>
        </div>
    </div>
  )
}
