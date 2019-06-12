
const UserModule = require('../../modules/user');
const SuccessHandler = require('../../utils/successHandler');
const ErrorHandler = require('../../utils/errorHandler');

let User = {};

/**
 * function to Handle Registe Request from the frontEnd
 * @param {object} req 
 * @param {object} res 
 */
User.Register = async function (req, res) {

    let body = req.body;
    //user details we get from frontEnd
    let firstName = body['firstName'];
    let lastName = body['lastName'];
    let userName = body['userName'];
    let password = body['password'];
    let phoneNumber = body['phoneNumber'].toString();
    let emailId = body['emailId'];

    //validating  parameters
    if (!firstName) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "First Name is required");
    }
    else if (!userName) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "User Name is required");
    }
    else if (!password) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "Invalid Password");
    }
    else if (!phoneNumber) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "Phone Number is required");
    }
    else if (isNaN(phoneNumber) || phoneNumber.length < 10 && phoneNumber.length > 10) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "Please Enter a Valid Phone Number");
    }
    else if (!emailId) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "Email Id is required");
    }
    else {

        try {
            let userData = {
                'firstName': firstName,
                'lastName': lastName,
                'userName': userName,
                'password': password,
                'phoneNumber': phoneNumber,
                'emailId': emailId
            }

            let registerResponse = await UserModule.Register(userData);
            SuccessHandler.sendSuccessResponse(res, registerResponse.type, registerResponse.data);
        }
        catch (err) {

            ErrorHandler.sendErrorResponse(res, err.message);
        }
    }
};


/**
 * function to handle login request 
 * @param {object} req request Object
 * @param {object} res response Object
 */
User.login = async function (req, res) {

    let body = req.body;
    let emailId = body['emailId'];
    let password = body['password'];

    //validating parameters
    if (!emailId) {

        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "Email Id is required");
    }
    else if (!password) {
        ErrorHandler.sendErrorResponse(res, ErrorHandler.message.INVALID_PARAMETER, "Invalid Password");
    }
    else {
        try {
            let loginResponse = await UserModule.login(emailId, password);
            SuccessHandler.sendSuccessResponse(res, loginResponse.type, loginResponse.data);
        }
        catch (err) {

            ErrorHandler.sendErrorResponse(res, err.message);
        }
    }
};

/**
 * function to handle get User request
 * @param {object} req request object
 * @param {bject} res response object
 */
User.getUser = async function (req, res) {

    //userId received from middleware
    let userId = req.body.userId;

    try {

        let userDataResponse = await UserModule.getUserData(userId);
        SuccessHandler.sendSuccessResponse(res, userDataResponse.type, userDataResponse.data);
    }
    catch (err) {
        ErrorHandler.sendErrorResponse(res, err.message);
    }

}

module.exports = User;