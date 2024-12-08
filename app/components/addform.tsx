'use client';
import React, { useState } from 'react';
import InputField from './InputField';
import CustomButton from './CustomButton';

const Addform: React.FC = () => {
  const [formData, setFormData] = useState({
    category: '',
    image: '',
    amount: '',
    itemName: '',
    codeNumber: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    
  };

  return (
    <div className="flex bg-white">
      <form
        onSubmit={handleSubmit}
        className="mt-6 shadow-lg flex flex-col px-20 pt-4 w-full rounded-2xl relative "
      >
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
            value={formData.image}
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
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description<span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            placeholder="Input description"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2  h-[120px]
            border-gray-100 border-2 rounded-xl  shadow-sm focus:outline-none
            focus:ring-blue-500 focus:border-blue-500 sm:text-base text-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className='w-full bg-white flex justify-center items-center gap-3 py-5'>
          <CustomButton title='Cancel' containerClass='bg-white border w-[166px] h-[50px]'/>
          <CustomButton title='Update' containerClass='text-white border w-[166px] h-[50px]'/>
        </div>
      </form>
    </div>
  );
};

export default Addform;
