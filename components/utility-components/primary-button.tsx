import React from 'react';

type PrimaryButtonProps = {
    label: string
}

export default function PrimaryButton({
    label
}: PrimaryButtonProps) {
  return (
    <button
        className='flex items-center justify-center 
        w-52 
        h-12 
        text-xl text-white 
        bg-burnt-orange lg:bg-neutral-dark-gray-bg'
    >
        {label}
    </button>
  )
}
