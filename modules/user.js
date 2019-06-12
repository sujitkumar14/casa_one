
const UserModel = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const SuccesHandler = require('../utils/successHandler');
const Util = require('../utils/util');
const Crypto = require('crypto');
const UUID = require('uuid/v4');

let User = {};

/**
 * function Register create a MD5 hash of a password and 
 * sends users data to UserModel to save in Database
 * 
 * @param {object} userData contains the data of a user
 * @returns {object} returns the object containing SuccessResponse
 */
User.Register = async function (userData) {

    try {

        //validating parameters
        let data = await Promise.all([
            UserModel.getUserFromEmail(userData['emailId']),
            UserModel.getUserFromPhoneNumber(userData['phoneNumber']),
            UserModel.getUserFromUserName(userData['userName'])
        ]);

        //if email exist
        if (data[0]) {

            throw new Error(ErrorHandler.message.EMAIL_EXIST);
        }
        else if (data[1]) {
            //phone number exist
            throw new Error(ErrorHandler.message.PHONE_NO_EXIST);
        }
        else if (data[2]) {
            //user name exist
            throw new Error(ErrorHandler.message.USER_NAME_EXIST);
        }
        else {
            //converting plain text format password into a md5 hash
            userData['id'] = UUID().split('-').join("");
            userData['password'] = Crypto.createHash('md5').update(userData['password']).digest('hex');
            let userRegisterResponse = await UserModel.Register(userData);

            return { 'type': SuccesHandler.message.REGISTRATION_SUCCESSFULL, 'data': { 'id': userData['id'] } };
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
}


/**
 * function to check login crendentials and return the 
 * jwt token for session and authentication for another 
 * endpoints
 * @param {string} emailId email Id of a user
 * @param {*} password password of a user
 * @returns {object} jwt token
 */
User.login = async function (emailId, password) {

    try {

        password = Crypto.createHash('md5').update(password).digest('hex');
        let userData = await UserModel.getUserFromEmail(emailId);

        if (userData) {

            let userPassword = userData['password'];
            if (userPassword === password) {

                let jwt = Util.createJwt({ 'userId': userData['id'] }, _config['userSecretKey'], 60 * 60);

                return { 'type': SuccesHandler.message.LOGIN_SUCCESSFULL, 'data': { 'jwt': jwt } };

            }
            else {

                throw new Error(ErrorHandler.message.EMAIL_PASSWORD_NOT_MATCH);
            }

        }
        else {

            throw new Error(ErrorHandler.message.USER_NOT_EXIST);
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
}

/**
 * function to return users details
 * @param {string} userId - user's Id
 */
User.getUserData = async function (userId) {

    try {
        let userData = await UserModel.getUserFromUserId(userId);
        delete userData['password'];
        return { 'type': SuccesHandler.message.USER_DATA, 'data': userData };
    }
    catch (err) {

        throw new Error(err.message);
    }
}


module.exports = User;


