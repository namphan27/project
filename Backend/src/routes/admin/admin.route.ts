import express from "express";
import { dashboardService } from "../../services/admin/dashboard.service";
import {
  adminMiddleware,
  authMiddleware,
} from "../../middleware/auth.middleware";
import { adminProductController } from "../../controllers/admin/adminProduct.controller";
import { orderController } from "../../controllers/order.controller";
import { adminUserController } from "../../controllers/admin/adminAuth.controller";
import upload from "../../middleware/update.middleware";
import { uploadImage } from "../../controllers/admin/upload.controller";

const router = express.Router();
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/stats", async (req, res) => {
  try {
    const stats = await dashboardService.getOverview();
    res.json(stats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server" });
  }
});
router.post("/products", adminProductController.create);
router.patch("/products/:id", adminProductController.update);
router.delete("/products/:id", adminProductController.delete);

router.get("/users", adminUserController.getAll);
router.patch("/users/:id", adminUserController.update);
router.delete("/users/:id", adminUserController.delete);

router.get("/orders", orderController.getAllOrders);

router.post("/upload", upload.single("image"), uploadImage);
export default router;
