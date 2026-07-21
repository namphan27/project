import { Product } from "@/app/type/product.type";
import ProductList from "../../products/ProductList";
import axiosInstance from "../../services/axios";

type Category = {
  id: number;
  name: string;
  slug: string;
  products: Product[];
};

type CategoryResponse = {
  success: boolean;
  data: Category;
};

const getCategory = async (slug: string): Promise<CategoryResponse> => {
  try {
    const response = await axiosInstance.get<CategoryResponse>(
      `/categories/${slug}`
    );

    return response.data;
  } catch {
    throw new Error("Failed to fetch category");
  }
};

export default async function CategoryDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await getCategory(slug);

  const category = result.data;

  return (
    <div>

      <ProductList products={category.products} />
    </div>
  );
}
