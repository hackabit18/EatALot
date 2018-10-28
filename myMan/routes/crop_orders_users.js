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

//For Users


//Listing all the orders
cropOrdersRouter.route('/')
.get( authenticate.verifyUser, (req, res, next) => {
    console.log("The buyer detailswa ", req.user);
    Crop_Orders.find({"buyer" : req.user._id})
    .populate({
        path: 'product',
	    populate: {
            path:  'seller'
        }
    })
    .populate('seller')
    .populate('buyer')
    .populate('product.seller')
    //See this
    .populate('product.comments.author')
    .then((crops) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crops);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, (req, res, next) => {
    console.log(req.user);
    req.body.buyer = req.user._id;
    Crop_Orders.create(req.body)
    .then((crop) => {
        console.log('Crop has been created ', crop);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crop);
    }, (err) => next(err))
    .catch((err) => next(err));
    //req.body.price = (+req.body.quantity) * price
})
.put( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /crops');
})
.delete( authenticate.verifyUser, (req, res, next) => {
    Crop_Orders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = cropOrdersRouter;