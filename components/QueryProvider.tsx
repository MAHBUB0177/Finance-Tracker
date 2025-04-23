

'use client'
import React, { useState } from 'react';
import Sidebar from './layout/sideBar';
import RootHeader from './layout/rootHeader';
import RootFooter from './layout/rootFooter';


interface Props {
  children: React.ReactNode;

}


const QueryProvider = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
  
      <div className="flex relative">
        {/* Sidebar */}
        <div className={`${isOpen ? "w-[45%] absolute md:relative md:w-[20%] lg:w-[15%]" : "hidden md:block md:[10%] lg:w-[5%]"} transition-all duration-300`} >
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Main Content */}
        <div className={`${isOpen ? "w-full  md:w-[80%] lg:w-[85%]" : "w-full md:[90%] lg:w-[95%]"} transition-all duration-300`}>
          {/* Fixed Header on Small Devices when isOpen is true */}
          <div >
            <RootHeader isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          {/* Main Content with adjusted padding when Sidebar is open */}
          <main style={{ minHeight: "calc(100vh)" }}
            className="pt-[95px] md:pt-[90px] bg-[#FCFCFC] px-2 md:px-20 lg:px-4">
            {children}
          </main>

          {/* Fixed Footer on Small Devices when isOpen is true */}
          <div>
            <RootFooter />
          </div>

        </div>
      </div>
  );
};

export default QueryProvider;

