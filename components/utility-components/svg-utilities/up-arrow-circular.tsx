import React from 'react';

type UpArrowcircularProps = {
  onClick: (() => void) | undefined;
  rotate?: string;
}

export default function UpArrowcircular({
  onClick,
  rotate
}: UpArrowcircularProps) {
  return (
    <svg className={`${rotate} cursor-pointer`} onClick={onClick} width="40" height="96" viewBox="0 0 40 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse className='hover:fill-black hover:stroke-white' cx="20" cy="20.8696" rx="20" ry="20.8696" transform="matrix(1 0 0 -1 0 41.7391)" fill="#772F06"/>
        <path className='pointer-events-none' d="M19.6464 20.516C19.8417 20.3208 20.1583 20.3208 20.3536 20.516L23.5355 23.698C23.7308 23.8933 23.7308 24.2098 23.5355 24.4051C23.3403 24.6004 23.0237 24.6004 22.8284 24.4051L20 21.5767L17.1716 24.4051C16.9763 24.6004 16.6597 24.6004 16.4645 24.4051C16.2692 24.2098 16.2692 23.8933 16.4645 23.698L19.6464 20.516ZM19.5 96L19.5 20.8696L20.5 20.8696L20.5 96L19.5 96Z" fill="white"/>
    </svg>

  )
}
