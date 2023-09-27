const Users = require('../models/UsersModel');


var user;
const page_index = (req, res,) => {
  res.render('index', { pageTitle: 'Reddeetznuts' });


};
const page_login = (req, res,) => {
  res.render('login', { pageTitle: 'Reddeetznuts : Login' });

};

const page_register = (req, res,) => {
  console.log(user)
  res.render('register', { pageTitle: 'Reddeetznuts : Register' });

};
const logout = (req,res)=>{
  req.session.destroy();
  res.cookie('isLoggedout','true',{maxAge:1000})
  res.redirect('/');
};


module.exports = {
  page_index,
  page_login,
  page_register,
  logout

}