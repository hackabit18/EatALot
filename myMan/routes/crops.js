const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const vauthenticate = require('../authenticators/vauthenticate');
const fauthenticate = require('../authenticators/fauthenticate');
const authenticate = require('../authenticators/authenticate');

const mongoose = require('mongoose');
const Crops = require('../models/crop');
const Crop_Products = require('../models/crop_product');

const cropRouter = express.Router();

cropRouter.use(bodyParser.json());

//Listing all the categories
cropRouter.route('/')
.get( (req, res, next) => {
    Crops.find({})
    .then((crops) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crops);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( fauthenticate.fverifyUser, (req, res, next) => {
    Crops.create(req.body)
    .then((crop) => {
        console.log('Crop has been created ', crop);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crop);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( fauthenticate.fverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /crops');
})
.delete( fauthenticate.fverifyUser, (req, res, next) => {
    Crops.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


//Listing all the products
cropRouter.route('/:cropType')
.get((req,res,next) => {
    Crop_Products.find({ "category" : req.params.cropType })
    .populate('seller')
    .then((crops) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crops);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( fauthenticate.fverifyUser, (req, res, next) => {
    req.body.seller = req.user._id;
    Crop_Products.create(req.body)
    .then((prod) => {
        console.log("The crop product has been created ", prod);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prod);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( fauthenticate.fverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /crop/'+ req.params.cropType);
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /crop/'+ req.params.cropType);
});


//Showing a single product
cropRouter.route('/:cropType/:prodId')
.get((req,res,next) => {
    Crop_Products.findById(req.params.prodId)
    .populate('seller')
    .populate('comments.author')
    .then((crops) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crops);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( fauthenticate.fverifyUser, (req, res, next) => {
    req.body.seller = req.user._id;
    Crop_Products.create(req.body)
    .then((prod) => {
        console.log("The crop product has been created ", prod);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(prod);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( fauthenticate.fverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /crop/'+ req.params.cropType);
})
.delete( fauthenticate.fverifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /crop/'+ req.params.cropType);
});

//Showing comments for a single product
cropRouter.route('/:cropType/:prodId/comments')
.get((req,res,next) => {
    Crop_Products.findById(req.params.prodId)
    .populate('comments.author')
    .then((prod) => {
        if(prod != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(prod.comments);
        }
        else {
            err = new Error('Product ' + req.params.prodId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, (req, res, next) => {
    Crop_Products.findById(req.params.prodId)
    .then((prod) => {
        if(prod != null) {
            req.body.author = req.user._id;
            prod.comments.push(req.body);
            prod.save()
            .then((prod) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(prod);
            }, (err) => next(err));
        }
        else {
            err = new Error('PRODUCT ' + req.params.prodId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /crop/'+ req.params.cropType);
    /*
    Crops.findByIdAndUpdate(req.params.croptype, {
        $set: req.body
    }, { new: true })
    .then((crop) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(crop);
    }, (err) => next(err))
    .catch((err) => next(err));
    */
})
.delete( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /comments/');
    /*
    Crops.findByIdAndRemove(req.params.cropId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    */
});


//Showing single comment comments for a single product
cropRouter.route('/:cropType/:prodId/comments/:commentId')
.get((req,res,next) => {
    Crop_Products.findById(req.params.prodId)
    .populate('comments.author')
    .then((prod) => {
        if(prod != null && crop_products.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(prod.comments.id(req.params.commentId));
        }
        else {
            err = new Error('Product Comment not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /commentID/');
})
.put( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /crop/');
})
.delete( authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /commentss/');
});


module.exports = cropRouter;

//http://localhost:3000/crops/Pulses/5bcf7c36bc70d1144e6fcd0c/comments