import { Product } from "@/app/type/product.type";
import ProductList from "../../products/ProductList";

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/categories/${slug}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
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
