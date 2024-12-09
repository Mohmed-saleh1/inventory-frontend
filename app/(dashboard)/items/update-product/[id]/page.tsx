"use client";
import { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import CustomButton from "../../../../components/CustomButton";
import ImageList from "../../../../components/ImageList";
import InputField from "../../../../components/InputField";

const UpdateProduct = () => {
  // State to manage form data for updating product details
  const [formData, setFormData] = useState({
    category: "",
    image: null,
    quantity: "",
    name: "",
    price: "",
    description: "",
  });

  const { id } = useParams();
  const pathname = usePathname();

  /** 
   * Fetch product details from the server and populate the form on component mount.
   * Uses product ID from the URL to fetch the correct product details.
   */
  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await fetch(
        `https://inventory-backend-sqbj.onrender.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details.");
      }

      const data = await response.json();
      console.log("Fetched data: ", data);

      // Update the form state with fetched product details
      setFormData({
        category: data.category || "",
        image: data.image || null,
        quantity: data.quantity || "",
        name: data.name || "",
        price: data.price || "",
        description: data.description || "",
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Fetch product details when the component's pathname or ID changes
  useEffect(() => {
    if (!pathname) return;

    const safeId = Array.isArray(id) ? id[0] : id;
    if (safeId) {
      fetchProductDetails(safeId);
    }
  }, [pathname, id]);

  /** 
   * Handle change for input fields. Differentiates between regular inputs and file inputs.
   * Updates the corresponding field in the formData state.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    if (type === "file") {
      const file = e.target.files?.[0];
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  return (
    <div className="flex justify-center items-center gap-5">
      {/*Placeholder Images*/}
      <ImageList />
      <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-[670px]">
        <form className="flex items-center flex-col h-[600px] gap-y-10 relative">
          {/* Form Section with Input Fields */}
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
              placeholder="Upload Image"
              required={true}
              onChange={handleChange}
              className="w-full"
            />
            <InputField
              label="Price"
              type="number"
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

          {/* Buttons at the bottom for form actions */}
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
