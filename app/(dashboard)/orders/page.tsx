"use client";
import React from "react";
import { GrAddCircle } from "react-icons/gr";
import { useRouter } from "next/navigation";
import CustomButton from "../../components/CustomButton";
import ItemsTable from "../../components/Table-Components/ItemsTable";


// Main component for displaying all items with search, add, and filter functionalities
export const orderPage = () => {
  const router = useRouter();

  // Handles navigation to the add-item page
  const handleAddItemClick = () => {
    router.push("/orders/addorders");
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-[670px]">
      <div className="flex flex-col justify-center items-center w-full py-5">
  
          {/* Control Buttons (Add and Filter) */}
          <div className="flex gap-3 justify-center items-center">
            {/* Button to navigate to Add Item page */}
            <CustomButton
              title="Add Order"
              leftIcon={<GrAddCircle size={24} />}
              containerClass="flex items-center justify-center gap-2 text-white"
              onClick={handleAddItemClick}
            />
        </div>
        {/* Render the table of items */}
        <ItemsTable />
      </div>
    </div>
  );
};

export default orderPage;
