const mongoose = require('mongoose');


const SubjectSchema = new mongoose.Schema({
    subjectName:{
        type:String,
    },
    Description:{type:String,default:"Looks like your teacher is too lazy to put any description..."},
    subjectIcon:{
        data:Buffer,
        contentType:String
    }

    

},{timestamps:true})


module.exports = mongoose.model('Subject',SubjectSchema)

