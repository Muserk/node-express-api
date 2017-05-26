
var Patient = require('../models/patient');
var Response = require('../response');

exports.validate = function(req, res, next) {
    req.checkBody('firstName', 'firstName is required').notEmpty().isAlpha().withMessage('Invalid firstName');
    req.checkBody('lastName', 'lastName is required').notEmpty().isAlpha().withMessage('Invalid lastName');
    req.checkBody('phoneNumber', 'phoneNumber is required').notEmpty().isNumeric().withMessage('Invalid phoneNumber');
    
    var errors = req.validationErrors();
    if (errors) {
        res.statusCode = 400;
        return res.json(Response.createErrorResponse(errors));
    }

    return next();
 }

exports.create = function(req, res, next) {
    var newPatient = Patient({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber
    });

    newPatient.save(function(err) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.json(Response.createDataResponse(newPatient));
    });
};

exports.read = function(req, res, next) {
    Patient.findOne({ id: req.params.id }, function(err, patient) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        if (patient == null) {
            res.statusCode = 404;
            patient = {};
        }

        res.json(Response.createDataResponse(patient));
    });
}

exports.update = function(req, res, next) {
    Patient.findOneAndUpdate({ id: req.params.id }, req.body, {new: true}, function(err, patient) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.json(Response.createDataResponse(patient));
    });
}

exports.delete = function(req, res, next) {
    Patient.findOneAndRemove({ id: req.params.id }, function(err) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.statusCode = 200;
        return res.json(Response.createDataResponse({}));
    });
}