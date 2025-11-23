// src/middlewares/errorHandler.ts
import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";

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

  // If it's our custom trusted error, use its status and message
  if (err instanceof AppError) {
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
