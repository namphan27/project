import { prisma } from "../utils/prisma";

export const cartService = {
  async getCart(userId: number) {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  async addToCart(userId: number, productId: number) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId },
      });
    }

    const item = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (item) {
      return prisma.cartItem.update({
        where: { id: item.id },
        data: {
          quantity: item.quantity + 1,
        },
      });
    }

    return prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  },

  mergeCart: async (
    userId: number,
    items: { productId: number; quantity: number }[],
  ) => {
    const cart = await prisma.cart.findFirst({
      where: { userId },
    });

    if (!cart) {
      throw new Error("Cart not found");
    }

    for (const item of items) {
      const existing = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          productId: item.productId,
        },
      });

      if (existing) {
        await prisma.cartItem.update({
          where: { id: existing.id },
          data: {
            quantity: existing.quantity + item.quantity,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.productId,
            quantity: item.quantity,
          },
        });
      }
    }

    return cartService.getCart(userId);
  },

  async removeItemFromCart(userId: number, productId: number) {
    const cart = await prisma.cart.findUnique({
      where: { userId: userId }, 
    });
console.log("productId =", productId);
    if (!cart) throw new Error("Giỏ hàng không tồn tại");
    return await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId: Number(productId), 
      },
    });
  },
  
};
