import mongoose, {Schema, Document} from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  role: string;
  email: string;
}

const TeamSchema: Schema = new Schema(
  {
    name: {type: String, required: true},
    role: {type: String, required: true}, // e.g., "Developer", "Manager"
    email: {type: String, required: true, unique: true},
  },
  {timestamps: true},
);

export const Team = mongoose.model<ITeamMember>('Team', TeamSchema);
