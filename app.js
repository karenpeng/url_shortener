var express = require('express')
var app = express()

var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var ejs = require('ejs')

var routes = require('./routes/index')
var config = require('./config.json')

app.set('env', 'development');

app.set('views', __dirname + '/views')
//app.set('view engine', 'jsx')
//app.set('view engine', 'jsx')
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
//app.engine('jsx', require('express-react-views').createEngine());

//require('node-jsx').install();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.use('/', routes)

// var protectURL = [
  
// ]
app.set('env', 'development')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    console.log(err)
    res.render('error', {
      title: 'short.ly',
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    title: 'short.ly',
    message: err.message,
    error: {}
  })
})

var port = process.env.PORT || config.port
app.listen(port, function(){
  console.log('listening on ' + port)
})

module.exports = app
