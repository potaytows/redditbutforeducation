var express = require('express');
var router = express.Router();
var path = require('path');
const subjectController = require('../controllers/subjectcontroller');
const { authChecker } = require('../middleware/AuthChecker');
const {isAdmin} = require('../middleware/isAdmin')

//เรียกใช้ multer หรือ ตัวจัดการfile 
var multer = require('multer');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null,file.fieldname + '-' + Date.now())
  }
});
var upload = multer({ storage: storage });


//ประกาศ route
router.use(authChecker)
router.get('/add',subjectController.addSubjectPage)
router.post('/add',upload.single('image'),subjectController.addSubject)
router.get('/:id',subjectController.getSubject)
router.get('/:id/members',subjectController.getSubjectMembersPage)
router.get('/requesting/:id',subjectController.addJoinRequest)
router.get('/deleterequest/:id',subjectController.deleteRequest)
router.get('/req/approve/:id',subjectController.approveRequest)
router.get('/leaving/:id',authChecker,subjectController.leaveSubject)
router.get('/:id/management',isAdmin,subjectController.managementPage)
router.post('/edit/:id',isAdmin,upload.single('image'),subjectController.EditSubject)
module.exports = router;
