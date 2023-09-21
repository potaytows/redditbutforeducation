const mongoose = require('mongoose');


const UsersSchema = new mongoose.Schema({
    username:{type:String,required:true},
    password:String,
},{timeseries:true})


module.exports = mongoose.model('User',UsersSchema)

