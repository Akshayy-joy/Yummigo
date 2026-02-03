import { Router } from "express";
import { createRestaurant, getRestaurants } from "../controllers/restaurant.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authMiddleware, createRestaurant);
router.get("/", getRestaurants);

export default router;
