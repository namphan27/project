import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const categoryController = {
  index: async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();

    return res.json({
      success: true,
      data: categories,
    });
  },

  show: async (req: Request, res: Response) => {
    const { slug } = req.params;

    if (!slug || Array.isArray(slug)) {
      return res.status(400).json({
        success: false,
        message: "Invalid slug",
      });
    }
    const category = await prisma.category.findUnique({
      where: { slug },
      include: {
        products: true,
      },
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.json({
      success: true,
      data: category,
    });
  },
};
