"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { UserContext } from "@/utilities/stores/userInfoStore";
import SearchBar from "../search-bar";
import MenuContent from "../menu-utility/menu-content";
import UserMenu from "@/components/user/user-menu";

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
  const { state, dispatch } = useContext(UserContext);
  const linksRef = useRef<HTMLDivElement>(null);
  const [linksWidth, setLinksWidth] = useState(0);

  useEffect(() => {
    if (linksRef.current) {
      setLinksWidth(linksRef.current.offsetWidth / 16 + 3);
    }
  }, [linksRef.current]);

    return (
      <div
        className="header-wrapper
        fixed z-[100]"
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
        <UserMenu/>
        <div
          className="search-wrapper sm:hidden
            w-full h-fit 
            py-2 px-8 
            bg-neutral-dark-gray-bg"
        >
          <SearchBar />
        </div>
      </div>
    )
}
