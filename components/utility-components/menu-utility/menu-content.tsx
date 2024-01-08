"use client";
import React, { useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { CourseContext } from "@/utilities/stores/courseContextStore";
import constants from "@/utilities/constants/constants";
import Typography from "../typography";
import routes from "@/utilities/constants/routes";

const { ROOT } = routes;

const { COURSES, WORKSHOPS, THREED_MODELS, REFERENCES, BLOG, HELP, FEEDBACK } =
  constants.MENU_ITEMS;

const learning = [COURSES, WORKSHOPS, BLOG];
const resources = [THREED_MODELS, REFERENCES];
const reachingOut = [HELP, FEEDBACK];

type MenuColumnProps = {
  children: React.ReactNode;
};

function MenuColumn({ children }: MenuColumnProps) {
  const pathName = usePathname();

  return (
    <div
      className={`
        menu-column
        flex flex-col 
        items-center ${pathName === ROOT ? "md:items-center" : "md:items-start"}
        justify-center 
        gap-6 lg:gap-8
        w-fit h-fit
      `}
    >
      {children}
    </div>
  );
}

export default function MenuContent() {
  const { state } = useContext(CourseContext);
  const { menuOn } = state;
  const pathName = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItemRefs: React.MutableRefObject<HTMLSpanElement[]> = useRef([]);

  useEffect(() => {
    if (menuRef.current) {
      if (!menuOn) {
        const tl = gsap.timeline();
        tl.to(menuItemRefs.current, {
          opacity: 0,
          duration: 0.2,
          stagger: 0.02
        })
        .to(menuRef.current, {
          scaleY: 0,
          transformOrigin: "top"
        });
      } else {
        gsap.to(menuRef.current, {
          scaleY: 1,
          transformOrigin: "top"
        });
      }
      
      const itemsEntranceTimer = menuOn && setTimeout(() => {
        gsap.to(menuItemRefs.current, {
          opacity: 1,
          duration: 0.5,
          stagger: 0.07
        })
      }, 400);

      return () => {
        itemsEntranceTimer && clearTimeout(itemsEntranceTimer);
      }
    }
  }, [menuOn, menuRef.current]);

  return (
    <div
      ref={menuRef}
      className={`
        menu-content
        absolute right-0 z-[2]
        flex items-center justify-center
        ${pathName === ROOT ? "lg:justify-end" : "md:justify-end"}
        ${
          pathName === ROOT
            ? "w-screen h-fit lg:w-full lg:h-full"
            : "w-screen md:w-fit h-fit"
        } 
        p-8 md:px-16 
        scale-y-0
        bg-black
      `}
    >
      <div
        className={`content-wrapper
        flex flex-col 
        ${pathName === ROOT ? "md:flex-col" : "md:flex-row"} 
        items-center justify-center
        gap-12
        w-fit h-fit`}
      >
        <MenuColumn>
          {learning.map((item, i) => {
            return (
              <span
                ref={(ele) => {
                  if (ele) {
                    menuItemRefs.current[i] = ele;
                  }
                }}
                className="hover:border-b-[1px] hover:border-b-white 
                  transition-all opacity-0"
              >
                <Typography isHeader={false} additionalClasses="cursor-pointer">
                  {item}
                </Typography>
              </span>
            );
          })}
        </MenuColumn>
        <AnimatePresence>
          {
            menuOn &&
            <motion.div
              className={`
              ${pathName === ROOT && "md:w-[48px] md:h-[1px]"}
              w-[1px] max-md:w-[48px] 
              h-[48px] max-md:h-[1px] 
              translate-x-0
              bg-white`}
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1,
                transition: {
                  delay: 0.6
                }
              }}
              exit={{
                scale: 0
              }}
            />
          }
        </AnimatePresence>
        <MenuColumn>
          {resources.map((item, i) => {
            return (
              <span
                ref={(ele) => {
                  if (ele) {
                    menuItemRefs.current[3 + i] = ele;
                  }
                }}
                className="hover:border-b-[1px] hover:border-b-white 
                  transition-all opacity-0"
              >
                <Typography isHeader={false} additionalClasses="cursor-pointer">
                  {item}
                </Typography>
              </span>
            );
          })}
        </MenuColumn>
        <AnimatePresence>
          {
            menuOn &&
            <motion.div
              className={`
              ${pathName === ROOT && "md:w-[48px] md:h-[1px]"}
              w-[1px] max-md:w-[48px] 
              h-[48px] max-md:h-[1px] 
              translate-x-0
              bg-white`}
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1,
                transition: {
                  delay: 1
                }
              }}
              exit={{
                scale: 0
              }}
            />
          }
        </AnimatePresence>
        <MenuColumn>
          {reachingOut.map((item, i) => {
            return (
              <span
                ref={(ele) => {
                  if (ele) {
                    menuItemRefs.current[5 + i] = ele;
                  }
                }}
                className="hover:border-b-[1px] hover:border-b-white 
                  transition-all opacity-0"
              >
                <Typography isHeader={false} additionalClasses="cursor-pointer">
                  {item}
                </Typography>
              </span>
            );
          })}
        </MenuColumn>
      </div>
    </div>
  );
}
