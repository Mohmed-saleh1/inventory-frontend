"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../LoadingScreen";
import EmptyTableState from "./EmptyTableState";
import TableData from "./TableData";
import TablePagination from "./TablePagination";
import { TableItem } from "../../interfaces/TableItem";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// Main component for rendering the items table with pagination, loading, and error handling
const ItemsTable = () => {
  const [tableData, setTableData] = useState<TableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7; // Items per page for pagination
  const router = useRouter();

  /**
   * Fetch data from the backend API
   * Handles loading and error states during the fetch
   */
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiBaseUrl}/products`
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

  /**
   * Handle moving to the next page in the pagination
   */
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  /**
   * Handle moving to the previous page in the pagination
   */
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  /**
   * Handle clicking on a specific page number in pagination
   */
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = tableData.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  /**
   * Handles item deletion with user confirmation
   * Performs API delete operation and refetches table data on success
   */
  const handleDeleteItem = async (itemId: string) => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete this item?`
    );

    if (!userConfirmed) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${apiBaseUrl}/products/${itemId}`,
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

  /**
   * Handles navigation to the edit product page
   * Fetches the product details and passes them via query string
   */
  const handleEditItem = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${apiBaseUrl}/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details.");
      }

      const productDetails = await response.json();
      router.push(
        `/items/update-product/${id}?product=${encodeURIComponent(
          JSON.stringify(productDetails)
        )}`
      );
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="pt-4 w-full relative bg-white">
      {/* Main Table Logic Wrapper */}
      <div className="overflow-x-auto">
        {/* Show Empty State if no data is present */}
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
      {/* Pagination Component */}
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
