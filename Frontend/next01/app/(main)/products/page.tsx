import { PlusIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductList from "./ProductList";
import { Product } from "@/app/type/product.type";
import axiosInstance from "../services/axios";
import FeaturedCPU from "../_components/FeaturedCpu";
import ProductCard from "../_components/ProductCard";
import FeaturedVGA from "../_components/FeaturedVga";
import FeaturedRAM from "../_components/FeaturedRam";
import FeaturedSSD from "../_components/FeaturedSSD";
import FeaturedMainboard from "../_components/FeaturedMain";

// type ApiResponse = {
//   success: boolean;
//   data: Product[];
// };

const getProduct = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get("/products");

    const data = response.data;

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
      <FeaturedCPU products={products} />
      <FeaturedVGA products={products} />
      <FeaturedRAM products={products} />
      <FeaturedSSD products={products} />
      <FeaturedMainboard products={products} />
    </div>
  );
}
