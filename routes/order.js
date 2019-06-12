const Express = require('express');
let router = Express.Router();

const OrderController = require('./controller/order');

const Auth = require('../middleware/auth');



router.post('/new', Auth.verifyUser, OrderController.placeOrder);
router.get('/:id', Auth.verifyUser, OrderController.getOrder);



module.exports = router;