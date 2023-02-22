const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const markerSchema = new Schema({
    markerType: { type: String },
    latitude: {type: Number},
    longitude: {type: Number}
})

module.exports = mongoose.model('Marker', markerSchema);
