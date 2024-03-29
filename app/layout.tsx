import type { Metadata } from 'next';
import { Vollkorn } from 'next/font/google';
import { UserContextProvider } from '@/utilities/stores/userInfoStore';
import { CourseContextProvider } from '@/utilities/stores/courseContextStore';
import CommonHeaderWrapper from '@/components/utility-components/common-header/common-header-wrapper';
import './globals.css';

const vollkorn = Vollkorn({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Esner Academy',
  description: 'Academy of traditional and digital Arts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <body className={`h-full
        ${vollkorn.className} text-white 
        bg-neutral-dark-gray-bg`}
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
