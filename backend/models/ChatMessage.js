const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema({
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  body: {type: String},
  chatRoom: {type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom'}
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatMessage', chatMessageSchema);