


/**
 * Custom Success Response Handler to send Success messages in response
 */
let SuccessHandler = {};


SuccessHandler.message = {

    REGISTRATION_SUCCESSFULL: { 'msg': 'Successfully Registered', 'code': 200 },
    LOGIN_SUCCESSFULL: { 'msg': 'login successfull', 'code': 200 },
    USER_DATA: { 'msg': 'user data', 'code': 200 },
    PRODUCT_ADDED: { 'msg': 'Product added Successfully', 'code': 200 },
    PRODUCT_DETAILS: { 'msg': 'Product Details', 'code': 200 },
    ORDER_SUCCESSFULL: { 'msg': 'Order Placed Successfully', 'code': 200 },
    PRODUCT_RATED: { 'msg': 'product rated', 'code': 200 },
    PRODUCT_RATING: { 'msg': 'product rating', 'code': 200 },
    ORDER_DETAILS: { 'msg': 'order details', code: 200 }

}

/**
 * function send Success Response sends the response for a resquest
 * @param {object} res Response Object
 * @param {Object} successType SuccessHandler message object
 * @param {Object} data Data we are sending in success message 
 * @param {String} description optional description
 */
SuccessHandler.sendSuccessResponse = function (res, successType, datas, description) {

    let successResponse = {

        'success': true,
        'message': successType.msg,
        'data': datas,
        'status': {
            'code': successType.code,
            'description': description || ""
        }
    };

    res.status(successType.code).send(successResponse);
}

module.exports = SuccessHandler;