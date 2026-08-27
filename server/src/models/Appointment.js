import mongoose from 'mongoose';

export const APPOINTMENT_STATUSES = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'No Show'];

const appointmentSchema = new mongoose.Schema(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', default: null },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', default: null },
    personName: { type: String, required: true, trim: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', default: null },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    time: { type: String, required: true },
    notes: String,
    status: { type: String, enum: APPOINTMENT_STATUSES, default: 'Scheduled', index: true }
  },
  { timestamps: true }
);

export default mongoose.model('Appointment', appointmentSchema);
