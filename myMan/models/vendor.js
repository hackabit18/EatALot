const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');

const Vendor = new Schema({
    shopname : {
        type : String,
        required : true,
        sparse : true,
        unique : true
    },
    ownername : {
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
    admin: {
        type : Boolean,
        default : false
    },
    state : {
        type : String,
        required : false
    },
    district : {
        type : String,
        required : false
    },
    bregno : {
        type : String,
        required : false,
        sparse : true,
        unique : true
    }
});

Vendor.plugin(mongooseUniqueValidator);
Vendor.plugin(passportLocalMongoose);
module.exports = mongoose.model('Vendor', Vendor);