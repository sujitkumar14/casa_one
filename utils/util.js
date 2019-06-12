
const jwt = require('jsonwebtoken');


let Util = {};


/**
 * function to create jwt token 
 * @param {object} payload contains data
 * @param {string} secretKey secret key to sign jwt token
 * @param {Number} expiry expire in secs
 */
Util.createJwt = function (payload, secretKey, expiry) {

    return jwt.sign(payload, secretKey, { expiresIn: expiry });
}


module.exports = Util;