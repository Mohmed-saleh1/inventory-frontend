import React from "react";

const WasteTable = ({ rows }) => {
  return (
    <table className="w-full text-center border-separate border-spacing-y-5 table-fixed">
      <thead className="bg-[#D9D9D940] shadow shadow-[#006EC480] text-black pl-6 pr-1 py-2 rounded-t-lg">
        <tr>
          {["Item ID", "Amount"].map((col, index) => (
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
              {row.productId} {/* Display product ID */}
            </td>
            <td className="px-4 py-3 border border-l-0 rounded-lg rounded-tl-none rounded-bl-none">
              {row.amount} {/* Display amount */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WasteTable;
