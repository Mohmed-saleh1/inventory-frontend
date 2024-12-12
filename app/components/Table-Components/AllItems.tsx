"use client";
import React from "react";
import CustomButton from "../CustomButton";
import { GrAddCircle } from "react-icons/gr";
import { FaSliders } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import SearchInput from "../SearchInput";
import ItemsTable from "./ItemsTable";

// Main component for displaying all items with search, add, and filter functionalities
export const AllItems = () => {
  const router = useRouter();

  // Handles navigation to the add-item page
  const handleAddItemClick = () => {
    router.push("/items/add-items");
  };

  // Handles logic for clicking the filter button
  const handleFilterClick = () => {
    console.log("Filter Clicked"); // Placeholder logic for future filtering logic
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-[670px]">
      <div className="flex flex-col justify-center items-center w-full py-5">
        {/* Search and Control Buttons Section */}
        <div className="flex justify-between w-full">
          {/* Search Input Component */}
          <SearchInput placeholder="Search Item" />

          {/* Control Buttons (Add and Filter) */}
          <div className="flex gap-3 justify-center items-center">
            {/* Button to navigate to Add Item page */}
            <CustomButton
              title="Add Item"
              leftIcon={<GrAddCircle size={24} />}
              containerClass="flex items-center justify-center gap-2 text-white"
              onClick={handleAddItemClick}
            />
            {/* Button for applying filters */}
            <CustomButton
              title="Filter"
              leftIcon={<FaSliders size={24} />}
              containerClass="!bg-white border flex items-center justify-center gap-2 text-black-10"
              onClick={handleFilterClick}
            />
          </div>
        </div>

        {/* Render the table of items */}
        <ItemsTable />
      </div>
    </div>
  );
};

export default AllItems;
