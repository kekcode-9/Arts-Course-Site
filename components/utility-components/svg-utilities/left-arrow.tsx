import React from 'react';
import { motion } from 'framer-motion';

type LeftArrowProps = {
    animate: boolean;
    setAbsolute?: boolean;
    translationOffset?: number;
}

export default function LeftArrow({
    animate,
    setAbsolute,
    translationOffset
}: LeftArrowProps) {
  return (
    <motion.svg
        className={`
            ${setAbsolute && 'absolute'}
        `}
        width="49" 
        height="8" 
        viewBox="0 0 49 8" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        initial={{
            opacity: 0,
            translateX: `${translationOffset as number}`
        }}
        animate={animate && {
            opacity: 1,
            translateX: `${translationOffset as number + 60}px`,
            transition: {
                duration: 0.3
            }
        }}
        exit={{
            opacity: 0,
            translateX: `${translationOffset as number}`,
            transition: {
                duration: 0.3
            }
        }}
    >
        <path d="M48.3536 4.35355C48.5488 4.15829 48.5488 3.84171 48.3536 3.64645L45.1716 0.464466C44.9763 0.269204 44.6597 0.269204 44.4645 0.464466C44.2692 0.659728 44.2692 0.976311 44.4645 1.17157L47.2929 4L44.4645 6.82843C44.2692 7.02369 44.2692 7.34027 44.4645 7.53553C44.6597 7.7308 44.9763 7.7308 45.1716 7.53553L48.3536 4.35355ZM0 4.5H48V3.5H0V4.5Z" fill="#FFFFFF"/>
    </motion.svg>
  )
}
