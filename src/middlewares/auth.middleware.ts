import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: "Missing Authorization header" });

  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid Authorization header" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    // attach user id
    (req as any).user = { id: decoded.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
