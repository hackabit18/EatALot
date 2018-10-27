const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var mongooseUniqueValidator = require('mongoose-unique-validator');
var passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstname : {
        type: String,
        required: true
    },
    lastname : {
        type: String,
        required: false,
        default: "Empty last name"
    },
    phoneNo: {
        type: Number,
        required: false
    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(mongooseUniqueValidator);
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);