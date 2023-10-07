const UserModel = require('../models/UserModel');

const updateMe = async (req, res, next) => {
    const updateUser = new UserModel(req.body);
    console.log(updateUser)
    UserModel.findByIdAndUpdate(req.session.loginsession,req.email).then((result) => {
        res.redirect('/viewProfile')
    }).catch((err) => {
        console.log(err)
    })

};

module.exports = {
    updateMe
}