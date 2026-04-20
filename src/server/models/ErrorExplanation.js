import mongoose from 'mongoose';

const errorExplanationSchema = new mongoose.Schema({
  errorText: {
    type: String,
    required: true,
    trim: true
  },
  language: {
    type: String,
    required: true,
    enum: ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Other']
  },
  explanation: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  sessionId: {
    type: String,
    default: null
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  helpfulCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster searches
errorExplanationSchema.index({ errorText: 'text', language: 1 });
errorExplanationSchema.index({ userId: 1, createdAt: -1 });
errorExplanationSchema.index({ sessionId: 1, createdAt: -1 });

// Update the updatedAt field on save
errorExplanationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model('ErrorExplanation', errorExplanationSchema);
