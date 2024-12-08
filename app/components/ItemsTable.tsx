import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import CustomButton from "./CustomButton";
import { MdModeEdit } from "react-icons/md";

// Interface representing the structure of an item in the table
interface TableItem {
  id: string
  category: string;
  name: string;
  image: string;
  code: string;
  amount: string;
}

const ItemsTable = () => {
  // State variables
  const [tableData, setTableData] = useState<TableItem[]>([]); // State to store table data
  const [loading, setLoading] = useState(true); // State to track the loading status
  const [error, setError] = useState<string | null>(null); // State to track any errors during data fetch
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page for pagination
  const recordsPerPage = 7; // Number of records to display per page
  const router = useRouter(); // Next.js router for navigation

  // Fetch data from the server on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/items");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTableData(data); // Populate table data with fetched data
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setError(error.message); // Handle any errors during fetch
        }
      } finally {
        setLoading(false); // Set loading to false once the fetch completes
      }
    };

    fetchData();
  }, []);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(tableData.length / recordsPerPage);

  // Handle direct page click
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Handle navigation to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle navigation to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Paginate data based on current page
  const paginatedData = tableData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Logic to confirm and handle item deletion
  const handleDeleteItem = (id: string) => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (userConfirmed) {
      console.log(`Delete Item with ID: ${id}`);
      const updatedData = tableData.filter((item) => item.id !== id);
      setTableData(updatedData); // Update the table data after deletion
    } else {
      console.log("Delete action canceled.");
    }
  };

  // Logic to handle edit and navigate to edit page
  const handleEditItem = (id: string) => {
    console.log(`Navigate to Edit Item with ID: ${id}`);
    router.push(`/items/update-product/${id}`); // Navigate to the edit product page
  };

  // Show loading screen if data is still loading
  if (loading) {
    return <LoadingScreen />;
  }

  // Handle errors during data fetch
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Define the table's column headers
  const columns = [
    { label: "Category" },
    { label: "Item Name" },
    { label: "Image" },
    { label: "Code" },
    { label: "Amount" },
    { label: "Actions" },
  ];

  return (
    <div className="pt-4 w-full relative bg-white">
      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse text-sm text-left">
          <thead className="bg-[#FAFAFA] text-gray-700">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 border-r font-manrope text-customGray text-[12px] ${
                    column.label === "Actions" ? "text-center" : ""
                  }`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item: TableItem) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 font-manrope text-[#111827] text-[12px]"
              >
                {/* Render table row data */}
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
                <td className="px-4 py-3 flex gap-2 justify-center items-center">
                  {/* Edit Button */}
                  <CustomButton
                    title="Edit Item"
                    leftIcon={<MdModeEdit size={24} />}
                    containerClass="!bg-[#EDBD1C] flex items-center justify-center gap-2 text-white !text-xs !px-4 !py-2"
                    onClick={() => handleEditItem(item.id)}
                  />
                  {/* Delete Button */}
                  <CustomButton
                    title="Delete Item"
                    leftIcon={<FaRegTrashAlt size={24} />}
                    containerClass="!bg-[#B90707] flex items-center justify-center gap-2 text-white text-[10px] !px-4 !py-2"
                    onClick={() => handleDeleteItem(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Section */}
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
          {/* Dynamic Page Numbers */}
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
