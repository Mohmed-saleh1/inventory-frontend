import Image from "next/image";
import { useEffect, useState } from "react";

const ImageList = ({ productId }: { productId: string }) => {
  const [data, setData] = useState<TableItem[]>([]);

  // Fetch product images from the API
  const fetchProductImage = async (id: string) => {
    try {
      const response = await fetch(
        `https://inventory-backend-sqbj.onrender.com/products/${id}`
      );

      console.log("Product ID being requested:", id);

      if (!response.ok) {
        throw new Error("Failed to fetch product image.");
      }

      const fetchedData = await response.json();
      
      // Ensure fetched data is always treated as an array
      const dataArray = Array.isArray(fetchedData) ? fetchedData : [fetchedData];
      
      setData(dataArray);
    } catch (error) {
      console.error("Error fetching product image:", error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductImage(productId);
    }
  }, [productId]);

  return (
    <div className="mt-6 shadow-lg px-10 pt-4 rounded-2xl w-[210px] min-h-[670px] h-[670px] overflow-y-scroll flex flex-col items-center">
      {data.length > 0 ? (
        data.map((item: TableItem, index: number) => {
          return item.image ? (
            <div key={index} className="mb-4">
              {/* Render image only if it exists */}
              <Image
                src={`https://inventory-backend-sqbj.onrender.com${item.image}`}
                alt={`Product Image ${index + 1}`}
                width={100}
                height={50}
                className="cursor-pointer"
                unoptimized
              />
            </div>
          ) : (
            <div key={index} className="mb-4 text-gray-500">
              No image
            </div>
          );
        })
      ) : (
        <p className="text-gray-500 text-center">No images available</p>
      )}
    </div>
  );
};

export default ImageList;
