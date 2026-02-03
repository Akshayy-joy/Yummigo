import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { generateToken } from "../utils/generateToken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed }
    });

    const token = generateToken(user.id);
    return res.status(201).json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email }, token } });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing fields" });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user.id);
    return res.status(200).json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email }, token } });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
