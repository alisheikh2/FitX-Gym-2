import mongoose from 'mongoose';

const programSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tagline: String,
    description: String,
    bullets: [String],
    audience: String,
    trainerSlug: String,
    image: String,
    icon: String,
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Program', programSchema);
