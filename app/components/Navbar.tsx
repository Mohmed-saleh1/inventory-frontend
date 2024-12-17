"use client";
import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  // Allow dynamic keys using Record
  const titles: Record<string, { title: string; subtitle: string }> = {
    "/items": { title: "All Items", subtitle: "Items details information" },
    "/items/add-items": { title: "Add Items", subtitle: "Add items details information" },
    "/items/update-product/": { title: "Update Product", subtitle: "Update details information" },
    "/add-sales": { title: "Add Daily Sales", subtitle: "sales details information" },
    "/": { title: "Reports", subtitle: "reports details information" },
    "/waste": { title: "Expired", subtitle: "expired details information" },
    "/orders": { title: "Orders", subtitle: "orders details information" },
    
  };

  // Handle dynamic routing logic for `/items/update-product/[id]`
  let currentTitle = titles[pathname];
  if (pathname?.startsWith("/items/update-product/")) {
    const dynamicId = pathname.split("/").pop(); // Extract dynamic ID from the path
    currentTitle = {
      title: "Update Product",
      subtitle: `Update details information for Product ${dynamicId}`,
    };
  }

  // Fallback for undefined paths
  if (!currentTitle) {
    currentTitle = {
      title: "Dashboard",
      subtitle: "Overview of your inventory",
    };
  }

  return (
    <nav className="flex text-black py-1">
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-2xl font-extrabold">{currentTitle?.title}</h1>
          <p className="text-[#A2A1A8]">{currentTitle?.subtitle}</p>
        </div>
        <div className="flex gap-14">
          <div className="relative flex items-center border-2 rounded-xl hover:border hover:border-blue-500">
            <span className="ml-2 text-black text-3xl">
              <CiSearch />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="p-2 w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center w-40 px-5 border rounded-xl">
            <h1>Ahmed Aly</h1>
            <Image
              src="/direction-down 01.png"
              alt="dropdown"
              width={20}
              height={20}
              className="pl-5"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
