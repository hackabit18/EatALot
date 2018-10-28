var express = require('express');
var router = express.Router();
var passport = require('passport');
const bodyParser = require('body-parser');
var Farmer = require('../models/farmer');
var fauthenticate = require('../authenticators/fauthenticate');

router.use(bodyParser.json());

/* GET farmers listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    Farmer.register( new Farmer({username: req.body.username, firstname: req.body.firstname,
        phoneno : req.body.phoneno, aadhar : req.body.aadhar, lastname : req.body.lastname,
        email: req.body.email, state: req.body.state, district : req.body.district,
        gender : req.body.gender
    }), req.body.password,

    (err, farmer) => {

        if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        }

        else {
            farmer.save((err, farmer) => {
                if(err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return;
                }

                passport.authenticate('farmerLocal')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                });
            });
        }
    });
});


router.post('/login', passport.authenticate('farmerLocal'), (req, res) => {

    var token = fauthenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!', type : 'farmer'});
});

//~Logout when using Sessions
/*
router.get('/logout', function (req, res){
    if(req.session) {
        req.session.destroy(function (err) {
            req.logout();
            res.clearCookie('session-id');
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
});
*/

module.exports = router;