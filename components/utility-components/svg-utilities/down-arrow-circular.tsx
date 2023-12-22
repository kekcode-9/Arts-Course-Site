import React from 'react';

type DownArrowCircularProps = {
  onClick: (() => void) | undefined;
}

export default function DownArrowCircular({
  onClick
}: DownArrowCircularProps) {
  return (
    <svg className='cursor-pointer' onClick={onClick} width="80" height="112" viewBox="0 0 80 112" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className='hover:fill-black hover:stroke-white' cx="40" cy="72" r="40" fill="#772F06"/>
      <path className='pointer-events-none' d="M39.6464 72.3536C39.8417 72.5488 40.1583 72.5488 40.3536 72.3536L43.5355 69.1716C43.7308 68.9763 43.7308 68.6597 43.5355 68.4645C43.3403 68.2692 43.0237 68.2692 42.8284 68.4645L40 71.2929L37.1716 68.4645C36.9763 68.2692 36.6597 68.2692 36.4645 68.4645C36.2692 68.6597 36.2692 68.9763 36.4645 69.1716L39.6464 72.3536ZM39.5 2.18557e-08L39.5 72L40.5 72L40.5 -2.18557e-08L39.5 2.18557e-08Z" fill="white"/>
    </svg>

  )
}
