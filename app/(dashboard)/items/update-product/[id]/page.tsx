"use client";

import { useEffect, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import CustomButton from "../../../../components/CustomButton";
import ImageList from "../../../../components/ImageList";
import InputField from "../../../../components/InputField";
import LoadingScreen from "../../../../components/LoadingScreen";

// Define the structure of the form data for type safety
interface FormData {
  category: string;
  image: File | null;
  quantity: string;
  name: string;
  price: string;
  description: string;
};

const UpdateProduct = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    category: "",
    image: null,
    quantity: "",
    name: "",
    price: "",
    description: "",
  });

  // State for loading indicator and error message
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State to track updated image URL after submission
  const [updatedImageUrl, setUpdatedImageUrl] = useState<{
    image: string;
    _id: string;
  } | null>(null);

  const { id } = useParams(); // Extract product ID from the URL
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Fetch the product details based on product ID
   * Populates the form fields with fetched product data
   */
  const fetchProductDetails = async (productId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://inventory-backend-sqbj.onrender.com/products/${productId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details.");
      }

      const data = await response.json();
      setFormData({
        category: data.category || "",
        image: null,
        quantity: String(data.quantity) || "",
        name: data.name || "",
        price: String(data.price) || "",
        description: data.description || "",
      });
      setUpdatedImageUrl({ image: data.image, _id: data._id }); // Set the updated image details
    } catch (error) {
      console.error("Error fetching product details:", error);
      setErrorMessage("Unable to fetch product details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch product details on component mount or when `id` changes
  useEffect(() => {
    if (!pathname) return;

    const safeId = Array.isArray(id) ? id[0] : id;
    if (safeId) fetchProductDetails(safeId);
  }, [pathname, id]);

  /**
   * Handle input field changes and set form data in state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files?.[0] || null : value,
    });
  };

  /**
   * Handle form submission logic
   * Sends updated product data to the server
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!id) {
        setErrorMessage("Invalid product ID.");
        return;
      }

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) formDataToSend.append(key, value as string | Blob);
      });

      const response = await fetch(
        `https://inventory-backend-sqbj.onrender.com/products/${id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Error updating product.");
      }

      const updatedProduct = await response.json();
      setUpdatedImageUrl({ image: updatedProduct.image, _id: updatedProduct._id });
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage("Error updating product.");
    }
  };

  return isLoading ? (
    // Render a loading screen if data is still being fetched
    <LoadingScreen />
  ) : (
    <div className="flex justify-center items-center gap-5">
      {/* Display the product image list here */}
      <ImageList productId={Array.isArray(id) ? id[0] : id} updatedImage={updatedImageUrl} />

      {/* Main form container for product details update */}
      <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-[670px]">
        <form
          className="flex items-center flex-col h-[600px] gap-y-10 relative"
          onSubmit={handleSubmit}
        >
          {/* Display any error message */}
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          {/* Input fields for category and item name */}
          <div className="flex justify-between items-center gap-10 w-full">
            <InputField
              label="Category"
              type="text"
              name="category"
              placeholder="Choose Category"
              required
              onChange={handleChange}
              value={formData.category}
              className="w-full"
            />
            <InputField
              label="Item Name"
              type="text"
              name="name"
              placeholder="Item Name"
              required
              onChange={handleChange}
              value={formData.name}
              className="w-full"
            />
          </div>

          {/* Input fields for image upload and price */}
          <div className="flex justify-between items-center gap-10 w-full">
            <InputField
              label="Image"
              type="file"
              name="image"
              placeholder="Upload Image"
              onChange={handleChange}
              className="w-full"
            />
            <InputField
              label="Price"
              type="number"
              name="price"
              placeholder="Price"
              required
              onChange={handleChange}
              value={formData.price}
              className="w-full"
            />
          </div>

          {/* Input fields for description and quantity */}
          <div className="flex justify-between items-center w-full gap-10">
            <InputField
              label="Description"
              type="text"
              name="description"
              placeholder="Description"
              required
              onChange={handleChange}
              value={formData.description}
              className="w-full"
            />
            <InputField
              label="Quantity"
              type="number"
              name="quantity"
              placeholder="Quantity"
              required
              onChange={handleChange}
              value={formData.quantity}
              className="w-full"
            />
          </div>

          {/* Form footer with action buttons */}
          <div className="w-full bg-white flex justify-center items-end gap-3 py-5 absolute bottom-0 left-0">
            {/* Cancel button to return to items page */}
            <CustomButton
              title="Cancel"
              containerClass="bg-white border !w-[166px] !h-[50px]"
              onClick={() => router.push("/items")}
              type="button"
            />
            {/* Submit button to save the changes */}
            <CustomButton
              title="Update"
              containerClass="text-white border !w-[166px] !h-[50px] !bg-[#EDBD1C]"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
