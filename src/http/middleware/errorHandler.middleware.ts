import { NextFunction, Request, Response } from "express";
import { sendError } from "../../utils/responseHandlers";

export const errorHandler = (err: Error, req: Request, res: Response) => {
  sendError(res, 400, "Internal Server Error", err);
};
