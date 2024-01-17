import { NextFunction, Request, Response } from "express";
import { sendError } from "../../utils/responseHandlers";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  sendError(res, 400, "Internal Server Error", err);
};
