import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HTTP_STATUS } from "../../../Constant/httpStatus";

export const validateBody =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
      convert: true, // defaults apply
    });

    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.details[0].message });
    }

    req.body = value;
    next();
  };

export const validateParams =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.params, {
      abortEarly: true,
      stripUnknown: true,
      convert: true,
    });

    if (error) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: error.details[0].message });
    }

    req.params = value;
    next();
  };