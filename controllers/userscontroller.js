const Users = require('../models/UsersModel');


function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return true;
    }
    return false;
  }
const addnewuser = (req, res, next) => {
    Users.find({}, { 'email': 1, '_id': 0 })
        .then((result) => {
            if (!contains(result,"email",req.body.email)) {
                const newuser = new Users(req.body)
                newuser.save().then((result) => {
                    res.cookie('isRegistered', 'registered', { maxAge: 5000 })
                    res.redirect('/login')

                }).catch((err) => {
                    console.log(err)
                })

            }else{
                res.cookie('isRegistered', 'email_used', { maxAge: 5000 })
                res.redirect('/register')

            }



        }).catch((err) => {
            console.log(err)
        })

}

const validateUser = (req, res, next) => {
    Users.find({ 'email': req.body.email, 'password': req.body.password }, { 'password': 0 }).then((result) => {
        if (result.length == 1) {
            req.session.loginsession = result[0];
            res.cookie('isLoggedin', 'loggedin', { maxAge: 1000 })
            res.redirect('/')

        } else {
            res.cookie('isLoggedin', 'failedtoLogin', { maxAge: 1000 })
            res.redirect('/login')
        }
    })



}


module.exports = {
    addnewuser,
    validateUser

}
