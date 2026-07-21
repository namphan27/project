import { Request, Response } from "express";
import { aiService } from "../services/ai.service";

export const aiController = {
  chat: async (req: Request, res: Response) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({
          success: false,
          message: "Thiếu message",
        });
      }

      const data = await aiService.chat(message);

      return res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("AI ERROR:", error);

      return res.status(500).json({
        success: false,
        message: "Lỗi server AI",
      });
    }
  },
};
