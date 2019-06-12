


/**
 * Custom Success Response Handler to send Success messages in response
 */
let ErrorHandler = {};


ErrorHandler.message = {

    INTERNAL_SERVER_ERROR: JSON.stringify({ 'msg': 'Internal Server Error', 'code': 500 }),
    INVALID_PARAMETER: JSON.stringify({ 'msg': 'Invalid Parameter', 'code': 200 }),
    USER_NOT_EXIST: JSON.stringify({ 'msg': 'User not exist', 'code': 200 }),
    EMAIL_PASSWORD_NOT_MATCH: JSON.stringify({ 'msg': 'Email or Password does not match', 'code': 200 }),
    NOT_AUTHORIZED: JSON.stringify({ 'msg': 'Not authorized to use this service', 'code': 200 }),
    PRODUCT_NOT_EXIST: JSON.stringify({ 'msg': 'Product not exist', 'code': 200 }),
    ALREADY_RATED: JSON.stringify({ 'msg': 'Product is already rated by user', 'code': 200 }),
    EMAIL_EXIST: JSON.stringify({ 'msg': 'Email Id already exist', 'code': 200 }),
    USER_NAME_EXIST: JSON.stringify({ 'msg': 'User Name  already exist', 'code': 200 }),
    PHONE_NO_EXIST: JSON.stringify({ 'msg': 'Phone Number already exist', 'code': 200 }),
    PRODUCT_EXIST: JSON.stringify({ 'msg': 'Product  exist', 'code': 200 }),
    NOT_RATED: JSON.stringify({ 'msg': 'Not Rated yet', 'code': 200 }),
    ORDER_NOT_EXIST: JSON.stringify({ 'msg': 'Order Not Exist', 'code': 200 }),


}

/**
 * function send Error Response sends the response for a resquest
 * @param {object} res Response Object
 * @param {Object} successType ErrorHandler message object
 * @param {String} description optional description
 */
ErrorHandler.sendErrorResponse = function (res, errorType, description) {

    errorType = JSON.parse(errorType);



    let errorResponse = {

        'success': false,
        'message': errorType.msg,
        'status': {
            'code': errorType.code,
            'description': description || ""
        }
    };

    res.status(errorType.code).send(errorResponse);
}

module.exports = ErrorHandler;