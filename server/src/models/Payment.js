import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    txnId: { type: String, unique: true },
    member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true, index: true },
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'MembershipPlan', default: null },
    serviceLabel: { type: String, default: '' },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, enum: ['Cash', 'Bank Transfer', 'Card', 'Other'], default: 'Cash' },
    date: { type: Date, default: Date.now, index: true },
    notes: String,
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

paymentSchema.pre('validate', async function (next) {
  if (!this.txnId) {
    const crypto = await import('node:crypto');
    this.txnId = `FITX-${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
  }
  next();
});

export default mongoose.model('Payment', paymentSchema);
