const mongoose = require('mongoose');


const SubjectSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true})


module.exports = mongoose.model('Subject',SubjectSchema)

