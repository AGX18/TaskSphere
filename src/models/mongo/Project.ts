import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  deadline: Date;
  teamMembers: mongoose.Types.ObjectId[]; // Array of references to Team documents
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    deadline: { type: Date, required: true },

    // Reference to the Team collection [cite: 45, 57]
    teamMembers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
