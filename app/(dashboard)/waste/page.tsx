"use client";
import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import SelectField from "../../components/SelectField";
import WasteTable from "../../components/Waste-Components/WasteTable";

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
  // State to store form values for productId and amount
  const [formValues, setFormValues] = useState<Product>({
    amount: "",
    productId: "",
  });

  // State to store the list of products fetched from the API
  const [products, setProducts] = useState<ProductData[]>([]);

  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState<Product[]>([]);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading state to true while fetching
      try {
        const response = await fetch(
          "https://inventory-backend-sqbj.onrender.com/products"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data); // Update the products state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts(); // Call the function to fetch products
  }, []);

  // Handle input changes for form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }); // Update form values based on input changes
  };

  // Handle adding a new row to the table
  const handleAddRow = () => {
    if (formValues.productId && formValues.amount) {
      setRows((prevRows) => [...prevRows, formValues]); // Add the form values as a new row
      setFormValues({ productId: "", amount: "" }); // Reset the form fields after adding the row
      setError(null);
      setSuccess(null);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (rows.length === 0) return; // Prevent submission if there are no rows

    // Prepare data for the API
    const wasteData = rows.map((row) => ({
      productId: row.productId,
      quantity: parseInt(row.amount), // Convert amount to integer
    }));

    try {
      // Make API call to submit waste data
      const response = await fetch(
        "https://inventory-backend-sqbj.onrender.com/products/waste",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wasteData), // Send waste data as the request body
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSuccess("Waste processed successfully."); // Set success message
      setError(null); // Clear any previous error messages
      setRows([]); // Optionally clear rows
    } catch (error: any) {
      setError(`Error: ${error.message}`); // Set error message if API call fails
      setSuccess(null); // Clear any previous success messages
      setRows([]);
    }
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full min-h-[670px] rounded-2xl font-Poppins overflow-y-scroll">
      <form
        className="flex items-center flex-col gap-y-10"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Form for selecting product and entering amount */}
        <div className="flex justify-between items-center gap-10 w-full">
          {/* Product selection dropdown */}
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

        {/* Button to add a new row to the table */}
        <CustomButton
          title="Add"
          onClick={handleAddRow}
          containerClass="text-white !w-[166px]"
        />

        {/* Table to display added rows */}
        <WasteTable rows={rows} />

        {/* Button to submit the rows as waste data */}
        <CustomButton
          title="Submit"
          onClick={handleSubmit}
          containerClass={`text-white !w-[166px] mb-5 ${
            rows.length === 0 ? "hidden" : ""
          }`}
        />

        {/* Display error or success message */}
        {error && (
          <div className="text-center">
            <p className="text-red-500 mt-4">{`Something went wrong! Please check your amount input`}</p>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
        )}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
}
