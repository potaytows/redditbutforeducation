var express = require('express');
var router = express.Router();
const usersRouter = require('./Users')
const Users = require('../models/UsersModel');


var user;
router.get('/', function(req, res, next) {
  
  Users.find().then((result)=>{
   user=result
  }).catch((err)=>{
    console.log(err)
  })
  console.log(user)
  res.render('index', { pageTitle: 'Reddeetznuts',user:user });
  
});

module.exports = router;
