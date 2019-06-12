const RatingModule = require('../../modules/rating');
const ErrorHandler = require('../../utils/errorHandler');
const SuccessHandler = require('../../utils/successHandler');

let Rating = {};


/**
 * function to handle rating product end point
 * @param {object} req request object
 * @param {object} res response object
 */
Rating.productRating = async function (req, res) {

    try {

        let pid = req.body['productId'];
        let userId = req.body['userId'];
        let rating = req.body['rating'];

        //validating parameter
        if (!pid) {

            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'Product Id is required');
        }
        else if (!rating) {

            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'rating is required');
        }
        else if (isNaN(rating) || rating === 0) {

            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'Invalid Rating');
        }
        else {

            let ratingData = {
                'userId': userId,
                'rating': rating,
                'productId': pid
            }
            let productRatingResponse = await RatingModule.productRating(ratingData);
            SuccessHandler.sendSuccessResponse(res, productRatingResponse.type, productRatingResponse.data);
        }
    }
    catch (err) {

        ErrorHandler.sendErrorResponse(res, err.message);
    }
}

/**
 * function to handle rating product end point
 * @param {object} req request object
 * @param {object} res response object
 */
Rating.updateProductRating = async function (req, res) {

    try {

        let pid = req.body['productId'];
        let userId = req.body['userId'];
        let rating = req.body['rating'];

        //validating parameter
        if (!pid) {

            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'Product Id is required');
        }
        else if (!rating) {

            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'rating is required');
        }
        else if (isNaN(rating) || rating === 0) {

            ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'Invalid Rating');
        }
        else {

            let ratingData = {
                'userId': userId,
                'rating': rating,
                'productId': pid
            }
            let productRatingResponse = await RatingModule.updateProductRating(ratingData);
            SuccessHandler.sendSuccessResponse(res, productRatingResponse.type, productRatingResponse.data);
        }
    }
    catch (err) {

        ErrorHandler.sendErrorResponse(res, err.message);
    }
}

/**
 * function to handle user rating to a product request
 * @param {object} req request object
 * @param {object} res response obje
 */
Rating.getUserRatingToProduct = async function (req, res) {

    try {

        let userId = req.body['userId'];
        let productId = req.params['pid'];
        let ratingResponse = await RatingModule.getUserRatingToProduct(userId, productId);
        SuccessHandler.sendSuccessResponse(res, ratingResponse.type, ratingResponse.data);

    }
    catch (err) {

        ErrorHandler.sendErrorResponse(res, err.message);

    }
}

/**
 * function to handle product rating endpoint
 * @param {obje} req 
 * @param {obje} res 
 */
Rating.getProductRating = async function (req, res) {

    try {

        let productId = req.params['pid'];
        let ratingResponse = await RatingModule.getProductRating(productId);
        SuccessHandler.sendSuccessResponse(res, ratingResponse.type, ratingResponse.data);
    }
    catch (err) {

        ErrorHandler.sendErrorResponse(res, err.message);
    }
}
module.exports = Rating;