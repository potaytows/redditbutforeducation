const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post_title:{
        type:String
    },
    content:{
        type:String, 
    },
    subject_id:{
        type:mongoose.Types.ObjectId, ref: "Subject"
    },
    user_id:{
        type:mongoose.Types.ObjectId, ref: "User"
    }
})

module.exports = mongoose.model('Post',PostSchema)