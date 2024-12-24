"use client";
import React from "react";
import { GrAddCircle } from "react-icons/gr";
import { useRouter } from "next/navigation";
import CustomButton from "../../components/CustomButton";

import OrdersTable from "../../components/Table-Components/ordersTable";
export const orderPage = () => {

  const router = useRouter();

  // Navigate to add orders page
  const handleAddItemClick = () => {
    router.push("/orders/addorders");
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-screen overflow-auto">
      <div className="flex flex-col justify-center items-center w-full py-5">

        <div className="flex gap-3 justify-center items-center">
          <CustomButton
            title="Create Order"

            leftIcon={<GrAddCircle size={24} />}
            containerClass="flex items-center justify-center gap-2 text-white"
            onClick={handleAddItemClick}
          />
        </div>

        {/* Render the ItemsTable with order-related APIs */}
<OrdersTable/>

      </div>
    </div>
  );
};

export default OrderPage; 
