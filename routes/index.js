var express = require('express')
var router = express.Router()

var isUrl = require('valid-url').is_http_uri
var createShortURL = require('./../utils/index')

var Record = require('./../db/record.js')
var Query = require('./../db/query.js')

// var longHash = {}
// var shortHash = {}
var count = 0

router.get('/', function(req, res){
  
  res.render('index', {
    title: 'shortly'//,
    // ur: '/shorten',
    // port: cfg.port
  })
})

router.post('/shorten', function(req, res, next){
  if(isUrl(req.body.data)){
    //console.log(req.body.data)
    var url = req.body.data
    
    var query = {'long': url}
    var select = 'short'
    var options = {
      limit: 1
    }

    Record.find(query, select, options, function(err, data){
      if(err){
        return next(err)
      }

      if(data.length > 0){

        res.send({short: data[0].short})
      
      }else{
        //@TODO: how could i count from db???
        var shortURL = createShortURL(++count)
        Query.addRecord(shortURL, url)
        res.send({short: shortURL})
      }

    })
  
  }else{
    res.status(500).send({})
  }

})

router.get('/:url', function(req, res, next){

  var shortURL = req.params.url
  //lookup
  
  //if yes, redirect
  //console.log(longURL)
  //if(shortHash.hasOwnProperty(shortURL)){
  //if(longURL !== undefined){

  var query = {'short': shortURL}
  var select = 'long'
  var options = {
    limit: 1
  }
  Record.find(query, select, options, function(err, data){
    if(err){
      return next(err)
    }
    
    //res.send(data)
    if(data.length > 0){

      res.redirect(data[0].long)

    }else{

      var err = new Error('url not found')
      err.status = 404
      next(err)

    }
  })

})

module.exports = router