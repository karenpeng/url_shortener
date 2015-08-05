var mongoose = require('mongoose')
var Record = require('./record.js')
var cfg = require('./../config.json')

mongoose.connect(cfg.db)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connected to database');
});

//@TODO
function getLongFromShort(shortURL, res, next){
  var query = {'short': shortURL}
  var select = 'long'
  var options = {
    limit: 1
  }
  Record.find(query, select, options, function(err, data){
    if(err){
      return next(err)
    }
    //console.log(data.long)
    //return data.long
    //res.send(data)
  })
}

function getShortFromLong(longURL, res, next){
  var query = {'long': longURL}
  var select = 'short'
  var options = {
    limit: 1
  }
  Record.find(query, select, options, function(err, data){
    if(err){
      return next(err)
    }
    // console.log(data.short)
    // return data.short
    //res.send(data)
    //console.log(data[0].short)
    return data[0].short
  })
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
  addRecord: addRecord
}