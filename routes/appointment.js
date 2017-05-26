
var Appointment = require('../models/appointment');
var Response = require('../response');

exports.validate = function(req, res, next) {
    req.checkBody('startDate', 'startDate is required').notEmpty().isISO8601().withMessage('Invalid startDate');
    req.checkBody('endDate', 'endDate is required').notEmpty().isISO8601().withMessage('Invalid endDate');
    req.checkBody('patientId', 'patientId is required').notEmpty();
    
    var errors = req.validationErrors();
    if (errors) {
        res.statusCode = 400;
        return res.json(Response.createErrorResponse(errors));
    }

    return next();
 }

exports.create = function(req, res, next) {
    var newAppointment = Appointment({
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        patientId: req.body.patientId
    });

    newAppointment.save(function(err) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.json(Response.createDataResponse(newAppointment));
    });
};

exports.read = function(req, res, next) {
    Appointment.findOne({ id: req.params.id }, function(err, appointment) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        if (appointment == null) {
            res.statusCode = 404;
            appointment = {};
        }

        res.json(Response.createDataResponse(appointment));
    });
}

exports.update = function(req, res, next) {
    Appointment.findOneAndUpdate({ id: req.params.id }, req.body, {new: true}, function(err, appointment) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.json(Response.createDataResponse(appointment));
    });
}

exports.delete = function(req, res, next) {
    Appointment.findOneAndRemove({ id: req.params.id }, function(err) {
        if (err) {
            res.statusCode = 500;
            return res.json(Response.createErrorResponse([err]));
        }

        res.statusCode = 200;
        return res.json(Response.createDataResponse({}));
    });
}