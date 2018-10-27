var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Farmer = require('../models/farmer');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config');

//~Local Strategy
exports.local = passport.use('farmerLocal', new LocalStrategy(Farmer.authenticate()));

passport.serializeUser(Farmer.serializeUser());
passport.deserializeUser(Farmer.deserializeUser());

//~JWT Strategy
exports.getToken = function(farmer) {
    return jwt.sign(farmer, config.secretKey, { expiresIn: 3600 });
};

//~Extracting options available
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use('jwt-f', new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload FARMER AUTHENTICATE : ", jwt_payload);
        Farmer.findOne({_id: jwt_payload._id}, (err, farmer) => {
            if (err) {
                return done(err, false);
            }
            else if (farmer) {
                return done(null, farmer);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.fverifyUser = passport.authenticate('jwt-f', {session: false});