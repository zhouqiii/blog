var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter= require('./routes/users');

var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
// Use session to save data
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret:settings.cookieSecret,
  key:settings.db,
  cookie:{maxAge: 1000*60},
  store: new MongoStore({

    // db:settings.db,
    // host:settings.host,
    // port:settings.port
  url: 'mongodb://localhost/blog'
  })
}));
//console.log("hi");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/login')
//routers(app); cant work

//app.listen(app.get('port'),function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});
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
