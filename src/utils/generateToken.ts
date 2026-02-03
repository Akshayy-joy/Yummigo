import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
};
