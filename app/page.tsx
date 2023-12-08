import HomePage from '@/components/home/home-page';
import HeaderLinks from '@/components/utility-components/header-links';
import getCourses from '@/firebase/firestore-access';

const data = getCourses()

export default function Home() {
  return (
    <div className='max-lg:flex max-lg:flex-col h-full text-center'>
        <HeaderLinks hideOnLarge={true} />
        <div className='max-md:mt-[6rem] md:max-lg:mt-[7rem] relative flex flex-col h-full lg:h-max'>
          <HomePage data={data}/>
        </div>
    </div>
  )
}
