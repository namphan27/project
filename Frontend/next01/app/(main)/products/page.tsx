import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductList from "./ProductList";
import { Product } from "@/app/type/product.type";

// type ApiResponse = {
//   success: boolean;
//   data: Product[];
// };

const getProduct = async (): Promise<Product[]> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/products`,
      {
        cache: "no-store",
      },
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    console.log("API RESPONSE:", data);

    if (Array.isArray(data.data)) {
      return data.data;
    }

    if (Array.isArray(data)) {
      return data;
    }

    return [];
  } catch (error) {
    console.error(error);

    return [];
  }
};

export default async function ProductPage() {
  const products = await getProduct();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      <ProductList products={products} />
    </div>
  );
}
