import { Request, Response } from "express";
import { authService } from "../services/auth.service";
export const authController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const result = await authService.login(email, password);
      return res.json({
        data: result,
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      res.status(401).json({
        message: error instanceof Error ? error.message : "Login failed",
      });
    }
  },
  register: async (req: Request, res: Response) => {
    try {
      const user = await authService.register(req.body);
      res.json({
        message: "Dang ky tai khoan thanh cong",
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Register failed",
      });
    }
  },
  profile: async (req: Request, res: Response) => {
    return res.json({
      message: "Lấy thông tin user thành công",
      data: req.user,
    });
  },
  logout: async (req: Request, res: Response) => {
    await authService.logout(req.tokenJti!, req.tokenExp!);
    return res.json({});
  },
  refreshToken: async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        message: "chua co refreshtoken",
      });
    }
    const newToken = await authService.refreshToken(refreshToken);
    if (!newToken) {
      return res.status(401).json({
        message: "refreshToken khong hop le",
      });
    }
    return res.json({
      message: "Refresh Token thanh cong",
      data: newToken,
    });
  },
};
