import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { UserContextProvider } from '@/utilities/stores/userInfoStore';
import { CourseContextProvider } from '@/utilities/stores/courseContextStore';
import CommonHeaderWrapper from '@/components/utility-components/common-header/common-header-wrapper';
import './globals.css';

const raleway = Raleway({ subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Esner Academy for Traditional & Digital Arts',
  description: 'A Next.js 13 + Typescript project',
  openGraph: {
    title: 'Esner Academy for Traditional & Digital Arts',
    description: 'A Next.js v13 & Typescript project, designed in Figma.',
    url: 'https://esneracademy.vercel.app/',
    siteName: 'Esner Academy',
    images: [
      {
        url: 'https://res.cloudinary.com/dxvx3y6ch/image/upload/f_auto,q_auto/egxirxjmmyk3qsjuikig',
        width: 2560,
        height: 1664
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <body className={`h-full
        ${raleway.className} text-white 
        bg-neutral-dark-gray-bg cursor-default
      `}
      >
        <UserContextProvider>
          <CourseContextProvider>
            <CommonHeaderWrapper/>
            {children}
          </CourseContextProvider>
        </UserContextProvider>
      </body>
    </html>
  )
}
