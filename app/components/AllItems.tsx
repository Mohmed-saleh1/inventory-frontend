"use client";
import React from "react";
import CustomButton from "./CustomButton";
import { GrAddCircle } from "react-icons/gr";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSliders } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import SearchInput from "./SearchInput";
import ItemsTable from "./ItemsTable";

export const AllItems = () => {
  const router = useRouter();

  const handleAddItemClick = () => {
    router.push("/add-items"); // Redirect to add-item page
  };

  const handleEditItemClick = () => {
    router.push("/update-product"); // Redirect to update-product page
  };

  const handleDeleteItemClick = () => {
    // Logic for deleting item will go here
    console.log("Delete Item Clicked");
  };

  const handleFilterClick = () => {
    // Logic for filter will go here
    console.log("Filter Clicked");
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-[670px] ">
      <div className="flex flex-col justify-center items-center w-full py-5">
        {/* CRUD buttons and search */}
        <div className="flex justify-between w-full">
          <SearchInput placeholder="Search Item" />
          <div className="flex gap-3 justify-center items-center">
            <CustomButton
              title="Add Item"
              leftIcon={<GrAddCircle size={24} />}
              containerClass="flex items-center justify-center gap-2 text-white"
              onClick={handleAddItemClick}
            />
            <CustomButton
              title="Edit Item"
              leftIcon={<MdModeEdit size={24} />}
              containerClass="!bg-[#EDBD1C] flex items-center justify-center gap-2 text-white"
              onClick={handleEditItemClick}
            />
            <CustomButton
              title="Delete Item"
              leftIcon={<FaRegTrashAlt size={24} />}
              containerClass="!bg-[#B90707] flex items-center justify-center gap-2 text-white"
              onClick={handleDeleteItemClick}
            />
            <CustomButton
              title="Filter"
              leftIcon={<FaSliders size={24} />}
              containerClass="bg-white border flex items-center justify-center gap-2 text-black-10"
              onClick={handleFilterClick}
            />
          </div>
        </div>
        {/* Products Table */}
        <ItemsTable />
      </div>
    </div>
  );
};

export default AllItems;
