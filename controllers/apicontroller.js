const UserModel = require('../models/UserModel');



const usedEmail = (req, res,) => {
  UserModel.find({},{'email':1,'_id':0})
  .then((result)=>{
    console.log(result)
    res.send(result);
    
}).catch((err)=>{
  console.log(err)
})
};


module.exports = {
  usedEmail

}