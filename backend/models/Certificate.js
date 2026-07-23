const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['Completed', 'In Progress', 'Planned'],
    default: 'Planned'
  },
  issuer: {
    type: String,
    trim: true
  },
  issueDate: {
    type: Date
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  credentialUrl: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Certificate', certificateSchema);