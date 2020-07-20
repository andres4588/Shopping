var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    date: {type: Date, default: Date.now},
    total: {type: Number, required: true},
});

module.exports = mongoose.model('History', schema);