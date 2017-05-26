var mongoose = require("mongoose");
var uuid = require("uuid");

var patientSchema = new mongoose.Schema({
    id: { type: String, default: uuid.v4},
    firstName: String,
    lastName: String,
    phoneNumber: String
});

var Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;