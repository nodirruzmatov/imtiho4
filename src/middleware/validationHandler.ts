import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { Exception } from "../exception/exception.js";

interface filter {
  value: object;
  name: string;
  age: string;
  password: string;
}

interface RequestWithFiltered extends Request {
  values?: filter;
  name?: filter;
  password?: filter;
  age?: filter;
}

export const validationHandler = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(new Exception(error.message, 422));
    }

    next();
  };
};
