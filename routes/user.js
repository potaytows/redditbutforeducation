var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const usercontroller = require('../controllers/userscontroller')

router.post('/register', usercontroller.addnewuser)
router.post('/uservalidator',usercontroller.validateUser)
module.exports = router;