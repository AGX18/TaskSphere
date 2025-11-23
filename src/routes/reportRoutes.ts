import { Router } from "express";
import { reportController } from "../controllers/reportController";

export const ReportRouter = Router();

// Endpoint: GET /api/reports/:projectId
ReportRouter.get("/:projectId", reportController.getProjectReport);
