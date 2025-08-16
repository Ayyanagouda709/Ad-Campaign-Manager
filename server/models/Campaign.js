const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: String,
  platform: String,
  startDate: String,
  endDate: String,
  budget: Number,
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Campaign', campaignSchema);
