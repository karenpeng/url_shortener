var mongoose = require('mongoose')
var Record = require('./record.js')
var cfg = require('./../config.json')

mongoose.connect(cfg.db)
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log('connected to database');
});

function addRecord(shortURL, longURL){
  var record = new Record()
  record.short = shortURL
  record.long = longURL
  record.save()
}

module.exports = {
  addRecord: addRecord,
  db: db
}