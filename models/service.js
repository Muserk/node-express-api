var mongoose = require("mongoose");
var uuid = require("uuid");


var serviceSchema = new mongoose.Schema({
    id: { type: String, default: uuid.v4},
    name: String,
    duration: Number
});

var Service = mongoose.model('Service', serviceSchema);

module.exports = Service;