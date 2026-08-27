import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    durationMonths: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    description: String,
    includedServices: [String],
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('MembershipPlan', planSchema);
