"use client";
import { useEffect, useState } from "react";
import { usePathname, useParams } from "next/navigation";
import CustomButton from "../../../../components/CustomButton";
import ImageList from "../../../../components/ImageList";
import InputField from "../../../../components/InputField";
import LoadingScreen from "../../../../components/LoadingScreen";

const UpdateProduct = () => {
  // State to manage form input fields
  const [formData, setFormData] = useState({
    category: "",
    image: null,
    quantity: "",
    name: "",
    price: "",
    description: "",
  });

  // State to handle loading indicator and error messages
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { id } = useParams();
  const pathname = usePathname();

  /** Fetch product details from server and prefill form fields */
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

      // Populate form fields with the fetched product data
      setFormData({
        category: data.category || "",
        image: null, // Only set null, image re-upload will be optional
        quantity: String(data.quantity) || "",
        name: data.name || "",
        price: String(data.price) || "",
        description: data.description || "",
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      setErrorMessage("Unable to fetch product details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch product details on component mount or pathname change
  useEffect(() => {
    if (!pathname) return;

    const safeId = Array.isArray(id) ? id[0] : id;
    if (safeId) fetchProductDetails(safeId);
  }, [pathname, id]);

  /** Handle change for input fields */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target;

    // Handle file input differently than other fields
    if (type === "file") {
      const file = e.target.files?.[0];
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: e.target.value });
    }
  };

  /** Handle form submission logic */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!id) {
        setErrorMessage("Invalid product ID.");
        return;
      }

      const payload = JSON.stringify({
        category: formData.category,
        name: formData.name,
        price: formData.price,
        quantity: formData.quantity,
        description: formData.description,
      });

      const response = await fetch(
        `https://inventory-backend-sqbj.onrender.com/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: payload,
        }
      );

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage("Error updating product.");
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="flex justify-center items-center gap-5">
          {/* Display the product's images list */}
          <ImageList productId={Array.isArray(id) ? id[0] : id} />

          <div className="mt-6 shadow-lg flex flex-col px-10 pt-4 w-full rounded-2xl relative min-h-[670px]">
            {/* Form for updating product details */}
            <form
              className="flex items-center flex-col h-[600px] gap-y-10 relative"
              onSubmit={handleSubmit}
            >
              {errorMessage && (
                <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
              )}

              {/* Input fields for the product details */}
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

              {/* Buttons for cancel and form submission */}
              <div className="w-full bg-white flex justify-center items-end gap-3 py-5 absolute bottom-0 left-0">
                <CustomButton
                  title="Cancel"
                  containerClass="bg-white border !w-[166px] !h-[50px]"
                  onClick={() => alert("Action Cancelled")}
                />
                <CustomButton
                  title="Update"
                  containerClass="text-white border !w-[166px] !h-[50px] !bg-[#EDBD1C]"
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
