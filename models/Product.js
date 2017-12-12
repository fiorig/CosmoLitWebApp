var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var productSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true
    },
    type: {
      type: String,
      required: false
    },
    rating: {
        type: Number,
        min: 0.0,
        max: 5.0,
        required: true
    },
    cost: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    duration: {
        type: Number,
        required: false
    },
    skin_type: [String]
});

var Product = mongoose.model('Product', productSchema);

module.exports = Product;
