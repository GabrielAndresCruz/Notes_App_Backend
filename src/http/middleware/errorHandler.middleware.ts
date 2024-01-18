import { NextFunction, Request, Response } from "express";

const errorFormater = (err: String): Record<string, string> => {
  let errors: Record<string, string> = {};

  const allErrors = err.substring(err.indexOf(":") + 1).trim();
  const allErrorsArray = allErrors.split(",").map((e: String) => e.trim());
  allErrorsArray.forEach((error) => {
    const [key, value] = error.split(":").map((err: String) => err.trim());
    errors[key] = value;
  });

  return errors;
};

const errorHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => {
      res.status(500).send({
        success: false,
        message: "Internal Server Error",
        // error: err.response.data.error,
        // error: errorFormater(err.response.data.error),
        error: err,
      });
    });
  };
};

export default errorHandler;
