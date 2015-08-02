var express = require('express')
var router = express.Router()
var path = require('path')

var isUrl = require('valid-url').is_http_uri
var createShortURL = require('./../utils/index')
var flatfile = require('flatfile')

var cfg      = require('./../config.json')
// var dbPath   = path.join(__dirname, '..', cfg.db)


var longHash = {}
var shortHash = {}
var count = 0


router.get('/', function(req, res){
  console.log('say something...')
  //res.render('index', {
    // title: 'short.ly',
    // short: 'haha'
  //})
  res.render('index', {
    ur: '/shorten',
    port: cfg.port
  })
})

router.post('/shorten', function(req, res, next){
  if(isUrl(req.body.data)){
    //console.log(req.body.data)
    var url = req.body.data
    //1. lookup
    //if yes,redirect
    if(longHash.hasOwnProperty(url)){

      res.send({short: longHash[url]})

    }else{
      //if no,
      // req.url -> short url
      //save into the hash table
      var shortURL = createShortURL(++count)

      //put them into two hashtables
      shortHash[shortURL] = url

      longHash[url] = shortURL

      //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
      res.send({
        short: shortURL
      })
    }
  }else{
    res.status(500).send({})
  }

})

router.get('/:url', function(req, res, next){

  var shortURL = req.params.url
  //lookup
  
  //if yes, redirect

  if(shortHash.hasOwnProperty(shortURL)){
    res.redirect(shortHash[shortURL])

  //if no, error
  }else{

    //res.status(404).send('url not found')
    var err = new Error('url not found')
    err.status = 404
    next(err)

  }

})

module.exports = router
