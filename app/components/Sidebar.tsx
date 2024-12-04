"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { TbShoppingBag } from "react-icons/tb";
import { HiOutlineBriefcase } from "react-icons/hi";
import { TiDocumentText } from "react-icons/ti";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <RxDashboard size={24} />, path: "/dashboard" },
    { name: "Items", icon: <TbShoppingBag size={24} />, path: "/items" },
    {
      name: "Add Sales",
      icon: <HiOutlineBriefcase size={24} />,
      path: "/add-sales",
    },
    { name: "Reports", icon: <TiDocumentText size={24} />, path: "/reports" },
  ];

  return (
    <div className="w-[280px] my-5 ml-5 mr-[30px] font-lexend">
      <div className="flex flex-col bg-sidebarBackground size-full rounded-[20px]">
        <h2 className="text-base font-bold mb-8 px-12 mt-[60px]">Inventory</h2>
        <div className="flex flex-col px-8 w-full">
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={() => router.push(item.path)}
                className={`flex items-center relative gap-4 py-2 pl-4 rounded-[10px] rounded-l-none cursor-pointer ${
                  pathname === item.path
                    ? "bg-activeLinkBackground text-blue-10 font-semibold before:absolute before:top-0 before:left-0 before:w-[3px] before:rounded-[10px] before:h-full before:bg-blue-10"
                    : "font-light text-black-10"
                } hover:bg-activeLinkBackground transition-all duration-300`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
