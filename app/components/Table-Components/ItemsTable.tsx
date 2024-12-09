"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../LoadingScreen";
import EmptyTableState from "./EmptyTableState";
import TableData from "./TableData";
import TablePagination from "./TablePagination";

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
          <TableData
            paginatedData={paginatedData}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
          />
        )}
      </div>
      {/* Pagination Section */}
      <TablePagination
        currentPage={currentPage}
        recordsPerPage={recordsPerPage}
        tableData={tableData}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        handlePageClick={handlePageClick}
        totalPages={totalPages}
      />
    </div>
  );
};

export default ItemsTable;
