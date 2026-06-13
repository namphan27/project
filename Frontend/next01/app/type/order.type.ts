interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  product: {
    image: string;
    description: string;
  };
}

interface OrderDetail {
  id: number;
  total: number;
  status: string; 
  createdAt: string;
  items: OrderItem[];
}
