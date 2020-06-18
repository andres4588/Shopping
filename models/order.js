var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    cart: {type: Object, required: true}
});

module.exports = mongoose.model('Order', schema);