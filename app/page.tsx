import HomePage from '@/components/home/home-page';
import HeaderLinks from '@/components/utility-components/header-links';
import { CourseContextProvider } from '@/utilities/stores/courseContextStore';

export default function Home() {
  return (
    <div className='max-lg:flex max-lg:flex-col h-full text-center'>
        <HeaderLinks hideOnLarge={true} />
        <div className='max-md:mt-[6rem] md:max-lg:mt-[7rem] relative flex flex-col h-full lg:h-max'>
          <CourseContextProvider>
            <HomePage/>
          </CourseContextProvider>
        </div>
    </div>
  )
}
