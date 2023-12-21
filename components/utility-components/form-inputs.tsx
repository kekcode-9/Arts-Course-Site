'use client'
import React, { useState } from 'react';
import gsap from 'gsap';
import Typography from './typography';
import DropdownArrow from './svg-utilities/dropdown-arrow';

type InputWrapperProps = {
  children: React.ReactNode;
  label?: string;
  isDropdown?: boolean;
}

function InputWrapper({
  children,
  label,
  isDropdown
}: InputWrapperProps) {
  return (
    <div className={`input-wrapper 
      relative
      w-full md:w-fit h-fit 
      flex flex-col gap-2`}
    >
      {
        label &&
        <Typography isHeader={false} isInputLabel={true} >
          {label}
        </Typography>
      }
      {children}
      {
        isDropdown &&
        <span
          className='absolute bottom-[1rem] right-[0.5rem] -z-10'
        >
          <DropdownArrow/>
        </span>
      }
    </div>
  )
}

type InputProps = {
  label: string;
  inputType?: string;
  onFocus?: () => void;
  isDropdownInput?: boolean;
}

type InputElementProps = Omit<InputProps, 'label'>

function InputElement ({
  inputType,
  isDropdownInput,
  onFocus
}: InputElementProps) {
  return (
    <input 
      type={inputType || 'text'} 
      className={`
      ${inputType!=='date' ? 'w-full md:w-[30rem]' : 'w-48'} h-12 
      px-[0.5rem]
      border-[1px] border-gray-500 rounded-md 
      font-sans 
      text-base md:text-lg lg:text-xl
      bg-transparent focus-visible:outline-none
      ${
        isDropdownInput && 'focus-visible:caret-transparent'
      }
      `}
      onFocus={onFocus}
      onChange={(e) => {
        if (!isDropdownInput) {}
      }}
    />
  )
}

export default function BasicInput({
    label,
    inputType,
    onFocus,
    isDropdownInput
}: InputProps) {
  return (
      <InputWrapper label={label}>
          <InputElement
            inputType={inputType}
            isDropdownInput={false}
          />
      </InputWrapper>
  )
}

type DropdownListType<T> = {
  [key in keyof T] : T[key]
}

type DropdownInputProps<T> = {
  dropdownList: /*DropdownListType<T>*/ {[key: string]: string};
  label: string;
  onChange?: (item: [string, string]) => void;
}

export function DropdownInput<T>({
  dropdownList,
  label,
  onChange
}: DropdownInputProps<T>) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <InputWrapper
      label={label}
    >
      <InputElement
        isDropdownInput={true}
        onFocus={() => {
          setShowDropdown(true)
        }}
      />
      {
        showDropdown &&
        <ul
          className='flex flex-col gap-[1rem]
          w-full h-fit
          rounded-md 
          p-[1rem]
          bg-burnt-orange'
        >
          {
            Object.entries(dropdownList).map(([key, value]) => {
              return (
                <li className='w-full h-fit 
                cursor-pointer' 
                  key={key} 
                  onClick={() => onChange && onChange([key, value])}
                >
                  {value}
                </li>
              )
            })
          }
        </ul>
      }
    </InputWrapper>
  )
}

type HiddenDivProps = {
  children: React.ReactNode;
  show: boolean;
}

export function HiddenDiv({
  show,
  children
}: HiddenDivProps) {
  return (
    <div className={`
      ${show ? 'block' : 'hidden'}
    `}
    >
      {children}
    </div>
  )
}

type FormWrapperProps = {
  children: React.ReactNode;
}

export function FormWrapper ({
  children
}: FormWrapperProps) {
  return (
    <form
      className='flex flex-col gap-12
      w-full md:w-fit'
    >
      {children}
    </form>
  )
}