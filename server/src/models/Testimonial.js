import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    kind: { type: String, enum: ['quote', 'transformation'], default: 'quote' },
    name: { type: String, required: true },
    source: { type: String, default: 'Google Review' },
    text: String,
    image: String,
    imageAlt: String,
    result: String,
    active: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);
