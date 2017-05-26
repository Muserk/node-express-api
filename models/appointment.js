var mongoose = require("mongoose");
var uuid = require("uuid");


var appointmentSchema = new mongoose.Schema({
    id: { type: String, default: uuid.v4},
    startDate: String,
    endDate: String,
    patientId: Number
});

var Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;