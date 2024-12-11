"use client"
import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import SelectField from "../../components/SelectField";
import WasteSalesTable from "../../components/Waste_Sales-Components/WasteSalesTable";

interface Product {
  amount: string;
  productId: string;
}

interface ProductData {
  name: string;
  _id: string;
}

export default function AddSales() {
  const [formValues, setFormValues] = useState<Product>({
    amount: "",
    productId: "", // Initialize with empty string
  });

  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddRow = () => {
    if (formValues.productId && formValues.amount) {
      setRows((prevRows) => [...prevRows, formValues]);
      setFormValues({ productId: "", amount: "" });
      setError(null);
      setSuccess(null);
    }
  };

  // Delete handler
  const handleDelete = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  // Edit handler
  const handleEdit = (index: number) => {
    const row = rows[index];
    setFormValues({ productId: row.productId, amount: row.amount });
    setRows((prevRows) =>
      prevRows.filter((_, i) => i !== index) // Optionally, remove the row being edited
    );
  };

  const handleSubmit = async () => {
    if (rows.length === 0) return;
    const salesData = rows.map((row) => ({
      productId: row.productId,
      quantity: parseInt(row.amount),
    }));

    try {
      const response = await fetch(
        "https://inventory-backend-sqbj.onrender.com/products/sales",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(salesData),
        }
      );
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setSuccess("Sales processed successfully.");
      setError(null);
      setRows([]);
    } catch (error: any) {
      setError(`Error: ${error.message}`);
      setSuccess(null);
      setRows([]);
    }
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full min-h-[670px] rounded-2xl font-Poppins overflow-y-scroll">
      <form
        className="flex items-center flex-col gap-y-10"
        onSubmit={(e) => e.preventDefault()}
      >
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

        <CustomButton
          title="Add"
          onClick={handleAddRow}
          containerClass="text-white !w-[166px]"
        />
        <WasteSalesTable
          rows={rows}
          onEdit={handleEdit}  // Pass the edit handler here
          onDelete={handleDelete}
        />
        <CustomButton
          title="Submit"
          onClick={handleSubmit}
          containerClass={`text-white !w-[166px] mb-5 ${rows.length === 0 ? "hidden" : ""}`}
        />

        {error && (
          <div className="text-center">
            <p className="text-red-500 mt-4">Something went wrong! Please check your amount input</p>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
        )}
        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
}
