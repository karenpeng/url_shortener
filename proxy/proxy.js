var mongoose = require('mongoose')
var Record = require('./../model/record.js')
var cfg = require('./../config.json')

mongoose.connect(cfg.db)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connected to database');
});

function getLongFromShort(shortURL, callback){
  var query = {'short': shortURL}
  var select = 'long'
  var options = {
    limit: 1
  }
  Record.find(query, select, options, callback)
}

function getShortFromLong(longURL, callback){
  var query = {'long': longURL}
  var select = 'short'
  var options = {
    limit: 1
  }
  Record.find(query, select, options, callback)
}

function countCollection(callback){
  Record.count({}, callback)
}

function addRecord(shortURL, longURL){
  var record = new Record()
  record.short = shortURL
  record.long = longURL
  record.save()
}

module.exports = {
  getLongFromShort: getLongFromShort,
  getShortFromLong: getShortFromLong,
  countCollection: countCollection,
  addRecord: addRecord
}