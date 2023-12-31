var express = require('express');
var router = express.Router();
const MainController = require('../controllers/maincontroller')
const { authChecker } = require('../middleware/AuthChecker');
const { searchSubjects } = require('../controllers/searchcontroller');

router.get('/search', searchSubjects)
router.get('/',MainController.page_index)
router.get('/login',MainController.page_login)
router.get('/register',MainController.page_register)
router.get('/logout',MainController.logout)
router.get('/AddSubject', authChecker,MainController.addSubjectPage)
router.get('/AddSubject',authChecker,MainController.addSubjectPage)
router.get('/ViewProfile',authChecker,MainController.page_profile)
router.get('/EditProfile',authChecker,MainController.page_editprofile)
router.get('/NewPost/:id',authChecker,authChecker,MainController.newPostPage)
router.get('/post/:id',authChecker, authChecker,MainController.ViewPost)
router.post('/AddPost/:id',authChecker,MainController.AddPost)
router.post('/comment/:id',authChecker,MainController.NewComment)
router.get('/aboutus',MainController.aboutus)
router.get('/post/delete/:id/:sid',authChecker,MainController.DeletePost)


module.exports = router;
