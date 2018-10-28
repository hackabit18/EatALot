const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');

const Farmer = new Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: false
    },
    phoneno: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        sparse : true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    state : {
        type : String,
        required: false
    },
    district : {
        type : String,
        required: false
    },
    gender : {
        type : String,
        required: false
    },
    aadhar : {
        type : String,
        sparse : true,
        required : false,
        unique: true
    }
});

Farmer.plugin(mongooseUniqueValidator);
Farmer.plugin(passportLocalMongoose);
module.exports = mongoose.model('Farmer', Farmer);