const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post_name:{
        type:String, ref: "Post Name"
    },
    post_text:{
        type:String, ref: "text aaaaaaaaaaaa"
    },
    subject_id:{
        type:mongoose.Types.ObjectId, ref: "Subject"
    },
    user_id:{
        type:mongoose.Types.ObjectId, ref: "User"
    }
})

module.exports = mongoose.model('Post',PostSchema)