import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    role: { type: String, required: true },
    experienceYears: Number,
    specialization: String,
    photo: String,
    photoAlt: String,
    shortBio: String,
    bio: String,
    philosophy: String,
    focus: [String],
    suitableFor: [String],
    programs: [String],
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Trainer', trainerSchema);
