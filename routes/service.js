
var Service = require('../models/service');
var Response = require('../response');

exports.validate = function(req, res, next) {
    req.checkBody('name', 'name is required').notEmpty().isAlphanumeric().withMessage('Invalid name');
    req.checkBody('duration', 'duration is required').notEmpty().isNumeric().withMessage('Invalid duration');
    
    var errors = req.validationErrors();
    if (errors) {
        res.statusCode = 400;
        return res.json(Response.createErrorResponse(errors));
    }

    return next();
 }

exports.create = function(req, res, next) {
    var newService = Service({
        name: req.body.name,
        duration: req.body.duration
    });

    newService.save(function(err) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.json(Response.createDataResponse(newService));
    });
};

exports.read = function(req, res, next) {
    Service.findOne({ id: req.params.id }, function(err, service) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        if (service == null) {
            res.statusCode = 404;
            service = {};
        }

        res.json(Response.createDataResponse(service));
    });
}

exports.update = function(req, res, next) {
    Service.findOneAndUpdate({ id: req.params.id }, req.body, {new: true}, function(err, service) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.json(Response.createDataResponse(service));
    });
}

exports.delete = function(req, res, next) {
    Service.findOneAndRemove({ id: req.params.id }, function(err) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.statusCode = 200;
        return res.json(Response.createDataResponse({}));
    });
}