const OrderModel = require('../models/order');
const ProductModel = require('../models/product');
const RatingModel = require('../models/rating');
const SuccessHandler = require('../utils/successHandler');
const ErrorHandler = require('../utils/errorHandler');
const Utils = require('../utils/util');
const UUID = require('uuid/v4');


let Rating = {};

/**
 * function saves the rating data after validating
 * product and check for verified user - if user already had buy this product
 * @param {object} ratingData - rating details userId, productId
 */
Rating.productRating = async function (ratingData) {

    try {

        let data = await Promise.all([
            ProductModel.getProduct(ratingData['productId']),
            OrderModel.getFromUserIdAndProductId(ratingData['userId'], ratingData['productId']),
            RatingModel.getUserRating(ratingData['userId'], ratingData['productId'])
        ]);

        let productData = data[0];
        let orderData = data[1];
        let userRating = data[2];

        if (productData === null) {
            throw new Error(ErrorHandler.message.PRODUCT_NOT_EXIST);
        }
        else if (userRating) {
            throw new Error(ErrorHandler.message.ALREADY_RATED);
        }
        else {
            if (orderData) {
                ratingData['verifiedUser'] = true;
            }

            ratingData['id'] = UUID().split("-").join("");
            let ratingDataResponse = await RatingModel.newRating(ratingData);
            return { 'type': SuccessHandler.message.PRODUCT_RATED, 'data': { 'id': ratingData['id'] } };
        }

    }
    catch (err) {

        throw new Error(err.message);
    }
}

/**
 * function to update product rating 
 * @param {object} ratingData contain userId , productiD
 */
Rating.updateProductRating = async function (ratingData) {

    try {

        let newRatingData = await RatingModel.getUserRating(ratingData['userId'], ratingData['productId']);

        if (!newRatingData) {
            throw new Error(ErrorHandler.message.NOT_RATED);
        }
        else {

            let query = {
                'userId': ratingData['userId'],
                'productId': ratingData['productId']
            }
            let update = {

                'rating': ratingData['rating']
            }

            let updateResponse = await RatingModel.updateRating(query, update);
            return { 'type': SuccessHandler.message.PRODUCT_RATED, 'data': { 'id': updateResponse['id'] } };
        }
    }
    catch (err) {
        throw new Error(err.message);
    }

}

/**
 * function returns the product id rating given by the user id
 * validating product exist and user rated this product or not
 * @param {string} userId 
 * @param {string} productId 
 */
Rating.getUserRatingToProduct = async function (userId, productId) {

    try {

        let productDetails = await ProductModel.getProduct(productId);
        if (!productDetails) {
            throw new Error(ErrorHandler.message.PRODUCT_NOT_EXIST);
        }
        else {
            let ratingData = await RatingModel.getUserRating(userId, productId);
            if (!ratingData) {
                throw new Error(ErrorHandler.message.NOT_RATED);
            }
            else {
                return { 'type': SuccessHandler.message.PRODUCT_RATING, 'data': ratingData };
            }
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
}

/**
 * function calculate rating of a product 
 * @param {string} productId 
 */
Rating.getProductRating = async function (productId) {

    try {

        let productDetails = await ProductModel.getProduct(productId);
        if (!productDetails) {
            throw new Error(ErrorHandler.message.PRODUCT_NOT_EXIST);
        }
        else {
            let ratingData = await RatingModel.getProductRating(productId);
            let rating;
            let totalRating = ratingData.length;

            rating = ratingData.reduce((acc, currentValue) => {

                return acc + currentValue['rating'];
            }, 0)

            rating = rating / totalRating;

            let data = {
                'rating': rating,
                'total': totalRating,
                'productId': productId
            }

            return { 'type': SuccessHandler.message.PRODUCT_RATING, 'data': data };
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
}
module.exports = Rating;