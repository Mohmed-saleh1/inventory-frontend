'use client';
import React, { useState } from "react";

import axios from "axios"; 
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";

interface Product {
  category: string;
  itemName: string;
  amount: string;
  id: string;
}

export default function AddSalesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formValues, setFormValues] = useState<Product>({
    category: "",
    itemName: "",
    amount: "",
    id: "",
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => {
    e.preventDefault();

    if (products.length > 0) {
      
      const salesData = products.map((product) => {
        const parsedAmount = parseInt(product.amount); 
        if (isNaN(parsedAmount)) {
          alert(`Amount for product ID ${product.id} is not a valid number.`);
          return null; 
        }
        return {
          productId: product.id,
          quantity: parsedAmount,
        };
      }).filter(Boolean);

      try {
        const response = await axios.post(
          "https://inventory-backend-sqbj.onrender.com/products/sales",
          salesData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Sales processed successfully", response.data);
          alert("Sales submitted successfully!");
          setProducts([]); 
        }
      } catch (error) {
        console.error("Error processing sales", error);
        alert("Failed to submit sales. Please check API compatibility or input data.");
      }
    } else {
      alert("No products to submit.");
    }
  };

  const handleEdit = (index: number) => {
    setFormValues(products[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full rounded-2xl">
      <form>
        <div className="grid grid-cols-5 gap-x-20">
          <InputField
            label="Category"
            type="text"
            name="category"
            placeholder="Search"
            value={formValues.category}
            onChange={handleChange}
            required={true}
            className="h-[40px] rounded-[6px] border[1px]"
          />
          <InputField
            label="Item Name"
            type="text"
            name="itemName"
            placeholder="Search"
            value={formValues.itemName}
            onChange={handleChange}
            required={true}
            className="h-[40px] rounded-[6px] border[1px]"
          />
          <InputField
            label="ID"
            type="text"
            name="id"
            placeholder="Enter ID"
            value={formValues.id}
            onChange={handleChange}
            required={true}
            className="h-[40px] rounded-[6px] border[1px]"
          />
          <InputField
            label="Enter amount"
            type="text"
            name="amount"
            placeholder="Enter amount"
            value={formValues.amount}
            onChange={handleChange}
            required={true}
            className="h-[40px] rounded-[6px] border[1px]"
          />
          <CustomButton
            title={editingIndex !== null ? "Update" : "Add"}
            containerClass="bg-[#006EC4] text-white text-xl border rounded-md pt-1 mt-12 w-[100px] h-[40px]"
            onClick={() => {
              if (
                formValues.category &&
                formValues.itemName &&
                formValues.id &&
                formValues.amount
              ) {
                if (editingIndex !== null) {
                  const updatedProducts = [...products];
                  updatedProducts[editingIndex] = formValues;
                  setProducts(updatedProducts);
                  setEditingIndex(null);
                } else {
                  setProducts([...products, formValues]);
                }
                setFormValues({
                  category: "",
                  itemName: "",
                  amount: "",
                  id: "",
                });
              } else {
                alert("Please fill out all fields.");
              }
            }}
            type="button"
          />
        </div>
      </form>

      <div className="flex justify-center items-center mt-10">
        <CustomButton
          title="Submit"
          containerClass="bg-[#006EC4] text-white text-xl border rounded-md w-[189px] h-[55px]"
          onClick={handleSubmit}
          type="button"
        />
      </div>

      <div className="my-6 text-2xl font-Poppins">
        {products.length > 0 ? (
          <div>
            <div className="grid grid-cols-5 space-x- bg-[#D9D9D940] shadow shadow-[#006EC480] text-black pl-6 pr-1 py-2 rounded-t-lg">
              <div>Category</div>
              <div>Item Name</div>
              <div>ID</div>
              <div>Amount</div>
              <div>Actions</div>
            </div>

            <div className="space-y-5 mt-5">
              {products.map((product, index) => (
                <div key={index} className="flex justify-between bg-white shadow-xl rounded- border border-gray-300 pl-6 pr-1 py-[5px]">
                  <div>{product.category}</div>
                  <div>{product.itemName}</div>
                  <div>{product.id}</div>
                  <div>{product.amount}</div>
                  <div className="flex space-x-2">
                    <CustomButton
                      title="Edit"
                      containerClass="bg-[#EDBD1C] text-white text-xl border rounded-md pt-1 w-[100px] h-[40px]"
                      onClick={() => handleEdit(index)}
                    />
                    <CustomButton
                      title="Delete"
                      containerClass="bg-[#B90707] text-white text-xl border rounded-md pt-1 w-[100px] h-[40px]"
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No products added yet.</p>
        )}
      </div>
    </div>
  );
}
