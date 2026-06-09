import { Request, Response } from "express";
import { cartService } from "../services/cart.service";

export const cartController = {
  getCart: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = await cartService.getCart(userId);

    return res.json({
      success: true,
      items: data?.items || data || [],
    });
  },

  addToCart: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { productId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await cartService.addToCart(userId, productId);

    const fullCartData = await cartService.getCart(userId);

    return res.json({
      success: true,
      items: fullCartData?.items || fullCartData || [],
    });
  },

  mergeCart: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { items } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid items" });
    }

    const data = await cartService.mergeCart(userId, items);

    return res.json({
      success: true,
      items: data?.items || data || [],
    });
  },
};
