import React from "react";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import CustomButton from "../CustomButton";

// Define the type for table items
interface TableItem {
  _id: string;
  category: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  available: number;
  sales: number;
  waste: number;


}

interface TableDataProps {
  paginatedData: TableItem[];
  handleEditItem: (id: string) => void;
  handleDeleteItem: (id: string) => void;
}

const TableData: React.FC<TableDataProps> = ({
  paginatedData,
  handleEditItem,
  handleDeleteItem,
}) => {
  return (
    <table className="table-auto w-full border-collapse text-sm text-left">
      <thead className="bg-[#FAFAFA] text-gray-700">
        <tr>
          {["Category", "Name",  "Price", "Quantity", "available", "sales", "waste",  "Actions"].map(
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
      <tbody>
        {paginatedData.map((item) => (
          <tr
            key={item._id}
            className="hover:bg-gray-50 font-manrope text-[#111827] text-[12px]"
          >
            <td className="px-4 py-3">{item.category}</td>
            <td className="px-4 py-3">{item.name}</td>
           
            <td className="px-4 py-3">
  {item.price !== undefined && item.price !== null ? item.price.toFixed(2) : "N/A"}
</td>
            <td className="px-4 py-3">{item.quantity}</td>
            <td className="px-4 py-3">{item.available}</td>
            <td className="px-4 py-3">{item.sales}</td>
            <td className="px-4 py-3">{item.waste}</td>
            <td className="px-4 py-3 flex gap-2 justify-center items-center">
              <CustomButton
                title="Edit Item"
                leftIcon={<MdModeEdit size={20} />}
                containerClass="!bg-[#EDBD1C] flex items-center justify-center gap-2 text-white !text-xs !px-4 !py-2"
                onClick={() => handleEditItem(item._id)}
              />
              <CustomButton
                title="Delete Item"
                leftIcon={<FaRegTrashAlt size={20} />}
                containerClass="!bg-[#B90707] flex items-center justify-center gap-2 text-white text-[10px] !px-4 !py-2"
                onClick={() => handleDeleteItem(item._id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableData;
