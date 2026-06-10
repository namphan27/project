import { Request, Response } from "express";
import { productService } from "../services/product.service";

export const productController = {
  index: async (req: Request, res: Response) => {
    const data = await productService.getAll();
    res.json(data);
  },

  show: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await productService.getById(id);
    res.json(data);
  },

  store: async (req: Request, res: Response) => {
    const data = await productService.create(req.body);
    res.json(data);
  },

  update: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await productService.update(id, req.body);
    res.json(data);
  },

  delete: async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const data = await productService.delete(id);
    res.json(data);
  },
  search: async (req: Request, res: Response) => {
    try {
      const q = req.query.q as string;
      if (!q) return res.json({ success: true, data: [] });


      const data = await productService.search(q);
      return res.json({ success: true, data });
    } catch (error) {
      console.error("LỖI CHI TIẾT TẠI BACKEND:", error);
      return res.status(500).json({ message: "Lỗi Server" });
    }
  },
};
