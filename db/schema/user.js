

const Mongoose = require('mongoose');


let Schema = Mongoose.Schema;

let User = new Schema({

    'id': { type: String, unique: true },
    'firstName': { type: String, required: true },
    'lastName': { type: String, default: '' },
    'phoneNumber': { type: Number, unique: true },
    'emailId': { type: String, unique: true },
    'password': { type: String, required: true },
    'userName': { type: String, unique: true },
    'createdAt': { type: String, default: Date.now },
    'updatedAt': {type: String, default: Date.now}
});


module.exports = Mongoose.model("user", User);