import mongoose from 'mongoose';

// Content blocks: { type: 'p' | 'h2' | 'ul', text?, items? }
const blockSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ['p', 'h2', 'ul'], required: true },
    text: String,
    items: [String]
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: String,
    cover: String,
    authorName: { type: String, default: 'FITX Coaching Team' },
    tags: [String],
    content: [blockSchema],
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('BlogPost', blogSchema);
