var express = require('express');
var router = express.Router();
const MainController = require('../controllers/maincontroller')


var user;
router.get('/',MainController.page_index)
router.get('/login',MainController.page_login)
router.get('/register',MainController.page_register)
router.get('/logout',MainController.logout)
module.exports = router;
