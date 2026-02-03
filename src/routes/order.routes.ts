import { Router } from "express";
import { placeOrder, myOrders } from "../controllers/order.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/my-orders", authMiddleware, myOrders);

export default router;
