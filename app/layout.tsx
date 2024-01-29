import type { Metadata } from 'next';
import Head from 'next/head';
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
    description: 'A Next.js v13 & Typescript project. The responsive website was designed with Figma. Animations are performed with GSAP and Framer motion. Firebase is used for user authentication and cloud firestore for database. Images are hosted by Cloudinary.',
    url: 'https://esneracademy.vercel.app/',
    siteName: 'Esner Academy',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-full'>
      <Head>
        <meta name="image" property="og:image" content="https://res.cloudinary.com/dxvx3y6ch/image/upload/v1706552119/og_image_esner_academy.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta name="author" content="Rupamita Sarkar" />
        <meta property='og:type' content="website" />
      </Head>
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
