import React from 'react';

type StarIconProps = {
  outline?: boolean;
  fill?: string;
}

export default function StarIcon({
  outline,
  fill
}: StarIconProps) {
  return (
    <svg width="20" height="19" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_354_242)">
        <path stroke={outline ? 'white' : undefined} fillRule="evenodd" clipRule="evenodd" d="M12.25 0.474857C11.9122 0.475006 11.5814 0.57112 11.2961 0.752005C11.0108 0.93289 10.7828 1.1911 10.6386 1.49657L7.91629 6.99086C7.90909 7.00382 7.90223 7.01697 7.89571 7.03029C7.88252 7.03226 7.86937 7.03454 7.85629 7.03714L1.86143 7.92514C1.52145 7.95815 1.1981 8.08813 0.929863 8.29961C0.661625 8.5111 0.459787 8.79519 0.348363 9.11808C0.236938 9.44098 0.220618 9.78909 0.301343 10.121C0.382068 10.4529 0.55644 10.7546 0.803714 10.9903L5.19229 15.2229L5.20257 15.2314C5.20877 15.2373 5.21343 15.2445 5.21612 15.2526C5.21882 15.2607 5.21946 15.2693 5.218 15.2777V15.2846L4.17229 21.4011V21.4029C4.11489 21.7345 4.15161 22.0756 4.27829 22.3874C4.40498 22.6992 4.61654 22.9692 4.88897 23.1668C5.16139 23.3645 5.48377 23.4818 5.8195 23.5054C6.15523 23.529 6.49086 23.4581 6.78829 23.3006L12.1883 20.4463C12.2078 20.4378 12.2288 20.4334 12.25 20.4334C12.2712 20.4334 12.2922 20.4378 12.3117 20.4463L17.7117 23.2989C18.009 23.4574 18.3448 23.5292 18.6809 23.5062C19.0171 23.4831 19.3399 23.3661 19.6128 23.1685C19.8857 22.9709 20.0975 22.7006 20.2242 22.3884C20.3509 22.0762 20.3874 21.7347 20.3294 21.4029L19.2837 15.2829V15.2777C19.2803 15.2709 19.282 15.2606 19.2837 15.2537C19.2863 15.2452 19.291 15.2375 19.2974 15.2314L19.3077 15.2229L23.6946 10.9886C23.9413 10.7528 24.1152 10.4512 24.1956 10.1196C24.276 9.78795 24.2596 9.4402 24.1482 9.11764C24.0368 8.79507 23.8352 8.51125 23.5673 8.29986C23.2994 8.08848 22.9765 7.95843 22.6369 7.92514L16.6437 7.03714C16.6306 7.03454 16.6175 7.03226 16.6043 7.03029C16.5978 7.01697 16.5909 7.00382 16.5837 6.99086L13.8614 1.49657C13.7172 1.1911 13.4892 0.93289 13.2039 0.752005C12.9186 0.57112 12.5878 0.475006 12.25 0.474857Z" fill={outline ? '' : (fill || '#F8B91A')}/>
    </g>
    <defs>
        <clipPath id="clip0_354_242">
        <rect width="24" height="24" fill="#F8B91A" transform="translate(0.25)"/>
        </clipPath>
    </defs>
    </svg>
  )
}
