import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Exception } from "../exception/exception";

interface IDecode {
  address: string;
  role: string;
  id: string;
  iat: undefined;
  exp: number;
}

interface RequestWithUserRole extends Request {
  userId?: IDecode;
  userRole?: IDecode;
}

export const verifyToken = (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.headers;

  if (!access_token) {
    return next(new Exception("Provide token", 401));
  }

  jwt.verify(
    String(access_token),
    String(process.env.SECRET_KEY),
    (err: unknown, decode: any) => {
      if (err instanceof jwt.JsonWebTokenError) {
        return next(new Exception("Token invalid", 401));
      }

      if (err instanceof jwt.TokenExpiredError) {
        return next(new Exception("Token exprired", 401));
      }

      req.userId = decode.id;
      req.userRole = decode.role;
      next();
    }
  );
};
