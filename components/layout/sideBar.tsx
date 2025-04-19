"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiHome, FiUser, FiSettings, FiChevronDown, FiChevronUp } from "react-icons/fi"; // Import icons

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define sidebar menu structure
const menuItems = [
  {
    title: "Home",
    icon: <FiHome className="w-5 h-5" />,
    path: "/",
    submenu: [],
  },
  {
    title: "Dashboard",
    icon: <FiUser className="w-5 h-5" />,
    path: "",
    submenu: [
      { title: "Analytics", path: "/dashboard/analytics" },
      { title: "Reports", path: "/dashboard/reports" },
    ],
  },

];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [submenuOpen, setSubmenuOpen] = useState<{ [key: string]: boolean }>({});
  

  const toggleSubmenu = (title: string) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div
      className={`${
        isOpen ? "w-[45%] md:w-[20%] lg:w-[15%] z-100" : "hidden md:block md:[10%] lg:w-[5%] z-100"
      }  bg-black text-white  h-screen fixed  transition-all duration-300 shadow-sm`}
    >
      {/* Sidebar Header */}
      <div className="py-7 px-4 border-b-2 border-slate-100 ">
        <FiMenu
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
        />
      </div>

      {/* Sidebar Menu Items */}
      <ul className="mt-4">
        {menuItems.map((item, index) => (
          <li key={index} className="px-4 py-2">
            <div className="flex items-center justify-between cursor-pointer" onClick={() => item.submenu.length > 0 && toggleSubmenu(item.title)}>
              <Link href={item.path} className="flex items-center gap-2">
                {item.icon}
                {isOpen && <span>{item.title}</span>}
              </Link>
              {item.submenu.length > 0 && isOpen && (
                submenuOpen[item.title] ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />
              )}
            </div>

            {/* Submenu */}
            {item.submenu.length > 0 && submenuOpen[item.title] && isOpen && (
              <ul className="ml-6 mt-2">
                {item.submenu.map((sub, subIndex) => (
                  <li key={subIndex} className="py-1">
                    <Link href={sub.path} className="text-gray-300 text-sm">
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
