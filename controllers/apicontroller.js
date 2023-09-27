const Users = require('../models/UsersModel');



const usedEmail = (req, res,) => {
  Users.find({},{'email':1,'_id':0})
  .then((result)=>{
    res.send(result);
    
}).catch((err)=>{
  console.log(err)
})
};


module.exports = {
  usedEmail

}