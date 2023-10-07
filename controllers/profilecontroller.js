const UserModel = require('../models/UserModel');

const updateMe = async(req, res, next) => {
    const updateUser = await UserModel.findByIdAndUpdate(req.email, req.body, {
        new: true,
        runValidators: true,
    })
  };

module.exports = {
    updateMe
}