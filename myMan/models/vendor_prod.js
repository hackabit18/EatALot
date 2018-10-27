const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');

const VendorProduct = new Schema({
    name : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true
    },
    phoneno: {
        type : Number,
        required : true,
        unique : true
    },
    email: {
        type : String,
        required : false,
        sparse : true,
        unique : true
    },
    state : {
        type : String,
        required : false
    },
    district : {
        type : String,
        required : false
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
});

VendorProduct.plugin(mongooseUniqueValidator);
VendorProduct.plugin(passportLocalMongoose);
module.exports = mongoose.model('VendorProduct', VendorProduct);