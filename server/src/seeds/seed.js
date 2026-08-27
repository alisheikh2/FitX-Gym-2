import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { runSeed } from './seedData.js';

connectDB()
  .then(runSeed)
  .then(() => mongoose.disconnect())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
