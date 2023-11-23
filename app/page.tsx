import Image from 'next/image';
import Hero from '@/components/hero';
import HeaderLinks from '@/components/utility-components/header-links';

export default function Home() {
  return (
    <div className='h-full text-center'>
        <Hero/>
    </div>
  )
}
