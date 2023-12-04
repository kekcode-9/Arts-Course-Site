import React from 'react';

type DownArrowTallRectProps = {
  up: boolean;
  onClick: (() => void) | undefined;
}

export default function DownArrowTallRect({
  up,
  onClick
}: DownArrowTallRectProps) {
  return (
    <svg className='cursor-pointer' onClick={onClick} width="40" height="138" viewBox="0 0 40 138" transform={up ? 'rotate(-180)' : 'rotate(0)'} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="138" fill="#772F06"/>
        <path d="M19.2929 113.707C19.6834 114.098 20.3166 114.098 20.7071 113.707L27.0711 107.343C27.4616 106.953 27.4616 106.319 27.0711 105.929C26.6805 105.538 26.0474 105.538 25.6569 105.929L20 111.586L14.3431 105.929C13.9526 105.538 13.3195 105.538 12.9289 105.929C12.5384 106.319 12.5384 106.953 12.9289 107.343L19.2929 113.707ZM19 25L19 113L21 113L21 25L19 25Z" fill="white"/>
    </svg>
  )
}
