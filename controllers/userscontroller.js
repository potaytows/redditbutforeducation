const UserModel = require('../models/UserModel');


function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return true;
    }
    return false;
  }
const addnewuser = (req, res, next) => {
    UserModel.find({}, { 'email': 1, '_id': 0 })    
        .then((result) => {
            if (!contains(result,"email",req.body.email)) {
                const newuser = new UserModel(req.body)
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
    UserModel.findOne({ 'email': req.body.email, 'password': req.body.password }, { 'password': 0 }).then((result) => {
        if (result) {
            req.session.loginsession = result;
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
