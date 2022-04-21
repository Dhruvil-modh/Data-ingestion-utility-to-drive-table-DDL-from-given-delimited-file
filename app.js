require("dotenv").config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// back-end imports
const db = require("./config/db");
const cloudinary = require('cloudinary');
const fileUpload = require("express-fileupload");


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}))

// import all routes
var userRouter = require('./routes/userRoute');
var workRouter = require('./routes/workRoute');
const passport = require("passport");


// route middleware
app.use('/', userRouter);
app.use('/', workRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// db Connection 
// db.authenticate()
//   .then(() => console.log('Database Connected.'))
//   .catch(error => console.log('Unable to connect to the database:', error))
// db.sync();
db();

// cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
// const spawn = require('child_process').spawn;
// const process = spawn('python',['./ddl_final.py','./hello.csv','pytraining','pytraining']);
// console.log("hhfhf");
// //console.log(process.stdout.on('data'));
// process.stdout.on('data', data => {
//    console.log(data.toString());
// });

module.exports = app;