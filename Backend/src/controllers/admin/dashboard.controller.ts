import { Request, Response } from "express";
import { dashboardService } from "../../services/admin/dashboard.service";

export const dashboardController = {
  async getStats(req: Request, res: Response) {
    try {
      const stats = await dashboardService.getOverview();
      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) { 
        console.error("Dashboard Error:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi hệ thống khi lấy dữ liệu Dashboard",
      });
    }
  },
};