const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Crop = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Crop', Crop);