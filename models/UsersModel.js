const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        // 0 = normal User
        // 1 = admin
        type:Number,
        default:0
    }
},{timestamps:true})


module.exports = mongoose.model('User',UserSchema)

