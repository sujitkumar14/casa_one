const Express = require('express');
let router = Express.Router();

const UserController = require('./controller/user');

const Auth = require('../middleware/auth');



router.post('/register', UserController.Register);
router.post('/login', UserController.login);
router.get('/',Auth.verifyUser, UserController.getUser);



module.exports = router;