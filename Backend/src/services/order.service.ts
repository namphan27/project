import { CreateOrderDto } from "../schema/order.schema";
import { prisma } from "../utils/prisma";


export const orderService = {
  async createOrder(userId: number, data: CreateOrderDto) {
    return await prisma.order.create({
      data: {
        userId,
        name: data.name,
        phone: data.phone,
        address: data.address,
        total: data.total,
        items: {
          create: data.items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  },

  async getOrders(userId: number) {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        items: true, 
      },
      orderBy: { createdAt: "desc" }, 
    });
  },
};