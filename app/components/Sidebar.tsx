"use client";

import React from "react";
import CustomButton from "./CustomButton";
import { RxDashboard } from "react-icons/rx";
import { TbShoppingBag } from "react-icons/tb";
import { HiOutlineBriefcase } from "react-icons/hi";
import { TiDocumentText } from "react-icons/ti";
import MenuItem from "./MenuItem";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";

const Sidebar = () => {
  // Define the menu items with their respective properties
  const menuItems = [
    {
      name: "Dashboard",
      icon: <RxDashboard size={24} />,
      path: "/",
      isClickable: true, // Changed to clickable
    },
    {
      name: "Items",
      icon: <TbShoppingBag size={24} />,
      path: "/items",
      isClickable: true,
    },
    {
      name: "Add Sales",
      icon: <HiOutlineBriefcase size={24} />,
      path: "/add-sales",
      isClickable: true,
    },
    {
      name: "Waste",
      icon: <FaRegTrashAlt size={24} />,
      path: "/waste",
      isClickable: true,
    },
    {
      name: "Profits",
      icon: <BsGraphUpArrow />,
      path: "/profits",
      isClickable: true,
    },
  ];

  return (
    <div className="min-w-[280px] my-5 ml-5 mr-[30px] font-lexend h-full">
      <div className="flex flex-col bg-sidebarBackground size-full rounded-[20px] relative">
        <h2 className="text-base font-bold mb-8 px-12 mt-[60px]">Inventory</h2>
        <div className="flex flex-col px-8 w-full">
          {/* Map through menuItems and render MenuItem for each */}
          <ul className="space-y-4">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                name={item.name}
                icon={item.icon}
                path={item.path}
                isClickable={item.isClickable}
              />
            ))}
          </ul>
        </div>
        {/* Custom button for logout with optional onClick handler */}
        <CustomButton
          title="Logout"
          containerClass="absolute bottom-5 left-5 text-white"
          onClick={() => console.log("Logout clicked")}
        />
      </div>
    </div>
  );
};

export default Sidebar;
