import Image from "next/image";
import React from "react";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import CustomButton from "../CustomButton";

const TableData = ({ paginatedData, handleEditItem, handleDeleteItem }) => {
  return (
    // Main table container with responsive design classes
    <table className="table-auto w-full border-collapse text-sm text-left">
      {/* Table Header */}
      <thead className="bg-[#FAFAFA] text-gray-700">
        <tr>
          {/* Dynamically map column headers */}
          {["Category", "Name", "Image", "Price", "Quantity", "Actions"].map(
            (col, index) => (
              <th
                key={index}
                className={`px-4 py-3 border-r font-manrope text-customGray text-[12px] ${
                  col === "Actions" ? "text-center" : ""
                }`}
              >
                {col}
              </th>
            )
          )}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {/* Map through the paginated data to display each item's data */}
        {paginatedData.map((item : TableItem) => (
          <tr
            key={item._id}
            className="hover:bg-gray-50 font-manrope text-[#111827] text-[12px]"
          >
            <td className="px-4 py-3">{item.category}</td>
            <td className="px-4 py-3">{item.name}</td>
            <td className="px-4 py-3">
              <Image


                src={${item.image}}

               

                alt={item.name}
                width={400}
                height={400}
                className="w-10 h-10 mx-auto"
              />
            </td>
            {/* Display product price, formatted to 2 decimal places */}
            <td className="px-4 py-3">{item.price.toFixed(2)}</td>
            <td className="px-4 py-3">{item.quantity}</td>
            {/* Actions for editing and deleting */}
            <td className="px-4 py-3 flex gap-2 justify-center items-center">
              {/* Edit Button */}
              <CustomButton
                title="Edit Item"
                leftIcon={<MdModeEdit size={20} />}
                containerClass="!bg-[#EDBD1C] flex items-center justify-center gap-2 text-white !text-xs !px-4 !py-2"
                onClick={() => handleEditItem(item._id)} // Call edit handler on click
              />
              {/* Delete Button */}
              <CustomButton
                title="Delete Item"
                leftIcon={<FaRegTrashAlt size={20} />}
                containerClass="!bg-[#B90707] flex items-center justify-center gap-2 text-white text-[10px] !px-4 !py-2"
                onClick={() => handleDeleteItem(item._id)} // Call delete handler on click
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;