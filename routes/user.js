var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const usercontroller = require('../controllers/userscontroller')

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

router.post('/register', upload.single('image'), usercontroller.addnewuser)
router.post('/uservalidator', usercontroller.validateUser)
module.exports = router;