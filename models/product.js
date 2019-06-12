
const ProductSchema = require('../db/schema/product');
const ErrorHandler = require('../utils/errorHandler');


let Product = {};

/**
 * saves the product in the mongo
 * @param {object} productData contains product details
 */
Product.addNewProduct = async function (productData) {

    try {

        let productSchema = new ProductSchema(productData);
        let saveProductResponse = await productSchema.save();
        return saveProductResponse;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * function to return the product details
 * @param {string} id 
 */
Product.getProduct = async function (id) {

    try {

        let productData = await ProductSchema.findOne({ 'id': id }, { __v: 0, _id: 0 }).lean();
        return productData;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * function to return all the products
 */
Product.getAllProducts = async function () {

    try {
        let productData = await ProductSchema.find({}, { __v: 0, _id: 0 }).lean();
        return productData;
    }
    catch (err) {
        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

module.exports = Product;