var express = require('express');
var router = express.Router();
var passport = require('passport');
const bodyParser = require('body-parser');
var Vendor = require('../models/vendor');
var vauthenticate = require('../authenticators/vauthenticate');

router.use(bodyParser.json());

/* GET vendors listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
    Vendor.register( new Vendor({
        username: req.body.username, shopname: req.body.shopname, ownername : req.body.ownername,
        phoneno: req.body.phoneno, email: req.body.email, bregno: req.body.bregno,
        state: req.body.state, district : req.body.district
    }), req.body.password,
    (err, vendor) => {

        if(err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
        }

        else {
            vendor.save((err, vendor) => {
                if(err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({err: err});
                    return;
                }

                passport.authenticate('vendorLocal')(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({success: true, status: 'Registration Successful!'});
                });
            });
        }
    });
});


router.post('/login', passport.authenticate('vendorLocal'), (req, res) => {

    var token = vauthenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!', type : 'vendor'});
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