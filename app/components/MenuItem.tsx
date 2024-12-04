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

  // Check if the item is currently active
  const isActive = pathname === path && isClickable;

  return (
    <li
      // Handle navigation when the item is clicked, but only if clickable
      onClick={() => isClickable && router.push(path)}
      className={`
        flex items-center relative gap-4 py-2 pl-4 rounded-[10px] rounded-l-none
        ${isClickable ? 
          "cursor-pointer hover:bg-activeLinkBackground transition-all duration-300" // Hover effect and cursor for clickable items
          : "cursor-default" // Default cursor when not clickable
        }
        ${isActive ? 
          "bg-activeLinkBackground text-blue-10 font-semibold before:absolute before:top-0 before:left-0 before:w-[3px] before:rounded-[10px] before:h-full before:bg-blue-10" // Active state styles (background color, text color, and active line)
          : "font-light text-black-10" // Default inactive state styles
        }
      `}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </li>
  );
};

export default MenuItem;
