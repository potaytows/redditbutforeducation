const mongoose = require('mongoose');


const subjectMemberSchema = new mongoose.Schema({
    subject_id:{
        type:String,
    },
    uid:{
        type:mongoose.Types.ObjectId, ref: "User" 
    },
    

},{timestamps:true})


module.exports = mongoose.model('SubjectMember',subjectMemberSchema)

