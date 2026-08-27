import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    checkedInAt: { type: Date, default: Date.now },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

attendanceSchema.index({ member: 1, date: 1 }, { unique: true });

export default mongoose.model('Attendance', attendanceSchema);
