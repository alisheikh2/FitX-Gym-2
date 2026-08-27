import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, trim: true, lowercase: true, index: true },
    gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
    dob: Date,
    address: String,
    emergencyContact: String,
    goals: String,
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainer', default: null },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan', default: null },
    joiningDate: { type: Date, default: Date.now },
    expiryDate: { type: Date, index: true },
    notes: String,
    status: { type: String, enum: ['active', 'paused', 'cancelled', 'expired'], default: 'active', index: true }
  },
  { timestamps: true }
);

memberSchema.pre('save', function (next) {
  if (this.status === 'active' && this.expiryDate && this.expiryDate < new Date()) this.status = 'expired';
  next();
});

export default mongoose.model('Member', memberSchema);
