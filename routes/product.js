const Express = require('express');
let router = Express.Router();

const ProductController = require('./controller/product');

const Auth = require('../middleware/auth');



router.post('/new', Auth.verifyAdmin, ProductController.addNewProduct);
router.get('/:pid', ProductController.getProduct);

router.get('/',ProductController.getAllProduct);



module.exports = router;