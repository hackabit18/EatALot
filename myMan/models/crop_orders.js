const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var Crop_Order = new Schema({

    accepted: {
        type: Boolean,
        default: false
    },

    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop_Product'
    },

    description: {
        type: String,
        required: false
    },

    quantity: {
        type: String,
        required: true
    },

    price: {
        type: Currency,
        required: true,
        min: 0
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer'
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Crop_Order', Crop_Order);