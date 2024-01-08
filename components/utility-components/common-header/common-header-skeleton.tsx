"use client";
import React, { useRef, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SearchBar from "../search-bar";
import MenuContent from "../menu-utility/menu-content";

type CommonHeaderSkeletonProps = {
  leftSection: React.ReactNode;
  rightSection: React.ReactNode;
  isProtected: boolean;
};

export default function CommonHeaderSkeleton({
  leftSection,
  rightSection,
  isProtected,
}: CommonHeaderSkeletonProps) {
  const linksRef = useRef<HTMLDivElement>(null);
  const [linksWidth, setLinksWidth] = useState(0);
  const pathName = usePathname();

  useEffect(() => {
    if (linksRef.current) {
      setLinksWidth(linksRef.current.offsetWidth / 16 + 3);
    }
  }, [linksRef.current]);

    if (
        (isProtected && !pathName.includes("/user")) ||
        (!isProtected && pathName.includes("/user"))
    ) {
        return null
    }

    if (
        (isProtected && pathName.includes("/user")) ||
        (!isProtected && pathName === "/courses")
    ) {
        return (
            <div
              className="header-wrapper"
            >
              <div
                className={`
                        flex items-center
                        w-screen 
                        h-[4.5rem] sm:h-[6.5rem]
                        pl-8 md:pl-16 pr-[${linksWidth}rem]
                        bg-black
                    `}
              >
                <div
                  className="flex items-center gap-12 flex-shrink
                        w-full h-full"
                >
                  {leftSection}
                </div>
                <div
                  ref={linksRef}
                  className="
                        flex items-center justify-end gap-6 md:gap-12
                        w-max
                        h-full
                        px-8 md:px-16
                        bg-burnt-orange"
                >
                  {rightSection}
                </div>
              </div>
              <MenuContent/>
              <div
                className="search-wrapper sm:hidden
                    w-full h-fit 
                    pt-2 px-8"
              >
                <SearchBar />
              </div>
            </div>
        );
    }
}
