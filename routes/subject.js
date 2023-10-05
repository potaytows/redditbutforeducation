var express = require('express');
var router = express.Router();
const subjectController = require('../controllers/subjectcontroller')


var user;
router.get('/add',subjectController.addSubjectPage)
router.post('/add',subjectController.addSubject)
router.get('/:id',subjectController.getSubject)
module.exports = router;
