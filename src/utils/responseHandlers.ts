import { Response } from "express";

// Interface for type the structure of the responses
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  paginationInfo?: any;
}

// For this case, you need send data to show.
export const sendResponse = (
  res: Response,
  statusCode: number | 200,
  data: any,
  message: string,
  paginationInfo: any = null
): void => {
  const responseBody: ApiResponse = {
    success: true,
    message,
    data,
    paginationInfo,
  };
  res.status(statusCode).send(responseBody);
};

// Case for only send success response, without data
export const sendSuccess = (
  res: Response,
  statusCode: number | 200,
  message: string
): void => {
  const responseBody: ApiResponse = {
    success: true,
    message,
  };
  res.status(statusCode).send(responseBody);
};

// Error cases.
export const sendError = (
  res: Response,
  statusCode: number | 404,
  message: string,
  error: any
): void => {
  const responseBody: ApiResponse = {
    success: false,
    message,
    data: error,
  };
  res.status(statusCode).send(responseBody);
};

// Case for send failure or error response, like sendError but without data.
export const sendFailure = (
  res: Response,
  statusCode: number | 404,
  message: string
): void => {
  const responseBody: ApiResponse = {
    success: false,
    message,
  };
  res.status(statusCode).send(responseBody);
};
