
const OrderModule = require('../../modules/order');
const ErrorHandler = require('../../utils/errorHandler');
const SuccessHandler = require('../../utils/successHandler');

let Order = {};

/**
 * function to handle new order request
 * @param {object} req request object
 * @param {object} res response object 
 */
Order.placeOrder = async function (req, res) {

    let body = req.body;
    let userId = req.body['userId'];
    let productId = body['productId'];
    let form = body['form'];

    //validating parameters
    if (!productId) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'product Id is required');
    }
    else if (!form || form !== 'rent') {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'form is required, must be rent');
    }
    else {

        try {

            let orderData = {
                'userId': userId,
                'productId': productId,
                'form': form
            }
            let orderResponse = await OrderModule.placeOrder(orderData);
            SuccessHandler.sendSuccessResponse(res, orderResponse.type, orderResponse.data);
        }
        catch (err) {

            ErrorHandler.sendErrorResponse(res, err.message);
        }
    }
}


/**
 * function to handle get product request
 * @param {object} req request object
 * @param {object} res response object
 */
Order.getOrder = async function (req, res) {

    try {

        let userId = req.body['userId'];
        let orderId = req.params['id'];
        let orderDataResponse = await OrderModule.getOrder(userId, orderId);
        SuccessHandler.sendSuccessResponse(res, orderDataResponse.type, orderDataResponse.data);

    }
    catch (err) {

        ErrorHandler.sendErrorResponse(res, err.message);
    }
};

module.exports = Order;