const mongoose = require('mongoose');


const joinRequestSchema = new mongoose.Schema({
    subject_id:{
        type:mongoose.Types.ObjectId, ref: "Subject" 
    },
    user_id:{
        type:mongoose.Types.ObjectId, ref: "User" 
    },
    status:{
        type:String,
        default:0
        // 0 = pending 
        // 1 = approved
    }
    
    

},{timestamps:true})


module.exports = mongoose.model('JoinRequest',joinRequestSchema)

