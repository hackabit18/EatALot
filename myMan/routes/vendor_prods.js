var express = require('express');
var router = express.Router();
var passport = require('passport');
const bodyParser = require('body-parser');
var Vendor = require('../models/vendor');
var VendorProds = require('../models/vendor_prod');
var vauthenticate = require('../authenticators/vauthenticate');

const vendorProdsRouter = express.Router();

vendorProdsRouter.use(bodyParser.json());

//For Farmers

//Listing all the orders
vendorProdsRouter.route('/')
.get((req, res, next) => {
    VendorProds.find({})
    .populate('seller')
    .then((prods) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prods);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( vauthenticate.vverifyUser, (req, res, next) => {
    req.body.seller = req.user._id;
    VendorProds.create(req.body)
    .then((prod) => {
        console.log("The vendor product has been created ", prod);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prod);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( vauthenticate.vverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete( vauthenticate.vverifyUser, (req, res, next) => {
    VendorProds.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


//Single crop order  /corders/:prodId
vendorProdsRouter.route('/:prodId')
.get( vauthenticate.vverifyUser, (req, res, next) => {
    VendorProds.find({"_id" : req.params.prodId})
    .populate('seller')
    .then((crops) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crops);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( vauthenticate.vverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders');
})
.put( vauthenticate.vverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /prodId/'+ req.params.prodId);
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /prodId/'+ req.params.prodId);
});

module.exports = vendorProdsRouter;