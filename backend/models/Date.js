const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({

    date: { type: Date },
    latitude: { type: Number },
    longitude: { type: Number },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    invitee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {type: String}

}, {
    timestamps: true
});

module.exports = mongoose.model('Date', dateSchema);