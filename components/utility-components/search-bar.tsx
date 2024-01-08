"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SearchIcon from "./svg-utilities/search-icon";
import Typography from "./typography";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [inputRestingWidth, setInputRestingWidth] = useState(0);

  useEffect(() => {
    if (inputRef.current) {
      setInputRestingWidth(inputRef.current.offsetWidth);
    }
  }, [inputRef.current]);

  const onInputFocus = useCallback(
    (focused: boolean) => {
      if (inputRef.current && screen.width > 1273) {
        gsap.to(inputRef.current, {
          width: focused ? "30rem" : `${inputRestingWidth}px`,
        });
      } else if (
        inputRef.current &&
        screen.width <= 1273 &&
        screen.width > 640
      ) {
        gsap.to(inputRef.current, {
          borderBottom: focused ? "1px solid white" : "0px",
        });
      }
      if (spanRef.current) {
        gsap.to(spanRef.current, {
          opacity: +!focused,
        });
      }
    },
    [inputRef.current, spanRef.current, inputRestingWidth]
  );

  return (
    <div className="relative z-0">
      <span
        ref={spanRef}
        className="absolute -z-[1]
            flex items-center gap-2
            h-full"
      >
        <SearchIcon />
        <Typography isHeader={false} additionalClasses="hidden xl:inline">
          Search courses
        </Typography>
      </span>
      <input
        ref={inputRef}
        type="text"
        className="
            w-full xl:w-[20rem] lg:min-w-0
            h-12
            px-[0.5rem] 
            max-sm:border-b max-sm:border-b-white
            xl:border-b xl:border-b-white
            font-sans 
            text-base md:text-lg lg:text-xl
            bg-transparent 
            focus-visible:outline-none"
        onFocus={() => onInputFocus(true)}
        onBlur={() => onInputFocus(false)}
      />
    </div>
  );
}
