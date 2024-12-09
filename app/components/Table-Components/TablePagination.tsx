import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const TablePagination = ({
  currentPage,
  recordsPerPage,
  tableData,
  handlePreviousPage,
  totalPages,
  handlePageClick,
  handleNextPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
      <p className="text-gray-500">
        Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
        {Math.min(currentPage * recordsPerPage, tableData.length)} out of{" "}
        {tableData.length} records
      </p>
      <div className="flex items-center space-x-2">
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
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-2 border rounded-lg font-bold hover:bg-blue-500 hover:text-white ${
                currentPage === page
                  ? "border-blue-500 text-blue-500"
                  : "border-gray-300"
              }`}
            >
              {page}
            </button>
          );
        })}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-lg font-bold ${
            currentPage === totalPages
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-gray-300 hover:bg-blue-500 hover:text-white"
          }`}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
