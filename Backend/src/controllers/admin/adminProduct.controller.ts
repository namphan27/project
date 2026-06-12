import { Request, Response } from "express";
import { productService } from "../../services/product.service";

export const adminProductController = {
  create: async (req: Request, res: Response) => {
    try {
      const product = await productService.create({
        ...req.body,
        price: Number(req.body.price),
        categoryId: Number(req.body.categoryId),
      });
      return res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Không thể tạo sản phẩm",
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const product = await productService.update(id, req.body);
      return res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Không thể cập nhật sản phẩm",
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      await productService.delete(id);
      return res.json({
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Không thể xóa sản phẩm",
      });
    }
  },
};
