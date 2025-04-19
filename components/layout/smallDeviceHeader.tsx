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


            <p className='text-xl text-red-500 font-bold pt-1'>Finance</p>
          </div>
        </Link>

        <div className='flex justify-start gap-7 pt-1'>
          <div className='flex justify-between gap-2'>

            <button
              className={"w-20 cursor-pointer text-sm p-[6px] font-semibold bg-red-500 rounded-sm text-white"}
            >
              LogIn
            </button>



          </div>




        </div>


      </div>


    </>
  )
}

export default SmallDeviceHeader