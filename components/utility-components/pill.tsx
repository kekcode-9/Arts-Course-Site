import React from 'react';
import Typography from './typography';

type PillProps = {
    label: string;
    active: boolean;
    onPillSelect: (label: string) => void;
}

export default function Pill({
    label,
    active,
    onPillSelect
}: PillProps) {
  return (
    <div
        className={`
            pill
            w-max min-w-max
            h-fit 
            px-4 py-2
            rounded-[100px]
            cursor-pointer
            border-2
            ${ 
                active ? 
                'border-black bg-white text-neutral-dark-gray-bg' : 
                'border-white bg-black text-white'
            }
        `}
        onClick={() => onPillSelect(label)}
    >
        <Typography isHeader={false}>
            {label}
        </Typography>
    </div>
  )
}
