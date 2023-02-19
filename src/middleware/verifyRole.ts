import { NextFunction, Request, Response } from "express";
import { Exception } from "../exception/exception.js";

interface IDecode {
  role: string;
}

interface RequestWithUserRole extends Request {
  userId?: IDecode;
  userRole?: IDecode;
}

export const verifyRole = (role: string) => {
  return (req: RequestWithUserRole, res: Response, next: NextFunction) => {
    const { userRole } = req;

    if (String(role) == String(userRole)) {
      return next(
        new Exception("You are not permitted to perform this task", 401)
      );
    }

    next();
  };
};
