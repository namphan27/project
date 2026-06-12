import { Request, Response } from "express";
import { orderService } from "../services/order.service";
import { createOrderSchema } from "../schema/order.schema";

interface UserPayload {
  id: number;
}

export const orderController = {
  async createOrder(req: Request, res: Response) {
    try {
      const validation = createOrderSchema.safeParse(req.body);
      if (!validation.success) {
        return res
          .status(400)
          .json({ success: false, errors: validation.error.format() });
      }

      const user = (req as Request & { user: UserPayload }).user;
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      const result = await orderService.createOrder(user.id, validation.data);

      return res.status(201).json({ success: true, data: result });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },

  async getOrders(req: Request, res: Response) {
    try {
      const user = (req as Request & { user: UserPayload }).user;
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });

      const orders = await orderService.getOrders(user.id);

      return res.status(200).json({ success: true, data: orders });
    } catch (error: unknown) {
      return res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },
  async getAllOrders(req: Request, res: Response) {
    try {
      const orders = await orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Lỗi server" });
    }
  },
  getOrderDetail: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const userId = req.user?.id;

      if (!userId) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }

      const order = await orderService.getOrderById(Number(id), userId);

      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Không tìm thấy" });
      }

      return res.status(200).json({ success: true, data: order });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ success: false, message: "Lỗi server" });
    }
  },
};
