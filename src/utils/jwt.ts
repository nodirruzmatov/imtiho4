import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const sing = (payload: object) =>
  jwt.sign(payload, String(process.env.SECRET_KEY));
