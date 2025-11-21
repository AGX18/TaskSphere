import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  role: string; // e.g. 'Developer', 'Designer', 'Manager'
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const TeamSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  },
);

export const Team = mongoose.model<ITeam>("Team", TeamSchema);
