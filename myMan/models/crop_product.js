const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var Prod_Comments = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});


var Crop_Product = new Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false,
        default: ''
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },

    price: {
        type: Currency,
        required: true,
        min: 0
    },

    comments: [Prod_Comments]

}, {
    timestamps: true
});

module.exports = mongoose.model('Crop_Product', Crop_Product);