import mongoose from 'mongoose';

export const LEAD_STATUSES = ['New', 'Contacted', 'Consultation Booked', 'Converted', 'Follow-up', 'Not Interested', 'Lost'];

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, trim: true, lowercase: true },
    goal: String,
    preferredTraining: String,
    preferredTime: String,
    message: String,
    source: { type: String, default: 'Website' },
    status: { type: String, enum: LEAD_STATUSES, default: 'New', index: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model('Lead', leadSchema);
