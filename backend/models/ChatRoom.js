const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatRoomSchema = new Schema({
  sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);