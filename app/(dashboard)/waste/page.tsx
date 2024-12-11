"use client";
import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";
import SelectField from "../../components/SelectField";

interface Product {
  amount: string;
  productId: string;
}

interface ProductData {
  name: string;
  _id: string;
}

export default function Waste() {
  const [formValues, setFormValues] = useState<Product>({
    amount: "",
    productId: "",
  });
  const [products, setProducts] = useState<ProductData[]>([]); // Store fetched products
  const [loading, setLoading] = useState(false); // Loading state for fetching products
  const [rows, setRows] = useState<Product[]>([]); // Rows for the table

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://inventory-backend-sqbj.onrender.com/products"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
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
      setFormValues({ productId: "", amount: "" }); // Reset the form values
    }
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full min-h-[670px] rounded-2xl font-Poppins">
      <form
        className="flex items-center flex-col h-[600px] gap-y-10 relative"
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

        <table className="w-full text-center border-separate border-spacing-y-5 table-fixed">
          <thead className="bg-[#D9D9D940] shadow shadow-[#006EC480] text-black pl-6 pr-1 py-2 rounded-t-lg">
            <tr>
              {["Item ID", "Amount"].map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-3 font-manrope text-customGray text-[12px]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border">
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border border-tableBorder drop-shadow-tableShadow"
              >
                <td className="px-4 py-3 border border-r-0 rounded-lg rounded-tr-none rounded-br-none">
                  {row.productId}
                </td>
                <td className="px-4 py-3 border border-l-0 rounded-lg rounded-tl-none rounded-bl-none">
                  {row.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <CustomButton
          title="Submit"
          onClick={() => {}}
          containerClass={`text-white !w-[166px] ${rows.length ===0 ? "hidden": ""}`}
        />
      </form>
    </div>
  );
}
