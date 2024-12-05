"use client";
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ItemsTable = () => {
  const tableData = [
    {
      category: "Man",
      name: "Kids T-shirt",
      image: "/Roshdy.png",
      code: "G-7893",
      amount: "1 pcs",
    },
    {
      category: "Woman",
      name: "Kids T-shirt",
      image: "/Roshdy.png",
      code: "Co-7898",
      amount: "3 pcs",
    },
    {
      category: "Man",
      name: "Kids T-shirt",
      image: "/Roshdy.png",
      code: "G-7893",
      amount: "5 pcs",
    },
    {
      category: "Kid's",
      name: "Kids T-shirt",
      image: "/Roshdy.png",
      code: "G-7893",
      amount: "5 pcs",
    },
    {
      category: "Man",
      name: "Kids T-shirt",
      image: "/Roshdy.png",
      code: "G-7893",
      amount: "1 pcs",
    },
    {
      category: "Woman",
      name: "Kids T-shirt",
      image: "/Roshdy.png",
      code: "Co-7898",
      amount: "3 pcs",
    },
    {
      category: "Man",
      name: "Kids T-shirt",
      image: "/Roshdy.png",
      code: "G-7893",
      amount: "5 pcs",
    },
  ];

  const tableHeaders = [
    { label: "" },
    { label: "Category" },
    { label: "Item Name" },
    { label: "Image" },
    { label: "Code" },
    { label: "Amount" },
  ];

  const totalPages = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="pt-4 w-full relative bg-white">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm text-left">
          <thead className="bg-[#FAFAFA] text-gray-700">
            <tr>
              {tableHeaders.map((header, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 text-customGray border-r text-[12px] font-manrope`}
                >
                  {index === 0 ? <p>Select</p> : header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 font-manrope text-[#111827] text-[12px]`}
              >
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3">{item.category}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 mx-auto"
                  />
                </td>
                <td className="px-4 py-3">{item.code}</td>
                <td className="px-4 py-3">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
        <p className="text-gray-500">Showing 1 to 10 out of 40 records</p>
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg font-bold ${
              currentPage === 1
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 hover:bg-blue-500 hover:text-white"
            }`}
          >
            <FaChevronLeft />
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-3 py-2 border rounded-lg font-bold hover:bg-blue-500 hover:text-white ${
                  currentPage === page
                    ? "border-blue-10 text-blue-10"
                    : "border-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg font-bold ${
              currentPage === totalPages
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-gray-300 hover:bg-blue-10 hover:text-white"
            }`}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemsTable;
