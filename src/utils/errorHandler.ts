// src/middlewares/errorHandler.ts
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { ZodError } from "zod";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    // You can attach specific field details if you want
    // (We will just send the first issue message for simplicity)
    const issues = err.issues.map((e) => `${e.path.join(".")}: ${e.message}`);
    message = `Invalid Input: ${issues.join(", ")}`;
  }
  // If it's our custom trusted error, use its status and message
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // Log system errors to a file (using fs) [cite: 65]
  logger.logError(err.message, err.stack);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
