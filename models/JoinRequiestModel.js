const mongoose = require('mongoose');


const subjectMemberSchema = new mongoose.Schema({
    subject_id:{
        type:mongoose.Types.ObjectId, ref: "Subject" 
    },
    user_id:{
        type:mongoose.Types.ObjectId, ref: "User" 
    },
    
    

},{timestamps:true})


module.exports = mongoose.model('SubjectMember',subjectMemberSchema)

