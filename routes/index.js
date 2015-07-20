var express = require('express')
var router = express.Router()

var isUrl = require('valid-url').is_http_uri
var createShortURL = require('./utils/index.js')


var longHash = {}
var shortHash = {}
var count = 0


router.get('/', function(req, res){
  res.render('index', {
    title: 'short.ly',
    short: 'haha'
  })
})

router.post('/shorten', function(req, res){
  if(isUrl(req.body.data)){
    //console.log(req.body.data)
    var url = req.body.data
    //1. lookup
    //if yes,redirect
    if(longHash.hasOwnProperty(url)){

      res.send({'short': longHash[url]})

    }else{
      //if no,
      // req.url -> short url
      //save into the hash table
      var shortURL = createShortURL(++count)

      //put them into two hashtables
      shortHash[shortURL] = url

      longHash[url] = shortURL
      //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
      res.send({'short': shortURL})
    }
  }else{
    res.status(500).send('Invaild url')
  }

})

router.get('/:url', function(req, res){

  var shortURL = req.params.url

  //lookup
  
  //if yes, redirect

  if(shortHash.hasOwnProperty(shortURL)){

    res.redirect(shortHash[shortURL])

  //if no, error
  }else{

    res.status(404).send('url not found')

  }

})

module.exports = router