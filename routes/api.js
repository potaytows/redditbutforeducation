var express = require('express');
var router = express.Router();
const ApiController = require('../controllers/apicontroller')


router.get('/usedEmail',ApiController.usedEmail)
module.exports = router;
