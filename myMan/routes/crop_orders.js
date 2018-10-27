const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const vauthenticate = require('../authenticators/vauthenticate');
const fauthenticate = require('../authenticators/fauthenticate');
const authenticate = require('../authenticators/authenticate');

const mongoose = require('mongoose');
const Crops = require('../models/crop');
const Crop_Products = require('../models/crop_product');
const Crop_Orders = require('../models/crop_orders');

const cropOrdersRouter = express.Router();

cropOrdersRouter.use(bodyParser.json());

//For Farmers

//Listing all the orders
cropOrdersRouter.route('/')
.get(fauthenticate.fverifyUser, (req, res, next) => {
    Crop_Orders.find({"seller" : req.user._id})
    .populate({
        path: 'product',
	    populate: {
            path:  'seller'
        }
    })
    .populate('seller')
    .populate('buyer')
    .populate('comments.author')
    .then((crops) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crops);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders');
})
.put( fauthenticate.fverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orders');
})
.delete( fauthenticate.fverifyUser, (req, res, next) => {
    Crop_Orders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


//Single crop order  /corders/:orderId
cropOrdersRouter.route('/:orderId')
.get(fauthenticate.fverifyUser, (req, res, next) => {
    Crop_Orders.find({"seller" : req.user._id,"_id" : req.params.orderId})
    .populate({
        path: 'product',
	    populate: {
            path:  'seller'
        }
    })
    .populate('seller')
    .populate('buyer')
    .populate('comments.author')
    .then((crops) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crops);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /orders');
})
.put( fauthenticate.fverifyUser, (req, res, next) => {
    Crop_Orders.findByIdAndUpdate(req.params.orderId, {
        $set: req.body
    }, { new : true })
    .then((prod) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prod);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete( fauthenticate.fverifyUser, (req, res, next) => {
    Crop_Orders.findByIdAndRemove({"_id" : req.params.orderId})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = cropOrdersRouter;