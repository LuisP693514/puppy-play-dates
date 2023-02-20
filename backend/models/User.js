const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    profileImageUrl: { type: String },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    otherPhotos: { type: [String] },
    puppyName: { type: String, required: true },
    puppyBreed: { type: String, required: true },
    puppyAge: { type: Number, min: 0, max: 100 },
    puppyVaccinated: { type: Boolean, required: true },
    name: { type: String, required: true },
    ownerAge: { type: Number, min: 5, max: 200 }
    
}, {
    timestamps: true
});


module.exports = mongoose.model('User', userSchema);

