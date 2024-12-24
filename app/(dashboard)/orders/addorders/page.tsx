"use client";
import { useEffect, useState } from "react";
import SelectField from "../../../components/SelectField";
import InputField from "../../../components/InputField";
import CustomButton from "../../../components/CustomButton";
import WasteSalesTable from "../../../components/Waste_Sales-Components/WasteSalesTable";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
interface Product {
  amount: string;
  productId: string;
}

interface ProductData {
  name: string;
  _id: string;
}

export default function AddOrders() {

  const [formValues, setFormValues] = useState<Product>({
    amount: "",
    productId: "",
  });

  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiBaseUrl}/products`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setProducts(
          data.map((product) => ({
            _id: product._id,
            name: product.name,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAddRow = () => {
    if (!formValues.productId || !formValues.amount) {
      setError("Please select a product and enter a quantity.");
      return;
    }

    setRows((prevRows) => [...prevRows, { ...formValues }]);
    setFormValues({ productId: "", amount: "" });
    setError(null);
  };

  const handleDelete = (index: number) => {
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    const row = rows[index];
    setFormValues({ productId: row.productId, amount: row.amount });
    setRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rows.length === 0) {
      setError("No products added to the order.");
      return;
    }

    const orderData = {
      record: rows.map((row) => ({
        productId: row.productId,
        amount: parseInt(row.amount),
      })),
    };

    try {
      const response = await fetch(
        `${apiBaseUrl}/orders`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      setSuccess("Order submitted successfully.");
      setRows([]);
      setError(null);
    } catch (error) {
      setError(`Error: ${error.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="mt-6 shadow-lg flex flex-col px-8 pt-6 w-full min-h-[670px] rounded-2xl font-Poppins overflow-y-scroll">
  <CustomButton
  title="Back to Orders" 
  onClick={() => window.history.back()} 
  containerClass="text-white  ml-auto"
/>

      <form
        className="flex items-center flex-col gap-y-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex justify-between items-center gap-10 w-full">
          <SelectField
            label="Product"
            name="productId"
            value={formValues.productId}
            onChange={handleChange}
            required
            className="w-full"
            options={
              loading
                ? [{ value: "", label: "Loading products..." }]
                : products.map((product) => ({
                    value: product._id,
                    label: product.name,
                  }))
            }
          />
          <InputField
            label="Amount"
            type="number"
            name="amount"
            placeholder="Enter Amount"
            required
            value={formValues.amount}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <CustomButton
          title="Add"
          onClick={handleAddRow}
          containerClass="text-white !w-[166px]"
        />

        <WasteSalesTable
          rows={rows}
          onEdit={handleEdit}
          onDelete={handleDelete}
          products={products}
        />

        <CustomButton
          title="Submit"
          onClick={handleSubmit}
          containerClass={`text-white !w-[166px] mb-5 ${
            rows.length === 0 ? "hidden" : ""
          }`}
        />

        {error && (
          <div className="text-center">
            <p className="text-red-500 mt-4">
              Something went wrong! Please check your amount input
            </p>
            <p className="text-red-500 mt-2">{error}</p>
          </div>
        )}

        {success && <p className="text-green-500 mt-4">{success}</p>}
      </form>
    </div>
  );
}
