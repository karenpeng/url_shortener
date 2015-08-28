var mongoose = require('mongoose')
var Record = require('./../model/record.js')
var cfg = require('./../config.json')

mongoose.connect(cfg.db)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connected to database')
});

exports.getLongFromSgetLongFromShort = function(shortURL, callback){
  var query = {'short': shortURL}
  var select = 'long'
  var options = {
    limit: 1
  }
  Record.find(query, select, options, callback)
}

exports.getShortFromLong = function(longURL, callback){
  var query = {'long': longURL}
  var select = 'short'
  var options = {
    limit: 1
  }
  Record.find(query, select, options, callback)
}

exports.countCollection = function(callback){
  Record.count({}, callback)
}

exports.addRecord = function(shortURL, longURL){
  var record = new Record()
  record.short = shortURL
  record.long = longURL
  record.save()
}
