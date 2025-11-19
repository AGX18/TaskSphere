import mongoose from 'mongoose';
import {env} from '../../config/env';

export const connectToMongo = async () => {
  try {
    // Using the validated MONGO_URI from your env config
    await mongoose.connect(env.MONGO_URI);
    console.log('✅ MongoDB (Mongoose) Connected successfully.');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    // Critical error: Exit process if DB fails
    process.exit(1);
  }
};
