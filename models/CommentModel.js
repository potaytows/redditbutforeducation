const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment:{
        type:String
    },
    post_id:{
        type:mongoose.Types.ObjectId, ref: "Post"
    },
    user_id:{
        type:mongoose.Types.ObjectId, ref: "User"
    }
})

module.exports = mongoose.model('Comment', CommentSchema)