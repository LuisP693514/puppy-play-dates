const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({

    day: {type: Date},
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    invitee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Date', dateSchema);