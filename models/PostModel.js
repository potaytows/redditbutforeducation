const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post_id:{
        type:mongoose.Types.ObjectId, ref: "Post ID"
    },
    post_name:{
        type:String, ref: "Post Name"
    },
    post_script:{
        type:String, ref: "text aaaaaaaaaaaa"
    },
    subject_id:{
        type:mongoose.Types.ObjectId, ref: "Subject"
    },
    user_id:{
        type:mongoose.Types.ObjectId, ref: "Post Creator"
    }
})

module.exports = mongoose.model('Post',PostSchema)