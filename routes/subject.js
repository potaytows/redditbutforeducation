var express = require('express');
var router = express.Router();
const subjectController = require('../controllers/subjectcontroller');
const { authChecker } = require('../middleware/AuthChecker');


router.use(authChecker)
router.get('/add',subjectController.addSubjectPage)
router.post('/add',subjectController.addSubject)
router.get('/:id',subjectController.getSubject)
router.get('/:id/members',subjectController.getSubjectMembersPage)
router.get('/requesting/:id',subjectController.addJoinRequest)
router.get('/deleterequest/:id',subjectController.deleteRequest)
module.exports = router;
