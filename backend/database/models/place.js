const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    location: {
        latitude: {type: String, required: true},
        longitude: {type: String, required: true},
    },
    creatorId: {type: String, required: true}
});

module.exports = mongoose.model('Place', placeSchema);
