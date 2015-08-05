var mongoose = require('mongoose')

var Record = new mongoose.Schema({
  long:{
    type: String
  },
  short:{
    type: String
  }
})

module.exports = mongoose.model('Record', Record)