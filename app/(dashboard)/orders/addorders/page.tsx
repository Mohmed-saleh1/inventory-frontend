"use client";

import { useEffect, useState } from "react";
import SelectField from "../../../components/SelectField";
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import WasteSalesTable from "../../../components/Waste_Sales-Components/WasteSalesTable";

interface Product {
  amount: string;
  productId: string;
}

interface ProductData {
  name: string;
  _id: string;
}

export default function Addorders() {
  // State to manage form values for adding orders
  const [formValues, setFormValues] = useState<Product>({
    amount: "",
    productId: "",
  });

  // State to store the list of available products fetched from the API
  const [products, setProducts] = useState<ProductData[]>([]);

  // State for loading indicator while fetching products
  const [loading, setLoading] = useState(false);

  // State to manage rows of products added to the table
  const [rows, setRows] = useState<Product[]>([]);

  // States to handle success and error messages
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch the list of products from the API when the component loads
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

  // Update form values when user interacts with input or select fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Add a new row to the table with the current form values
  const handleAddRow = () => {
    if (formValues.productId && formValues.amount) {
      setRows((prevRows) => [...prevRows, formValues]);
      setFormValues({ productId: "", amount: "" });
      setError(null);
      setSuccess(null);
    }
  };

  // Delete a row from the table by its index
  const handleDelete = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  // Edit a row by pre-filling its values in the form and removing it from the table
  const handleEdit = (index: number) => {
    const row = rows[index];
    setFormValues({ productId: row.productId, amount: row.amount });
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  // Submit the list of orders to the API
  const handleSubmit = async () => {
    if (rows.length === 0) return;

    const ordersData = rows.map((row) => ({
      productId: row.productId,
      quantity: parseInt(row.amount),
    }));

    try {
      const response = await fetch(
        "https://inventory-backend-sqbj.onrender.com/products/add-orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ordersData),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      setSuccess("Orders processed successfully.");
      setError(null);
      setRows([]);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccess(null);
      setRows([]);
    }
  };

  return (
    // Main container for the Add Orders form and table
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full min-h-[670px] rounded-2xl font-Poppins overflow-y-scroll">
      {/* Form section for adding products */}
      <form
        className="flex items-center flex-col gap-y-10"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Input fields for product selection and amount */}
        <div className="flex justify-between items-center gap-10 w-full">
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

        {/* Button to add a product to the table */}
        <CustomButton
          title="Add"
          onClick={handleAddRow}
          containerClass="text-white !w-[166px]"
        />

        {/* Table displaying added products */}
        <WasteSalesTable
        rows={rows}
        onEdit={handleEdit}
        onDelete={handleDelete}
        products={products} // Pass the product list to display names instead of IDs
        />

        {/* Submit button for submitting orders data */}
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
