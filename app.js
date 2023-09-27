var createError = require('http-errors');
var express = require('express');
var path = require('path');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var indexRouter = require('./routes/main');
var userRouter = require('./routes/user');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!",resave: true,saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bscss', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


// ------------Define local variables------------
app.use(function(req, res, next) {
  res.locals.sessions = req.session
  res.locals.cookies = req.cookies
  next();
});

app.use('/', indexRouter);
app.use('/user',userRouter);

const uri = "mongodb://localhost:27017/project";

mongoose.connect(uri)
    .then((result)=> app.listen(3000, () => {
        console.log('Api is running on port 3000 http://localhost:3000/');
    }))
    .catch((err) => console.log(err))
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
