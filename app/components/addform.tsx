'use client';
import React, { useState } from 'react';
import InputField from './InputField';
import CustomButton from './CustomButton';

const Addform: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '',
    image: null, 
    amount: '',
    itemName: '',
    codeNumber: '',
    description: '',
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    
    if (e.target.type === 'file') {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    const formDataToSend = new FormData();
    formDataToSend.append('category', formData.category);
    formDataToSend.append('name', formData.itemName);
    formDataToSend.append('price', formData.amount);
    formDataToSend.append('quantity', formData.codeNumber);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    console.log([...formDataToSend.entries()]);
    

    try {
      
      const response = await fetch('https://inventory-backend-sqbj.onrender.com/products', {
        method: 'POST',
        body: formDataToSend,
      });
      

      if (response.ok) {
        const data = await response.json();
        alert('Product added successfully!');
        console.log('Response:', data);

        
        setFormData({
          category: '',
          image: null,
          amount: '',
          itemName: '',
          codeNumber: '',
          description: '',
        });
      } else {
        alert('Failed to add product. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection.');
    }
  };

  return (
    <div className="flex bg-white">

   
      <form
        onSubmit={handleSubmit}
        className="mt-6 shadow-lg flex flex-col px-20 pt-4 w-full rounded-2xl relative"
      >
           <CustomButton
  title="Back to Items" 
  onClick={() => window.history.back()} 
  containerClass="text-white  ml-auto"
/>
        <h1 className="text-2xl text-black font-semibold mb-4">Add New Item</h1>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-x-44">
          <InputField
            label="Category"
            type="text"
            name="category"
            placeholder="Choose Category"
            required={true}
            value={formData.category}
            onChange={handleChange}
          />
          <InputField
            label="Item Name"
            type="text"
            name="itemName"
            placeholder="Enter item name"
            required={true}
            value={formData.itemName}
            onChange={handleChange}
          />
          <InputField
            label="Image"
            type="file"
            name="image"
            required={true}
            onChange={handleChange}
          />
          <InputField
            label="Code Number"
            type="text"
            name="codeNumber"
            placeholder="Enter code number"
            required={true}
            value={formData.codeNumber}
            onChange={handleChange}
          />
          <InputField
            label="Amount"
            type="number"
            name="amount"
            placeholder="Enter item number"
            required={true}
            value={formData.amount}
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mt-4 k">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Input description"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 h-[120px]
            border-gray-100 border-2 rounded-xl shadow-sm focus:outline-none
            focus:ring-blue-500 focus:border-blue-500 sm:text-base text-blac"
          />
        </div>

        {/* Submit Button */}
        <div className="w-full bg-white flex justify-center items-center gap-3 py-5">
          <CustomButton title="Cancel" containerClass="bg-white border w-[166px] h-[50px]" />
          <CustomButton title="Add Item" containerClass="text-white border w-[166px] h-[50px]" />
        </div>
      </form>
    </div>
  );
};

export default Addform;
