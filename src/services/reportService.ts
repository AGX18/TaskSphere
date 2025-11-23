import fs from "fs";
import path from "path";
import { eq } from "drizzle-orm";
import { db } from "../repositories/sql/connection";
import { tasks } from "../models/sql/schema";
import { Project } from "../models/mongo/Project";
import { AppError } from "../utils/AppError";

export const reportService = {
  async generateProjectReport(projectId: string) {
    // Fetch Project from MongoDB
    const project = await Project.findById(projectId).populate(
      "teamMembers",
      "name email",
    );
    if (!project) {
      throw new AppError("Project not found", 404);
    }

    // Fetch Tasks from PostgreSQL (Drizzle)
    const projectTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.projectId, projectId));

    // Calculate Analytics
    const totalTasks = projectTasks.length;
    const completedTasks = projectTasks.filter(
      (t) => t.status === "done",
    ).length;
    const pendingTasks = totalTasks - completedTasks;

    // Avoid division by zero
    const progress =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // 4. Construct Report Data
    const reportData = {
      generatedAt: new Date(),
      project: {
        id: project._id,
        title: project.title,
        deadline: project.deadline,
        teamSize: project.teamMembers.length,
      },
      stats: {
        totalTasks,
        completedTasks,
        pendingTasks,
        progress: `${progress}%`,
      },
      tasks: projectTasks.map((t) => ({
        id: t.id,
        title: t.title,
        status: t.status,
      })),
    };

    // 5. Write to File (Requirement: Use fs module)
    const reportsDir = path.join(process.cwd(), "reports");
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const fileName = `report-${projectId}-${Date.now()}.json`;
    const filePath = path.join(reportsDir, fileName);

    fs.writeFileSync(filePath, JSON.stringify(reportData, null, 2));

    // Return the data (and path) so the controller can send it back
    return { ...reportData, filePath };
  },
};
