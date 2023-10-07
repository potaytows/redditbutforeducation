var express = require('express');
var router = express.Router();
const ProfileController = require('../controllers/profilecontroller')

router.post('/updateProfile', ProfileController.updateMe)
module.exports = router;