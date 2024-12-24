"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "../LoadingScreen";
import TablePagination from "./TablePagination";
import { TableItem } from "../../interfaces/TableItem";
import OrderWidget from "./Orderwidget";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// Main component for rendering the items table with pagination, loading, and error handling
const OrdersTable = () => {
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
      const response = await fetch(`${apiBaseUrl}/orders`);
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
      setTableData(data); 
    } catch (error) {
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





  if (loading) return <LoadingScreen />;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="pt-4 w-full relative bg-white">
      {/* Main Table Logic Wrapper */}
      <div className="overflow-x-auto">
        {/* Show Empty State if no data is present */}
       {tableData.map((order) =>
  order.record && order.record.length > 0 ? (
    <OrderWidget key={order._id} order={order} />
  ) : (
    <div key={order._id} className="text-gray-500">No Records Found</div>
  )
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

export default OrdersTable;
