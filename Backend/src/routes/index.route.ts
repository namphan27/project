import express from "express";
import { productController } from "../controllers/product.controller";
import { indexController } from "../controllers/index.controller";
import { cartController } from "../controllers/cart.controller";
import { validate } from "../middleware/validate.middleware";
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from "../validators/auth.validator";
import { authController } from "../controllers/auth.controller";
import { adminMiddleware, authMiddleware } from "../middleware/auth.middleware";
import { categoryController } from "../controllers/category.controller";
import { orderController } from "../controllers/order.controller";
import { createPaymentLink, handleWebhook } from "../controllers/payment.controller";
const router = express.Router();

router.get("/", indexController.index);

router.get("/products/search", productController.search);
router.get("/products", productController.index);
router.get("/products/:id", productController.show);
router.post(
  "/products",
  authMiddleware,
  adminMiddleware,
  productController.store,
);
router.patch(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  productController.update,
);
router.delete(
  "/products/:id",
  authMiddleware,
  adminMiddleware,
  productController.delete,
);

router.get("/cart", authMiddleware, cartController.getCart);
router.post("/cart", authMiddleware, cartController.addToCart);
router.post("/cart/merge", authMiddleware, cartController.mergeCart);
router.delete("/cart/:id", authMiddleware, cartController.removeItem);

router.get("/categories", categoryController.index);
router.get("/categories/:slug", categoryController.show);

router.post("/order", authMiddleware, orderController.createOrder);
// router.get("/order/:id", authMiddleware, orderController.getOrders);
router.get("/order/:id", authMiddleware, orderController.getOrderDetail);
router.get("/order", authMiddleware, orderController.getAllOrders);

router.post("/auth/login", validate(loginSchema), authController.login);
router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register,
);
router.get("/auth/me", authMiddleware, authController.profile);
router.delete("/auth/logout", authMiddleware, authController.logout);
router.get("/auth/profile", authMiddleware, authController.profile);
router.post(
  "/auth/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshToken,
);
router.post('/create-payment', createPaymentLink);
router.post("/webhook", handleWebhook);
export default router;
