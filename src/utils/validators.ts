import { z } from "zod";

export const teamMemberSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }).trim(),
  role: z.string().min(1, { error: "Role is required" }).trim(),
  email: z.email({ error: "Invalid email address" }).trim(),
});

export type CreateTeamMemberInput = z.infer<typeof teamMemberSchema>;
