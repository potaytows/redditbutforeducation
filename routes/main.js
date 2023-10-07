var express = require('express');
var router = express.Router();
const MainController = require('../controllers/maincontroller')
const { authChecker } = require('../middleware/AuthChecker');

router.get('/',MainController.page_index)
router.get('/login',MainController.page_login)
router.get('/register',MainController.page_register)
router.get('/logout',MainController.logout)
router.get('/AddSubject', authChecker,MainController.addSubjectPage)
router.get('/AddSubject',MainController.addSubjectPage)
router.get('/ViewProfile',authChecker,MainController.page_profile)
router.get('/EditProfile',authChecker,MainController.page_editprofile)
module.exports = router;
