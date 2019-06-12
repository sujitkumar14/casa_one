const Express = require('express');
let router = Express.Router();

const RatingController = require('./controller/rating');

const Auth = require('../middleware/auth');



router.post('/', Auth.verifyUser, RatingController.productRating);
router.get('/user/:pid', Auth.verifyUser, RatingController.getUserRatingToProduct);
router.put('/', Auth.verifyUser, RatingController.updateProductRating);
router.get('/:pid', RatingController.getProductRating);

module.exports = router;