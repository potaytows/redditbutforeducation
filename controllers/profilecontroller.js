const UserModel = require('../models/UserModel');

const updateMe = async (req, res, next) => {
    const updateUser = req.body;
    await UserModel.findByIdAndUpdate({_id:req.session.loginsession._id},{$set:{fname:updateUser.fname,lname:updateUser.lname,gender:updateUser.gender,password:updateUser.password}}).then((result) => {
        req.session.loginsession = result;
        res.redirect('/viewProfile')
    }).catch((err) => {
        console.log(err)
    })
};


module.exports = {
    updateMe
}