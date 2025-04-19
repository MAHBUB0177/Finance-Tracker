'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi';



interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SmallDeviceHeader = ({ isOpen, setIsOpen }: SidebarProps) => {

  return (
    <>
      <div className='flex justify-between items-center z-50'>
        <Link href={'/'}>
          <div className='flex gap-1'>
            <div className=''>
            <FiMenu
              className="h-6 w-6 cursor-pointer "
              onClick={() => setIsOpen((prev) => !prev)}
            />
            </div>
           

            <p className='text-xl text-red-500 font-bold pt-1'>TrendyCart</p>
          </div>
        </Link>

        <div className='flex justify-start gap-7 pt-1'>
          {/* {sessionStatus == 'authenticated' ? (
            <>
              <p className="flex justify-center items-center cursor-pointer text-normal h-[35px] w-[35px] font-semibold rounded-full bg-secondary text-white pt-2"
                onClick={() => setShow(!show)}>
                {authUserData?.name?.charAt(0).toUpperCase()}
              </p>{" "}
            </>
          ) : ( */}
          <div className='flex justify-between gap-2'>
            <Link href={'/auth'} >
              <button
                className={"w-20 text-sm p-[6px] font-semibold border hover:bg-red-200 border-red-500  text-secondary rounded-md hover:scale-105 duration-300"}
              >
                Sign in

              </button>
            </Link>

            <Link href={'/signup'} >
              <button

                className={"w-20 text-sm p-[6px] font-semibold bg-red-500 rounded-sm text-white"}
              >
                Sign up
              </button>
            </Link>
          </div>


          {/* )} */}

        </div>


      </div>


    </>
  )
}

export default SmallDeviceHeader