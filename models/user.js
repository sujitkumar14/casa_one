

const UserSchema = require('../db/schema/user');
const ErrorHandler = require('../utils/errorHandler');


let User = {};

/**
 * Register function saves the data of user in db
 * @param {object} userData contains all the user data needs to save in db
 * @return {} returns saved object 
 */
User.Register = async function (userData) {

    try {

        let userSchema = new UserSchema(userData);
        let saveResponse = await userSchema.save();
        return saveResponse;

    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
};


/**
 * function to return the user data if exist
 * @param {string} emailId email id of a user
 */
User.getUserFromEmail = async function (emailId) {

    try {

        let userData = await UserSchema.findOne({ 'emailId': emailId }, { __v: 0, _id: 0 }).lean();
        return userData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * function to return the user data if exist
 * @param {string} userName user name of a user
 */
User.getUserFromUserName = async function (userName) {

    try {

        let userData = await UserSchema.findOne({ 'userName': userName }, { __v: 0, _id: 0 }).lean();
        return userData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * function to return the user data if exist
 * @param {string} phoneNumber phone number of a user
 */
User.getUserFromPhoneNumber = async function (phoneNumber) {

    try {

        let userData = await UserSchema.findOne({ 'phoneNumber': phoneNumber }, { __v: 0, _id: 0 }).lean();
        return userData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}


/**
 * functio to return the user data 
 * @param {string} userId user id of an user
 */
User.getUserFromUserId = async function (userId) {

    try {

        let userData = await UserSchema.findOne({ 'id': userId }, { __v: 0, _id: 0 }).lean();
        return userData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}
module.exports = User;