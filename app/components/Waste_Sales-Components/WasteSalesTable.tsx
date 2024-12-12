import React from "react";
import CustomButton from "../CustomButton";
import { MdModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const WasteSalesTable = ({ rows, onEdit, onDelete }) => {
  return (
    <table className="w-full text-center border-separate border-spacing-y-5 table-fixed">
      <thead className="bg-[#D9D9D940] shadow shadow-[#006EC480] text-black pl-6 pr-1 py-2 rounded-t-lg">
        <tr>
          {["Item ID", "Amount", "Actions"].map((col, index) => (
            <th
              key={index}
              className="px-4 py-3 font-manrope text-customGray text-[12px]"
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="border">
        {rows.map((row, index) => (
          <tr
            key={index}
            className="border border-tableBorder drop-shadow-tableShadow"
          >
            <td className="px-4 py-3 border border-r-0 rounded-lg rounded-tr-none rounded-br-none">
              {row.productId}
            </td>
            <td className="px-4 py-3 border border-l-0 border-r-0">
              {row.amount}
            </td>
            <td className="px-4 py-3 border border-l-0 rounded-lg rounded-tl-none rounded-bl-none flex gap-2 justify-center items-center">
              {/* Edit Button */}
              <CustomButton
                title="Edit Item"
                leftIcon={<MdModeEdit size={20} />}
                containerClass="!bg-[#EDBD1C] flex items-center justify-center gap-2 text-white !text-xs !px-4 !py-2"
                onClick={() => onEdit(index)} // Call edit handler on click
              />
              {/* Delete Button */}
              <CustomButton
                title="Delete Item"
                leftIcon={<FaRegTrashAlt size={20} />}
                containerClass="!bg-[#B90707] flex items-center justify-center gap-2 text-white text-[10px] !px-4 !py-2"
                onClick={() => onDelete(index)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WasteSalesTable;
