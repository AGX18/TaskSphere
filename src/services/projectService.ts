// src/services/projectService.ts
import { Project, IProject } from "../models/mongo/Project";
import { AppError } from "../utils/AppError";
import { CreateProjectInput } from "../utils/validators";

export const projectService = {
  // 1. Create Project
  async createProject(data: CreateProjectInput): Promise<IProject> {
    return await Project.create(data);
  },

  // 2. Get All Projects (with Team Member details)
  async getAllProjects(): Promise<IProject[]> {
    return await Project.find()
      .populate("teamMembers", "name role email") // Fetch specific fields from Team collection
      .sort({ createdAt: -1 });
  },

  // 3. Get Project by ID
  async getProjectById(id: string): Promise<IProject> {
    const project = await Project.findById(id).populate(
      "teamMembers",
      "name role email",
    );

    if (!project) {
      throw new AppError("Project not found", 404);
    }
    return project;
  },

  // 4. Update Project
  async updateProject(
    id: string,
    data: Partial<CreateProjectInput>,
  ): Promise<IProject> {
    const project = await Project.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true,
    }).populate("teamMembers", "name role email");

    if (!project) {
      throw new AppError("Project not found", 404);
    }
    return project;
  },

  // 5. Delete Project
  async deleteProject(id: string): Promise<void> {
    const result = await Project.findByIdAndDelete(id);
    if (!result) {
      throw new AppError("Project not found", 404);
    }
  },
};
