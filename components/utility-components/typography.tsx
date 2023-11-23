import React from 'react';

type TypographyProps = {
    children: React.ReactNode,
    additionalClasses?: string,
    isHeader: boolean
}

export default function Typography({
    children,
    additionalClasses,
    isHeader
}: TypographyProps) {
  return !isHeader ? (
    <p
        className={
            `text-base md:text-lg lg:text-xl
            ${additionalClasses}`
        }
    >
        {children}
    </p>
  ) : (
    <h1
        className={
            `text-[2rem] md:text-[2.5rem] font-medium
            ${additionalClasses}`
        }
    >
        {children}
    </h1>
  )
}
