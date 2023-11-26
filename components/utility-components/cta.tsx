import React from 'react';

type CTAProps = {
    label: string;
    primary: boolean;
}

export default function CTA({
    label,
    primary
}: CTAProps) {
  return (
    <button
        className={`flex items-center justify-center 
        w-52 
        h-12 
        text-xl ${primary ? 'text-white' : 'text-neutral-dark-gray-bg'} 
        ${primary ? 'bg-burnt-orange lg:bg-neutral-dark-gray-bg' : 'bg-white'}`}
    >
        {label}
    </button>
  )
}
