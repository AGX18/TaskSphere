import { Team, ITeam } from "../models/mongo/Team";
import { AppError } from "../utils/AppError";
import { CreateTeamMemberInput } from "../utils/validators";

export const teamService = {
  // 1. Create a new team member
  async createMember(data: CreateTeamMemberInput): Promise<ITeam> {
    // Check if email already exists
    const existing = await Team.findOne({ email: data.email });
    if (existing) {
      throw new AppError("Email already in use", 409); // 409 Conflict
    }
    return await Team.create(data);
  },

  // 2. Get all members
  async getAllMembers(): Promise<ITeam[]> {
    return await Team.find().sort({ createdAt: -1 });
  },

  // 3. Get single member by ID
  async getMemberById(id: string): Promise<ITeam> {
    const member = await Team.findById(id);
    if (!member) {
      throw new AppError("Team member not found", 404);
    }
    return member;
  },

  // 4. Update member
  async updateMember(
    id: string,
    data: Partial<CreateTeamMemberInput>,
  ): Promise<ITeam> {
    const member = await Team.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true,
    });
    if (!member) {
      throw new AppError("Team member not found", 404);
    }
    return member;
  },

  // 5. Delete member
  async deleteMember(id: string): Promise<void> {
    const result = await Team.findByIdAndDelete(id);
    if (!result) {
      throw new AppError("Team member not found", 404);
    }
  },
};
