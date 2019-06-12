const RatingSchema = require('../db/schema/rating');
const ErrorHandler = require('../utils/errorHandler');


let Rating = {};

/**
 * function to save Rating details in mongo
 * @param {object} RatingData order details - Pid, Uid 
 */
Rating.newRating = async function (ratingData) {

    try {

        let ratingSchema = new RatingSchema(ratingData);
        let ratingSaveResponse = await ratingSchema.save();

        return ratingSaveResponse;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * updates the rating schema
 * @param {object} query query object for a rating schema
 * @param {object} update update object for a raring schema
 */
Rating.updateRating = async function (query, update) {

    try {

        let updatedResponse = await RatingSchema.findOneAndUpdate(query, update, { 'new': true }).lean();
        return updatedResponse;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * returns the rating documents of a product id 
 * @param {String} product 
 */
Rating.getProductRating = async function (productId) {

    try {

        let productRating = await RatingSchema.find({ 'productId': productId }, { __v: 0, _id: 0 }).lean();

        return productRating;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}

/**
 * return the rating of a user given to product
 * @param {String} userId 
 * @param {String} productId 
 */
Rating.getUserRating = async function (userId, productId) {

    try {

        let productRating = await RatingSchema.findOne({ 'userId': userId, 'productId': productId }, { __v: 0, _id: 0 }).lean();
        return productRating;
    }
    catch (err) {

        throw new Error(ErrorHandler.message.INTERNAL_SERVER_ERROR);
    }
}


module.exports = Rating;