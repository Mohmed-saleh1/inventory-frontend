"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TableItem } from "../interfaces/TableItem";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// Define the props expected by the ImageList component
interface ImageListProps {
  productId: string; // The product ID to fetch images for
  updatedImage: { image: string; _id: string } | null; // Updated image data passed from parent
}

// The ImageList component to display product images
const ImageList = ({ productId, updatedImage }: ImageListProps) => {
  const [data, setData] = useState<TableItem[]>([]); // State to hold fetched image data
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state while fetching images
  const [isUpdatingImage, setIsUpdatingImage] = useState<string | null>(null); // State to track which image is being updated

  /**
   * Fetch product images from the backend server.
   */
  const fetchProductImages = async (id: string) => {
    try {
      setIsLoading(true); // Set loading state to true while fetching
      const response = await fetch(
        `${apiBaseUrl}/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product images.");
      }

      const result = await response.json();
      setData(Array.isArray(result) ? result : [result]); // Ensure data is always an array
    } catch (error) {
      console.error("Error fetching product images:", error);
    } finally {
      setIsLoading(false); // Turn off the loading state when fetch is done
    }
  };

  // Fetch images when the productId changes
  useEffect(() => {
    if (productId) fetchProductImages(productId);
  }, [productId]);

  /**
   * Handle updates to an image. This simulates image update on the frontend.
   */
  useEffect(() => {
    if (updatedImage) {
      setIsUpdatingImage(updatedImage._id); // Mark the current image as updating
      setTimeout(() => {
        setData((prevData) =>
          prevData.map((item) =>
            item._id === updatedImage._id
              ? { ...item, image: updatedImage.image } // Update the image URL only for the matching item
              : item
          )
        );
        setIsUpdatingImage(null); // Reset the updating state after a delay
      }, 5000); // Simulate image loading delay
    }
  }, [updatedImage]);

  return (
    <div className="mt-6 shadow-lg px-1 pt-4 rounded-2xl w-[210px] min-h-[670px] h-[670px] overflow-y-scroll flex flex-col items-center">
      {/* Loading state */}
      {isLoading ? (
        <div className="text-gray-500 text-center">Loading images...</div>
      ) : data.length > 0 ? (
        // Render the images if data exists
        data.map((item, index) => (
          <div key={item._id} className="mb-4">
            {/* Handle UI state when updating an image */}
            {isUpdatingImage === item._id ? (
              <div className="text-gray-500 text-center">Updating image...</div>
            ) : item.image ? (
              // Render image 
              <Image
                src={item.image}
                alt={`Product Image ${index + 1}`}
                width={500}
                height={500}
                className="cursor-pointer w-full"
              />
            ) : (
              // Handle the case when no image is available
              <div className="text-gray-500 text-center">No image available</div>
            )}
          </div>
        ))
      ) : (
        // Fallback UI if no images are available
        <p className="text-gray-500 text-center">No images available</p>
      )}
    </div>
  );
};

export default ImageList;
