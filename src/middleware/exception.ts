import { Exception } from "../exception/exception";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const exceptionHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Exception) {
    return res.status(err.status).json({
      message: err.message,
      status: err.status,
    });
  }

  res.status(500).json({
    message: "Internal server error",
    status: 500,
  });
};
