const OrderSchema = require('../db/schema/order');
const ErrorHandler = require('../utils/errorHandler');


let Order = {};

/**
 * function to save order details in mongo
 * @param {object} orderData order details - Pid, Uid 
 */
Order.newOrder = async function (orderData) {

    try {

        let orderSchema = new OrderSchema(orderData);
        let orderSaveResponse = await orderSchema.save();

        return orderSaveResponse;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * function to the all the orders of an user
 * @param {string} userId 
 */
Order.getUserOrder = async function (userId) {

    try {

        let userOrders = await OrderSchema.find({ 'userId': userId }, { __v: 0, _id: 0 }).lean();

        return userOrders;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * function return the order details using Id
 * @param {string} id 
 */
Order.getOrder = async function (id) {

    try {

        let orderData = await OrderSchema.findOne({ 'id': id }, { __v: 0, _id: 0 }).lean();
        return orderData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}


/**
 * return the order having userId and orderId
 * @param {string} userId 
 * @param {string} orderId 
 */
Order.getFromUserIdAndOrderId = async function (userId, orderId) {

    try {

        let orderData = await OrderSchema.findOne({ 'userId': userId, 'id': orderId }, { __v: 0, _id: 0 }).lean();
        return orderData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * return the order having userId and productId
 * @param {string} userId 
 * @param {string} productId 
 */
Order.getFromUserIdAndProductId = async function (userId, productId) {

    try {

        let orderData = await OrderSchema.findOne({ 'userId': userId, 'productId': productId }, { __v: 0, _id: 0 }).lean();
        return orderData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}


module.exports = Order;