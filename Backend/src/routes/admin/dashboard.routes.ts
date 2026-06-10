import express from "express";
import { dashboardService } from "../../services/admin/dashboard.service";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const stats = await dashboardService.getOverview();
    res.json(stats); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

export default router;
