'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "./typography";
import DropdownArrow from "./svg-utilities/dropdown-arrow";

type InputWrapperProps = {
  children: React.ReactNode;
  label?: string;
  isDropdown?: boolean;
  onBlur?: () => void;
  mandatory: boolean;
};

function InputWrapper({ 
  children, 
  label, 
  isDropdown, 
  onBlur,
  mandatory
}: InputWrapperProps) {
  return (
    <div
      className={`input-wrapper 
      relative
      w-fit h-fit
      flex flex-col gap-2`}
      onBlur={onBlur}
    >
      {label && (
        <Typography 
          isHeader={false} 
          isInputLabel={true} 
          additionalClasses="flex items-start justify-start gap-2" 
          animateEntrance={true}
        >
          {label}
          {
            mandatory && 
            <Typography 
              isHeader={false} 
              size="text-2xl" 
              additionalClasses="text-orange"
            >
              *
            </Typography>
          }
        </Typography>
      )}
      {children}
      {isDropdown && (
        <motion.span 
          className="absolute top-[3.75rem] right-[0.5rem] -z-10"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.4
            }
          }}
        >
          <DropdownArrow />
        </motion.span>
      )}
    </div>
  );
}

type InputProps = {
  label: string;
  inputType?: string | null;
  onFocus?: () => void;
  isDropdownInput?: boolean;
  selectedValue?: string;
  onValueChange: (() => void) | ((selectedValue: string) => void);
  mandatory: boolean;
};

// type InputElementProps = Omit<InputProps, "label">;
type InputElementProps = InputProps;

function InputElement({
  inputType,
  isDropdownInput,
  selectedValue,
  onFocus,
  onValueChange,
  label,
  mandatory
}: InputElementProps) {
  return (
    <motion.input
      type={inputType || "text"}
      required={mandatory}
      className={`
      ${(inputType !== "date" && inputType !== "number") ? "w-[20rem] md:w-[30rem]" : "w-48"} h-12 
      px-[0.5rem]
      border-[1px] border-gray-500 rounded-md 
      font-sans 
      text-base md:text-lg lg:text-xl text-white
      bg-transparent focus-visible:outline-none
      ${isDropdownInput && "focus-visible:caret-transparent"}
      `}
      onFocus={onFocus}
      onChange={(e) => {
        if (!isDropdownInput) {
          onValueChange(e.target.value);
        }
      }}
      name={label}
      value={selectedValue}
      initial={{
        opacity: 0,
        translateY: '20px'
      }}
      animate={{
        opacity: 1,
        translateY: '0px',
        transition: {
          delay: 0.1,
          duration: 0.3
        }
      }}
    />
  );
}

export default function BasicInput({
  label,
  inputType,
  isDropdownInput,
  onValueChange,
  mandatory
}: InputProps) {
  return (
    <InputWrapper label={label} mandatory={mandatory} >
      <InputElement 
        onValueChange={onValueChange} 
        inputType={inputType} 
        isDropdownInput={false} 
        label={label} 
        mandatory={mandatory}
      />
    </InputWrapper>
  );
}

type DropdownInputProps<T> = {
  dropdownList: { [key: string]: string };
  label: string;
  onChange?: (item: [string, string]) => void;
  mandatory: boolean;
};

export function DropdownInput<T>({
  dropdownList,
  label,
  onChange,
  mandatory
}: DropdownInputProps<T>) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    "Select one" | (typeof dropdownList)[keyof typeof dropdownList]
  >("Select one");

  const onValueSelect = ([key, value]: [string, string]) => {
    if (onChange) {
      onChange([key, value]);
    }
    setSelectedValue(value);
  }

  return (
    <InputWrapper 
      label={label}
      onBlur={() => {
        setShowDropdown(false);
      }}
      isDropdown={true}
      mandatory={mandatory}
    >
      <InputElement
        isDropdownInput={true}
        onFocus={() => {
          setShowDropdown(true);
        }}
        selectedValue={selectedValue}
        label={label}
        onValueChange={() => {}}
        mandatory={mandatory}
      />
      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            className="flex flex-col gap-[1rem]
            w-full h-fit
            rounded-md 
            p-[1rem]
            bg-burnt-orange"
            initial={{
              scaleY: 0
            }}
            animate={{
              scaleY: 1,
              transformOrigin: 'top',
              transition: {
                ease: 'linear'
              },
              onAnimationEnd: () => {}
            }}
            exit={{
              scaleY: 0,
              transition: {
                delay: 0.3
              }
            }}
          >
            {Object.entries(dropdownList).map(([key, value], i) => {
              return (
                <motion.li
                  className="w-full h-fit
                  cursor-pointer text-white"
                  key={key}
                  onMouseDown={() => onValueSelect([key, value])}
                  initial={{
                    opacity: 0,
                    translateY: '10px'
                  }}
                  animate={{
                    opacity: 1,
                    translateY: '0px',
                    transition: {
                      delay: (i + 1) / 10
                    }
                  }}
                  exit={{
                    opacity: 0,
                    translateY: '-10px',
                    transition: {
                      delay: (i + 1) / 10
                    }
                  }}
                >
                  {value}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </InputWrapper>
  );
}

type FormWrapperProps = {
  children: React.ReactNode;
};

export function FormWrapper({ children }: FormWrapperProps) {
  return (
    <form
      className="flex flex-col gap-12
      w-fit"
    >
      {children}
    </form>
  );
}
