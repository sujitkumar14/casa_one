const OrderModel = require('../models/order');
const ProductModel = require('../models/product');
const SuccessHandler = require('../utils/successHandler');
const ErrorHandler = require('../utils/errorHandler');
const Utils = require('../utils/util');
const UUID = require('uuid/v4');


let Order = {};

/**
 * function to place an order and saves the order in mongo
 * @param {object} orderData - order details userId, productId
 */
Order.placeOrder = async function (orderData) {

    try {

        let productData = await ProductModel.getProduct(orderData['productId']);
        if (productData === null) {
            throw new Error(ErrorHandler.message.PRODUCT_NOT_EXIST);
        }
        else {
            orderData['id'] = UUID().split("-").join("");
            let placeOrderResponse = await OrderModel.newOrder(orderData);
            return { 'type': SuccessHandler.message.ORDER_SUCCESSFULL, data: { 'id': orderData['id'] } };
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
}


/**
 * function to get Order details from mongo
 * @param {string} id 
 */
Order.getOrder = async function (userId, orderId) {

    try {

        let orderData = await OrderModel.getFromUserIdAndOrderId(userId, orderId);
        if (!orderData) {
            
            throw new Error(ErrorHandler.message.ORDER_NOT_EXIST);
        }
        else {
            return { 'type': SuccessHandler.message.ORDER_DETAILS, data: orderData };
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
};

module.exports = Order;