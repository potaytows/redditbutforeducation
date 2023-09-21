var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/UsersModel');

/* GET home page. */

router.get('/login', function(req, res, next) {
    Users.find((err,result)=>{
        if(err)return next(err);
        
    })
})

module.exports = router;