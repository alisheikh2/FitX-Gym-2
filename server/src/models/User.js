import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true, trim: true },
    phone: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'staff', 'trainer'], default: 'staff', index: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

userSchema.methods.toSafe = function () {
  const { _id, name, email, role, phone } = this;
  return { _id, name, email, role, phone };
};

export default mongoose.model('User', userSchema);
