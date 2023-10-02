var express = require('express');
var router = express.Router();
const subjectController = require('../controllers/subjectcontroller')


var user;
router.get('/add',subjectController.addSubject)
module.exports = router;
