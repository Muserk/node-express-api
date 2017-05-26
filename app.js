var config = require('./config'),
    express = require('express'),
    expressValidator = require('express-validator'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    response = require('./response');

mongoose.connect(config.client.mongodb.defaultUri + "/" + config.client.mongodb.defaultDatabase);

var app = express();
app.use(bodyParser.json());
app.use(expressValidator());

// Append-mode write stream
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
app.use(morgan('combined', {stream: accessLogStream}))

var patient = require('./routes/patient');
var service = require('./routes/service');
var appointment = require('./routes/appointment');

// Patient routes
app.post('/patient', patient.validate, patient.create);
app.get('/patient/:id', patient.read);
app.put('/patient/:id', patient.validate, patient.update);
app.delete('/patient/:id', patient.delete);

// Appointment routes
app.post('/appointment', appointment.validate, appointment.create);
app.get('/appointment/:id', appointment.read);
app.put('/appointment/:id', appointment.validate, appointment.update);
app.delete('/appointment/:id', appointment.delete);

// Service routes
app.post('/service', service.validate, service.create);
app.get('/service/:id', service.read);
app.put('/service/:id', service.validate, service.update);
app.delete('/service/:id', service.delete);



module.exports = app;