import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sendFailure } from "../../utils/responseHandlers";

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the token from the cookies
  const tokenString = req.headers.cookie;

  // Trim and cut token string
  const equalsIndex: any = tokenString?.indexOf("=");

  const token = tokenString?.slice(equalsIndex + 1);

  // Verify token from cookies
  if (!token) {
    return sendFailure(res, 401, "Unauthorized - Missing token");
  }

  try {
    // Verify and decode token
    const decoded = jwt.verify(token, "access_secret");

    //@ts-ignore
    // Fill req.user with user information
    req.user = decoded;

    next();
  } catch (error) {
    sendFailure(res, 401, "Unauthorized - Invalid token");
  }
};
