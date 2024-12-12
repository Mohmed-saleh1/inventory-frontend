"use client";
import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import SelectField from "../../components/SelectField";
import WasteSalesTable from "../../components/Waste_Sales-Components/WasteSalesTable";

// Define interfaces for product and product data
interface Product {
  amount: string;
  productId: string;
}

interface ProductData {
  name: string;
  _id: string;
}

export default function Waste() {
  // State for form inputs
  const [formValues, setFormValues] = useState<Product>({
    amount: "",
    productId: "", // Initialize with an empty string
  });

  // State for products fetched from the API
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false); // Loading indicator for fetching products
  const [rows, setRows] = useState<Product[]>([]); // Tracks added rows in the table
  const [error, setError] = useState<string | null>(null); // Tracks any errors
  const [success, setSuccess] = useState<string | null>(null); // Tracks success message

  // Fetch products from the API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://inventory-backend-sqbj.onrender.com/products"
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Add a new row to the table
  const handleAddRow = () => {
    if (formValues.productId && formValues.amount) {
      setRows((prevRows) => [...prevRows, formValues]);
      setFormValues({ productId: "", amount: "" }); // Reset the form fields
      setError(null);
      setSuccess(null);
    }
  };

  // Delete a specific row from the table
  const handleDelete = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  // Edit an existing row in the table
  const handleEdit = (index: number) => {
    const row = rows[index];
    setFormValues({ productId: row.productId, amount: row.amount });
    setRows((prevRows) => prevRows.filter((_, i) => i !== index)); // Optionally, remove the row being edited
  };

  // Submit the waste data to the API
  const handleSubmit = async () => {
    if (rows.length === 0) return; // Ensure there is data to submit

    // Prepare waste data payload
    const wasteData = rows.map((row) => ({
      productId: row.productId,
      quantity: parseInt(row.amount),
    }));

    try {
      const response = await fetch(
        "https://inventory-backend-sqbj.onrender.com/products/waste",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wasteData),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setSuccess("Waste processed successfully.");
      setError(null);
      setRows([]); // Clear the table rows
    } catch (error: any) {
      setError(`Error: ${error.message}`);
      setSuccess(null);
      setRows([]); // Reset rows in case of failure
    }
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full min-h-[670px] rounded-2xl font-Poppins overflow-y-scroll">
      {/* Form for adding and submitting waste data */}
      <form
        className="flex items-center flex-col gap-y-10"
        onSubmit={(e) => e.preventDefault()} // Prevent default form submission behavior
      >
        <div className="flex justify-between items-center gap-10 w-full">
          {/* Dropdown for selecting a product */}
          <SelectField
            label="Product"
            name="productId"
            value={formValues.productId}
            onChange={handleChange}
            required
            className="w-full"
            options={
              loading
                ? [{ value: "", label: "Loading products..." }]
                : products.map((product) => ({
                    value: product._id,
                    label: product.name,
                  }))
            }
          />
          {/* Input field for entering amount */}
          <InputField
            label="Amount"
            type="number"
            name="amount"
            placeholder="Enter Amount"
            required
            value={formValues.amount}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        {/* Button to add a new row */}
        <CustomButton
          title="Add"
          onClick={handleAddRow}
          containerClass="text-white !w-[166px]"
        />

        {/* Table to display added rows */}
        <WasteSalesTable
          rows={rows}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />

        {/* Button to submit the data */}
        <CustomButton
          title="Submit"
          onClick={handleSubmit}
          containerClass={`text-white !w-[166px] mb-5 ${
            rows.length === 0 ? "hidden" : ""
          }`}
        />

        {/* Error message display */}
        {error && (
          <div className="text-center">
            <p className="text-red-500 mt-4">
              Something went wrong! Please check your amount input
            </p>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
        )}

        {/* Success message display */}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
}
