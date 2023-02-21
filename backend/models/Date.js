const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dateSchema = new Schema({

    

}, {
    timestamps: true
});

module.exports = mongoose.model('Date', dateSchema);