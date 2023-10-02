const mongoose = require('mongoose');


const SubjectSchema = new mongoose.Schema({
    subjectName:{
        type:String,
    },
    subjectManager:{
        type:mongoose.Types.ObjectId, ref: "User" 
    },
    Description:{type:String,default:"Looks like your teacher is too lazy to put any description..."}
    

},{timestamps:true})


module.exports = mongoose.model('Subject',SubjectSchema)

