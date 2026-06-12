import { prisma } from "../utils/prisma";
import { UserData } from "../type/user.type";
import { hashPassword } from "../utils/hashing";
export const userService = {
  async existingEmail(email: string) {
    const count = await prisma.user.count({
      where: {
        email,
      },
    });
    return count;
  },
  async create(userData: UserData) {
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashPassword(userData.password),
      },
    });
    return user;
  },
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  },
  async find(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      omit: {
        password: true,
      },
    });
    return user;
  },

  async getAll() {
    return prisma.user.findMany({
      omit: {
        password: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async update(id: number, data: UserData) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  async delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  },
};
