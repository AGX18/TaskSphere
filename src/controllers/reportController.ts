// src/controllers/reportController.ts
import { Request, Response, NextFunction } from "express";
import { reportService } from "../services/reportService";

export const reportController = {
  getProjectReport: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId } = req.params;

      const report = await reportService.generateProjectReport(projectId);

      res.status(200).json({
        message: "Report generated successfully",
        filePath: report.filePath,
        data: report,
      });
    } catch (error) {
      next(error);
    }
  },
};
