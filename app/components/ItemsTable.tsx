import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingScreen from "./LoadingScreen";

interface TableItem {
  category: string;
  name: string;
  image: string;
  code: string;
  amount: string;
}

const ItemsTable = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/items");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTableData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("An error has occurred");
        }
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(tableData.length / recordsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  if (loading) {
    return <LoadingScreen />; // Show loading screen while data is loading
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Table headers configuration
  const columns = [
    { label: "Select" },
    { label: "Category" },
    { label: "Item Name" },
    { label: "Image" },
    { label: "Code" },
    { label: "Amount" },
  ];

  return (
    <div className="pt-4 w-full relative bg-white">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm text-left">
          <thead className="bg-[#FAFAFA] text-gray-700">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 border-r font-manrope text-customGray text-[12px]`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: TableItem, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 font-manrope text-[#111827] text-[12px]"
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
        <p className="text-gray-500">
          Showing {(currentPage - 1) * recordsPerPage + 1} to{" "}
          {Math.min(currentPage * recordsPerPage, tableData.length)} out of{" "}
          {tableData.length} records
        </p>
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
                    ? "border-blue-500 text-blue-500"
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
                : "border-gray-300 hover:bg-blue-500 hover:text-white"
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
