'use client'
import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import useDownloader from 'react-use-downloader';
import DownloadIcon from './svg-utilities/download-icon';
import CloseIcon from './svg-utilities/close-icon';

export default function ImageViewer({
    image,
    alt,
    size,
    onClose
}: {
    image: string,
    alt: string,
    size: [string, string],
    onClose: () => void
}) {
    const { download } = useDownloader();
    const [screenWidth, setScreenWidth] = useState<number>();

    useEffect(() => {
        const updateSize = () => {
            setScreenWidth(screen.width);
        }
        updateSize();
        window.addEventListener("resize", updateSize);

        return () => {
            window.removeEventListener("resize", updateSize);
        }
    }, [])

  return (
    <div
        className='absolute z-[100] top-0 left-0
        flex flex-col-reverse lg:flex-row 
        items-center justify-center
        w-screen h-screen
        bg-black bg-opacity-70 backdrop-blur-md'
    >
        <div
            style={{
                width: size[0],
                height: size[1]
            }}
            className={`
                relative
                max-h-[80%]
                border-2 border-white
                bg-black
            `}
        >
            <CldImage
                src={image}
                alt={alt}
                loading="lazy"
                fill
                className="object-contain"
            />
        </div>
        <div
            style={(screenWidth && screenWidth >= 920) ? {
                height: size[1],
                width: 'fit-content'
            }: {
                height: 'fit-content',
                width: size[0]
            }}
            className='
            max-lg:flex max-lg:justify-end
            max-w-full lg:w-fit 
            lg:max-h-[80%]'
        >
            <div 
                className='icons-div
                flex flex-row-reverse lg:flex-col gap-6 
                items-center
                pb-4 px-4 lg:pb-0'
            >
                <span
                    className='p-2 
                    w-fit h-fit
                    bg-black 
                    border-[1px] border-white 
                    rounded-full
                    cursor-pointer 
                    hover:scale-[1.03] transition-all'
                    onClick={onClose}
                >
                    <CloseIcon/>
                </span>
                <span
                    className='p-2 
                    w-fit h-fit
                    bg-black 
                    border-[1px] border-white 
                    rounded-full
                    cursor-pointer
                    hover:scale-[1.03] transition-all'
                    onClick={() => download(image, alt)}
                >
                    <DownloadIcon/>
                </span>
            </div>
        </div>
    </div>
  )
}
