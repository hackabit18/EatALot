var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Vendor = require('../models/vendor');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');

//~Local Strategy
exports.local = passport.use('vendorLocal', new LocalStrategy(Vendor.authenticate()));

passport.serializeUser(Vendor.serializeUser());
passport.deserializeUser(Vendor.deserializeUser());

//~JWT Strategy
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
};

//~Extracting options available
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use('jwt-v', new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload VENDOR AUTHENTICATE : ", jwt_payload);
        Vendor.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.vverifyUser = passport.authenticate( 'jwt-v', {session: false});