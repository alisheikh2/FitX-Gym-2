import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    category: { type: String, default: 'General', index: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('FAQ', faqSchema);
