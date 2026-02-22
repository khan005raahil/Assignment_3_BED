import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../Constant/httpStatus";

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
};