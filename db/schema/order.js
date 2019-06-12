const Mongoose = require('mongoose');


let Schema = Mongoose.Schema;

let order = new Schema({

    'id': { type: String, unique: true },
    'userId': { type: String, required: true },
    'productId': { type: String, required: true },
    'form': { type: String, required: true },
    'createdAt': { type: String, default: Date.now },
    'updatedAt': { type: String, default: Date.now }
});

module.exports = Mongoose.model('order', order);