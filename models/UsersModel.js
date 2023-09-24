const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
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
},{timeseries:true})


module.exports = mongoose.model('User',UsersSchema)

