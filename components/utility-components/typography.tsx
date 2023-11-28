import React from 'react';

type TypographyProps = {
    children: React.ReactNode,
    additionalClasses?: string,
    isHeader: boolean,
    size?: string
}

export default function Typography({
    children,
    additionalClasses,
    isHeader,
    size
}: TypographyProps) {
  return !isHeader ? (
    <p
        className={
            `${size || 'text-base md:text-lg lg:text-xl'}
            ${additionalClasses}`
        }
    >
        {children}
    </p>
  ) : (
    <h1
        className={
            `${size || 'text-[2rem] md:text-[2.5rem] font-medium'}
            ${additionalClasses}`
        }
    >
        {children}
    </h1>
  )
}
