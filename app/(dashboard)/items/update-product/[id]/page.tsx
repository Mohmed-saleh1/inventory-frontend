"use client";

import CustomButton from "../../../../components/CustomButton";
import ImageList from "../../../../components/ImageList";
import InputField from "../../../../components/InputField";
import { useState } from "react";

const UpdateProduct = () => {
  const [formData, setFormData] = useState({
    category: "",
    image: "",
    quantity: "",
    name: "",
    price: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <ImageList />
      <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-[670px]">
        <form className="flex items-center flex-col h-[600px] gap-y-10 relative">
          <div className="flex justify-between items-center gap-10 w-full">
            <InputField
              label="Category"
              type="text"
              name="category"
              placeholder="Choose Category"
              required={true}
              onChange={handleChange}
              value={formData.category}
              className="w-full"
            />
            <InputField
              label="Item Name"
              type="text"
              name="name"
              placeholder="Item Name"
              required={true}
              onChange={handleChange}
              value={formData.name}
              className="w-full"
            />
          </div>
          <div className="flex justify-between items-center gap-10 w-full">
            <InputField
              label="Image"
              type="file"
              name="image"
              placeholder="Choose Image"
              required={true}
              onChange={handleChange}
              value={formData.image}
              className="w-full"
            />

            <InputField
              label="Price"
              type="text"
              name="price"
              placeholder="Price"
              required={true}
              onChange={handleChange}
              value={formData.price}
              className="w-full"
            />
          </div>
          <div className="flex justify-between items-center w-full gap-10">
            <InputField
              label="Description"
              type="text"
              name="description"
              placeholder="Description"
              required={true}
              onChange={handleChange}
              value={formData.description}
              className="w-full"
            />

            <InputField
              label="Quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              required={true}
              onChange={handleChange}
              value={formData.quantity}
              className="w-full"
            />
          </div>

          <div className="w-full bg-white flex justify-center items-end gap-3 py-5 absolute bottom-0 left-0">
            <CustomButton
              title="Cancel"
              containerClass="bg-white border !w-[166px] !h-[50px]"
            />
            <CustomButton
              title="Update"
              containerClass="text-white border !w-[166px] !h-[50px] !bg-[#EDBD1C]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
