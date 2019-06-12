
const ProductModule = require('../../modules/product');
const ErrorHandler = require('../../utils/errorHandler');
const SuccessHandler = require('../../utils/successHandler');

let Product = {};

/**
 * function to handle new product request
 * @param {object} req request object
 * @param {object} res response object 
 */
Product.addNewProduct = async function (req, res) {

    let body = req.body;

    let id = body['id'];
    let productName = body['name'];
    let price = body['price'];
    let priceUnit = body['priceUnit'];

    //validating parameters

    if (!productName) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'name is required');
    }
    else if (!id) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'id is required');

    }
    else if (!price) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'price is required');
    }
    else if (isNaN(price)) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'price should be a valid number');
    }
    else if (!priceUnit) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, 'price unit is required');
    }
    else {

        try {

            let productData = {
                'name': productName,
                'price': price,
                'priceUnit': priceUnit,
                'id': id
            }

            let addNewProductResponse = await ProductModule.addNewProduct(productData);
            SuccessHandler.sendSuccessResponse(res, addNewProductResponse.type, addNewProductResponse.data);
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
Product.getProduct = async function (req, res) {

    try {

        let productId = req.params['pid'];
        let productDataResponse = await ProductModule.getProduct(productId);
        SuccessHandler.sendSuccessResponse(res, productDataResponse.type, productDataResponse.data);

    }
    catch (err) {

        ErrorHandler.sendErrorResponse(res, err.message);
    }
};

/**
 * function to handle product request
 * @param {object} req request object
 * @param {object} res response object
 */
Product.getAllProduct = async function (req, res) {

    try {
        let productResponse = await ProductModule.getAllProduct();
        SuccessHandler.sendSuccessResponse(res, productResponse.type, productResponse.data);
    }
    catch (err) {

        ErrorHandler.sendErrorResponse(res, err.message);
    }
}
module.exports = Product;