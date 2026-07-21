import { CreateOrderDto } from "../schema/order.schema";
import { prisma } from "../utils/prisma";
import { randomUUID } from "crypto";
export const orderService = {
  async createOrder(userId: number, data: CreateOrderDto) {
    return await prisma.order.create({
      data: {
        userId,
        orderCode: `DH-${randomUUID().slice(0, 8)}`,
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

  async getAllOrders() {
    return prisma.order.findMany({
      include: {
        items: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },
  getOrderById: async (orderId: number, userId: number) => {
    return await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: userId,
      },
      include: {
        items: true,
      },
    });
  },
};
