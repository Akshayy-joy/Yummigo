import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const { restaurantId, items, totalAmount } = req.body;
    if (!restaurantId || !items || !Array.isArray(items) || typeof totalAmount !== "number") {
      return res.status(400).json({ message: "Invalid payload" });
    }
    
    const itemsJson = JSON.stringify(items);
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        restaurantId,
        itemsJson,
        totalAmount,
        status: "pending"
      }
    });

    return res.status(201).json({ success: true, data: order });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const myOrders = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" }
    });

    // parse itemsJson for each order
    const parsed = orders.map(o => ({ ...o, items: JSON.parse(o.itemsJson) }));

    return res.status(200).json({ success: true, data: parsed });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
