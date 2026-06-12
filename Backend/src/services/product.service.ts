import { DataType } from "../type/data.type";
import { prisma } from "../utils/prisma";

export const productService = {
  async getAll() {
    return await prisma.product.findMany({
      include: {
        category: true, 
      },
      orderBy: {
        createdAt: "desc", 
      },
    });
  },

  async getById(id: number) {
    return await prisma.product.findUnique({
      where: { id },
    });
  },

  async create(data: DataType) {
    return await prisma.product.create({
      data,
    });
  },

  async update(id: number, data: DataType) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return await prisma.product.delete({
      where: { id },
    });
  },
  async search(query: string) {
    return prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
    });
  },
};
