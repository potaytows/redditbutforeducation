const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    pfp:{
        data:Buffer,
        contentType:String
    }
},{timestamps:true})


module.exports = mongoose.model('User',UserSchema)

