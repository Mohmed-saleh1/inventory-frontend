import React from "react";
import Image from "next/image";

export const OrderWidget = ({ order }) => {
  return (
    <div className="order-widget bg-gray-100 p-4 rounded-md shadow-md mb-4">
      {/* Order Header */}
      <h3 className="text-lg font-bold">Order ID: {order.id}</h3>
      <h4 className="text-sm text-gray-600 mb-2">
        Total Records: {order.record.length}
      </h4>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm text-left">
          <thead className="bg-[#FAFAFA] text-gray-700">
            <tr>
              {[
                "Name",
                "Image",
                "Price",
                "Description",
                "Amount",
                "available",
                "sales",
                "waste",
              ].map((col, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 border-r font-manrope text-customGray text-[12px] ${
                    col === "Actions" ? "text-center" : ""
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.record.map((recordItem, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 font-manrope text-[#111827] text-[12px]"
              >
                <td className="px-4 py-3">
                  {recordItem.productId?.name || "N/A"}
                </td>
                <td className="px-4 py-3">
                  {recordItem.productId?.image ? (
                     <Image
                     src={recordItem.productId.image}
                     alt={recordItem.productId.name || "Product"}
                     width={40}
                     height={40}
                     className="w-10 h-10 rounded"
                   
                   />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="px-4 py-3">
                  {recordItem.productId?.price
                    ? recordItem.productId.price.toFixed(2)
                    : "N/A"}
                </td>
                <td className="px-4 py-3">
                  {recordItem.productId?.description || "N/A"}
                </td>
                <td className="px-4 py-3">{recordItem.amount || "N/A"}</td>
                <td className="px-4 py-3">
                  {recordItem.productId?.available || "N/A"}
                </td>
                <td className="px-4 py-3">
                  {recordItem.productId?.sales || "N/A"}
                </td>
                <td className="px-4 py-3">
                  {recordItem.productId?.waste || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderWidget;
