const express = require('express');
const mongoose = require('mongoose');
const app = express();
const usersRouter = require('./apis/routes/Users')
const uri = "mongodb+srv://takachiy:FkGs77eVDT4ezosv@cluster0.xoovbhu.mongodb.net/reddeetznuts?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then((result)=> app.listen(6969, () => {
        console.log('Api is running on port 6969');
    }))
    .catch((err) => console.log(err))



app.use('/users', usersRouter);




