
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');



let Auth = {};

/**
 * middlware function to verify user
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
Auth.verifyUser = async function (req, res, next) {


    let token = req.headers['token'];
    jwt.verify(token, _config['userSecretKey'], function (err, decoded) {

        if (err)
            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.NOT_AUTHORIZED);
        else {
            req.body['userId'] = decoded['userId'];
            next();
        }
    });
}


/**
 * middleware function to verify admin
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
Auth.verifyAdmin = async function (req, res, next) {

    let token = req.headers['token'];
    jwt.verify(token, _config['adminSecretKey'], function (err, decoded) {

        if (err)
            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.NOT_AUTHORIZED);
        else {
            next()
        }
    });
}

module.exports = Auth;