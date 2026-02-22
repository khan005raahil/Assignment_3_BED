import { HTTP_STATUS } from "../../../Constant/httpStatus";
import * as healthService from "../services/healthService";
import { Request, Response } from "express";

export const healthCheck = (req: Request, res: Response) => {
    const healthCheckResponse = healthService.healthCheck
    res.status(HTTP_STATUS.OK).json(healthCheckResponse);
};