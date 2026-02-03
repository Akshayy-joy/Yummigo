import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const { name, address, cuisines } = req.body;
    if (!name || !address || !Array.isArray(cuisines)) return res.status(400).json({ message: "Invalid payload" });

    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        address,
        cuisines
      }
    });

    return res.status(201).json({ success: true, data: restaurant });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getRestaurants = async (_req: Request, res: Response) => {
  try {
    const restaurants = await prisma.restaurant.findMany();
    return res.status(200).json({ success: true, data: restaurants });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
