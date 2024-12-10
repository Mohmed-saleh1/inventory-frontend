'use client';
import React, { useState } from "react";
import InputField from "../../components/InputField";
import CustomButton from "../../components/CustomButton";


// Define the Product interface to structure the product data
interface Product {
  category: string;
  itemName: string;
  code: string;
  amount: string;
}

export default function AddSalesPage() {
  // State to store the list of products
  const [products, setProducts] = useState<Product[]>([]);
  
  // State to handle the form values for adding or editing a product
  const [formValues, setFormValues] = useState<Product>({
    category: "",
    itemName: "",
    code: "",
    amount: "",
  });

  // State to track if a product is being edited and store its index
  const [editingIndex, setEditingIndex] = useState<number | null>(null); 

  // Handle input changes in the form and update the form values
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission for adding or updating a product
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formValues.category &&
      formValues.itemName &&
      formValues.code &&
      formValues.amount
    ) {
      if (editingIndex !== null) {
        // Update an existing product if editing
        const updatedProducts = [...products];
        updatedProducts[editingIndex] = formValues;
        setProducts(updatedProducts);
        setEditingIndex(null); // Reset the editing index
      } else {
        // Add a new product to the list
        setProducts([...products, formValues]);
      }
      // Reset the form values after submission
      setFormValues({
        category: "",
        itemName: "",
        code: "",
        amount: "",
      });
    } else {
      // Show an alert if the form is incomplete
      alert("Please fill out all fields.");
    }
  };

  // Handle the edit button click and populate the form with the product data
  const handleEdit = (index: number) => {
    setFormValues(products[index]);
    setEditingIndex(index);
  };

  // Handle the delete button click and remove the product
  const handleDelete = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index); // Remove the selected product
    setProducts(updatedProducts);
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full rounded-2xl">
      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-5 gap-x-20">
          {/* Input fields for the form */}
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
            label="Code"
            type="text"
            name="code"
            placeholder="Enter code"
            value={formValues.code}
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
            title="Add"
            containerClass="bg-[##006EC4] text-white text-xl border rounded-md pt-1 mt-8 w-[100px] h-[40px]"
          />
        </div>
      </form>
      <div className="flex justify-center items-center mt-10">
        {/* Submit or Update button */}
        <CustomButton
          title={editingIndex !== null ? "Update" : "Submit"}
          containerClass="bg-[#006EC4] text-white text-xl border rounded-md w-[189px] h-[55px]"
        />
      </div>

      {/* Product List Section */}
      <div className="my-6 text-2xl font-Poppins">
        {products.length > 0 ? (
          <div>
            {/* Table Header */}
            <div className="grid grid-cols-5 space-x- bg-[#D9D9D940] shadow shadow-[#006EC480] text-black pl-6 pr-1 py-2 rounded-t-lg">
              <div>Category</div>
              <div>Item Name</div>
              <div>Code</div>
              <div>Amount</div>
              <div>Actions</div>
            </div>

            {/* Table Rows */}
            <div className="space-y-5 mt-5">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between bg-white shadow-xl rounded- border border-gray-300 pl-6 pr-1 py-[5px]"
                >
                  <div>{product.category}</div>
                  <div>{product.itemName}</div>
                  <div>{product.code}</div>
                  <div>{product.amount}</div>
                  <div className="flex space-x-2">
                    {/* Edit button */}
                    <CustomButton
                      title="Edit"
                      containerClass="bg-[#EDBD1C] text-white text-xl border rounded-md pt-1 w-[100px] h-[40px]"
                      onClick={() => handleEdit(index)}
                    />
                    {/* Delete button */}
                    <CustomButton
                      title="Delete"
                      containerClass="bg-[#E74C3C] text-white text-xl border rounded-md pt-1 w-[100px] h-[40px]"
                      onClick={() => handleDelete(index)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Message when no products are available
          <p className="text-center text-gray-500">No products added yet.</p>
        )}
      </div>
    </div>
  );
}
