// src/middlewares/httpLogger.ts
import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const httpLogger = (req: Request, res: Response, next: NextFunction) => {
  // Listen for the response to finish to capture the status code
  res.on("finish", () => {
    logger.logRequest(req.method, req.originalUrl, res.statusCode);
  });
  next();
};
