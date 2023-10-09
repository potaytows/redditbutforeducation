var express = require('express');
var router = express.Router();
const ProfileController = require('../controllers/profilecontroller')

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

router.post('/updateProfile',upload.single('image'), ProfileController.updateMe)
module.exports = router;