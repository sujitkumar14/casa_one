const Mongoose = require('mongoose');


let Schema = Mongoose.Schema;

let rating = new Schema({

    'id': { type: String, unique: true },
    'userId': { type: String, required: true },
    'productId': { type: String, required: true },
    'rating': { type: Number, required: true },
    'verifiedUser': { type: Boolean, default: false },
    'createdAt': { type: String, default: Date.now },
    'updatedAt': { type: String, default: Date.now }
});

module.exports = Mongoose.model('rating', rating);