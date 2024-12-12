"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

// Define props for the menu item component
interface MenuItemProps {
  name: string;
  icon: React.ReactNode;
  path: string;
  isClickable: boolean;
}

const MenuItem = ({ name, icon, path, isClickable }: MenuItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  // Determine if the current path matches the item path or is a nested path
  const isActive = pathname === path || (pathname.startsWith(path) && path !== "/");

  // Handle click to navigate if the item is clickable
  const handleClick = () => {
    if (isClickable && !isActive) {
      router.push(path); // Navigate only if the link is clickable and not already active
    }
  };

  return (
    <li
      onClick={handleClick}
      className={`flex items-center relative gap-4 py-2 pl-4 rounded-[10px] rounded-l-none
        ${isClickable ? 
          "cursor-pointer hover:bg-activeLinkBackground transition-all duration-300" // Hover effect for clickable items
          : "cursor-default" // Default cursor for non-clickable items
        }
        ${isActive ? 
          "bg-activeLinkBackground text-blue-10 font-semibold before:absolute before:top-0 before:left-0 before:w-[3px] before:rounded-[10px] before:h-full before:bg-blue-10" // Active state styles
          : "font-light text-black-10" // Inactive state styles
        }
      `}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </li>
  );
};

export default MenuItem;
