import Image from 'next/image';
import Link from 'next/link';
import React  from 'react'
import SmallDeviceHeader from './smallDeviceHeader';


interface SidebarProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const RootHeader = ({ isOpen, setIsOpen }: SidebarProps) => {
   

    return (
        <div >
            <div
                className={`${isOpen ? "w-full md:w-[85%]" : "w-full md:[90%] lg:w-[95%]"
                    } p-5 bg-white z-50 transition-all duration-300 shadow-sm  fixed md:px-16 lg:px-12  border-t-2 border-slate-100`}
            >

                <div className=' hidden md:block'>
                    <div className='  flex justify-between items-center'>
                        <Link href={'/'}>
                            <div className='flex gap-1'>
                                <p className='text-xl text-red-500 font-bold pt-1'>Finance</p>
                            </div>
                        </Link>
                        <div className="flex justify-start gap-7 pt-1 ">
                            <div className='flex justify-between gap-2'>
                                <button
                                    className={"w-20 cursor-pointer text-sm p-[6px] font-semibold bg-red-500 rounded-sm text-white"}
                                >
                                    LogIn
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:hidden '>
                    <SmallDeviceHeader isOpen={isOpen} setIsOpen={setIsOpen} />

                </div>
            </div>
        </div>
    )
}

export default RootHeader;