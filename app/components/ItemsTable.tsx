"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import LoadingScreen from "./LoadingScreen";
import CustomButton from "./CustomButton";
import { MdModeEdit } from "react-icons/md";
import EmptyTableState from "./EmptyTableState";
import Image from "next/image";

// Interface representing the structure of an item in the table
interface TableItem {
  _id: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
}

const ItemsTable = () => {
  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const router = useRouter();

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://inventory-backend-sqbj.onrender.com/products"
      );
      if (!response.ok) throw new Error("Failed to fetch data");
      const data: TableItem[] = await response.json();
      setTableData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPages = Math.ceil(tableData.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // DELETE Item Logic
  const handleDeleteItem = async (itemId: string) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete this item?`
    );

    if (!userConfirmed) return;

    try {
      setLoading(true); // Set a loading state during the delete operation
      const response = await fetch(
        `https://inventory-backend-sqbj.onrender.com/products/${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the item.");
      }

      // Refetch data after successful deletion
      await fetchData();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditItem = (name: string) => {
    router.push(`/items/update-product/${name}`);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="pt-4 w-full relative bg-white">
      {/* Table Logic */}
      <div className="overflow-x-auto">
        {paginatedData.length === 0 ? (
          <EmptyTableState />
        ) : (
          <table className="table-auto w-full border-collapse text-sm text-left">
            <thead className="bg-[#FAFAFA] text-gray-700">
              <tr>
                {[
                  "Category",
                  "Name",
                  "Image",
                  "Price",
                  "Quantity",
                  "Actions",
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
              {paginatedData.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 font-manrope text-[#111827] text-[12px]"
                >
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">
                    <Image
                      src={`https://inventory-backend-sqbj.onrender.com${item.image}`}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="w-10 h-10 mx-auto"
                    />
                  </td>
                  <td className="px-4 py-3">{item.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{item.quantity}</td>
                  <td className="px-4 py-3 flex gap-2 justify-center items-center">
                    <CustomButton
                      title="Edit Item"
                      leftIcon={<MdModeEdit size={20} />}
                      containerClass="!bg-[#EDBD1C] flex items-center justify-center gap-2 text-white !text-xs !px-4 !py-2"
                      onClick={() => handleEditItem(item.name)}
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
        )}
      </div>
      {/* Pagination Section */}
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
    </div>
  );
};

export default ItemsTable;