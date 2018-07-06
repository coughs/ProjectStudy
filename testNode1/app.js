/**
 * var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



 * Created by prolink on 17/3/19.
 */

//import http from "http";
//processingInstances
var http = require('http');

var server =  http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Hello World');

    //bottom circle:
    ellipse(200, 300, 150, 150);
// middle circle:
    ellipse(200, 225, 100, 100);
// top circle:
    ellipse(200, 175, 63, 63);

    //get the canvas that Processing-js will use
    var canvas = document.getElementById("mycanvas");
    //pass the function sketchProc (defined in myCode.js) to Processing's constructor.
    var processingInstance = new Processing(canvas, sketchProc);

});

var sketchProc=function(processingInstance){ with (processingInstance){
    size(400, 400);
    frameRate(30);


//ProgramCodeGoesHere
//bottom circle:
    ellipse(200, 300, 150, 150);
// middle circle:
    ellipse(200, 225, 100, 100);
// top circle:
    ellipse(200, 175, 63, 63);



}};

server.listen(8088);