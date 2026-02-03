import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import orderRoutes from "./routes/order.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);

// Error handler
app.use(errorHandler);

export default app;
