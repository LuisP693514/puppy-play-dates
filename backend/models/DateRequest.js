const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DateRequestSchema = new Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
  date: { type: Date },
  latitude: { type: Number },
  longitude: { type: Number },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  invitee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String },
  description: { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('DateRequest', DateRequestSchema);