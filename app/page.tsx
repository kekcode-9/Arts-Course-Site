import HomePage from '@/components/home/home-page';
import HeaderLinks from '@/components/utility-components/header-links';

export default function Home() {
  return (
    <div className='max-lg:flex max-lg:flex-col 
      h-full text-center'
    >
      <HeaderLinks hideOnLarge={true} />
      <HomePage/>
    </div>
  )
}
