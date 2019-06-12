const Mongoose = require('mongoose');

let Schema = Mongoose.Schema;

let product = new Schema({

    'id': { type: String, unique: true },
    'name': { type: String, require: true },
    'price': { type: String, required: true },
    'priceUnit': {type:String, required:true},
    'createdAt': { type: String, default: Date.now },
    'updatedAt': { type: String, default: Date.now }
});

module.exports = Mongoose.model('product', product);