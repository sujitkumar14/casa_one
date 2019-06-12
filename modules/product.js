const ProductModel = require('../models/product');
const RatingModel = require('../models/rating');
const RatingModule = require('./rating');
const SuccessHandler = require('../utils/successHandler');
const ErrorHandler = require('../utils/errorHandler');
const Utils = require('../utils/util');
const UUID = require('uuid/v4');


let Product = {};

/**
 * add product id and call model function 
 * to add new product
 * @param {object} productData product data 
 */
Product.addNewProduct = async function (productData) {

    try {

        let data = await ProductModel.getProduct(productData['id']);

        if (data) {

            throw new Error(ErrorHandler.message.PRODUCT_EXIST);
        }
        else {

            let addNewProductResponse = await ProductModel.addNewProduct(productData);
            return { 'type': SuccessHandler.message.PRODUCT_ADDED, data: { 'id': productData['id'] } };
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
}


/**
 * function to get product details from mongo
 * @param {string} id 
 */
Product.getProduct = async function (id) {

    try {

        let productDataAndRating = await Promise.all([ProductModel.getProduct(id), RatingModule.getProductRating(id)]);

        let productData = productDataAndRating[0];
        let ratingData = productDataAndRating[1];
        if (!productData) {
            throw new Error(ErrorHandler.message.PRODUCT_NOT_EXIST);
        }
        else {
            productData['rating'] = 0;
            if (ratingData)
                productData['rating'] = ratingData['data']['rating'];
            return { 'type': SuccessHandler.message.PRODUCT_DETAILS, data: productData };
        }
    }
    catch (err) {

        throw new Error(err.message);
    }
};

/**
 * function to get product details from mongo
 */
Product.getAllProduct = async function () {

    try {

        let productData = await ProductModel.getAllProducts();
        let promiseRating = [];

        for (let i = 0; i < productData.length; i++) {

            promiseRating.push(RatingModule.getProductRating(productData[i]['id']));
        }

        let ratingData = await Promise.all(promiseRating);

        for (let i = 0; i < ratingData.length; i++) {

            productData[i]['rating'] = 0;
            if (ratingData[i])
                productData[i]['rating'] = ratingData[i]['data']['rating'];
        }
        return { 'type': SuccessHandler.message.PRODUCT_DETAILS, data: productData };
    }
    catch (err) {
        throw new Error(err.message);
    }
}

module.exports = Product;