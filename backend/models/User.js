const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    profileImageUrl: { type: String },
    email: { type: String, unique: true },
    hashedPassword: { type: String },
    otherPhotos: { type: [String] },
    puppyName: { type: String },
    puppyBreed: { type: String },
    puppyAge: { type: Number, min: 0, max: 100 },
    puppyVaccinated: { type: Boolean },
    name: { type: String },
    ownerAge: { type: Number, min: 5, max: 200 },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Friend' }],
    dates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Date' }],
    friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FriendRequest' }],
    dateRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DateRequest' }],
    latitude: { type: Number },
    longitude: { type: Number },
    signedIn: { type: Boolean, default: false },
    puppyTemperament: { type: String },
    chatRooms: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom'}],
    messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChatMessage'}]

}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);

