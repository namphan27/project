export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type AdminProduct = Product & {
  slug: string;
  categoryId: number;
  description: string;
};
export type CartItem = {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  

  product?: Product; 
};