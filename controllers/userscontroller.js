const Users = require('../models/UsersModel');


const addnewuser = (req, res, next)=> {
    const newuser = new Users(req.body)
    newuser.save().then((result)=>{
        res.cookie('isRegistered','registered',{maxAge:5000})
        res.redirect('/login')

    }).catch((err)=>{
       console.log(err)
    })
}

const validateUser = (req, res, next )=>{
    Users.find({'email':req.body.email,'password':req.body.password},{'password':0}).then((result)=>{
        if(result.length==1){
            req.session.loginsession = result[0];
            res.cookie('isLoggedin','loggedin',{maxAge:1000})
            res.redirect('/')

        }else{
            res.cookie('isLoggedin','failedtoLogin',{maxAge:1000})
            res.redirect('/login')
        }
    })



}


module.exports = {
    addnewuser,
    validateUser
  
  }
