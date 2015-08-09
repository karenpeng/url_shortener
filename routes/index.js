var express = require('express')
var router = express.Router()

var isUrl = require('valid-url').is_http_uri
var createShortURL = require('./../utils/index')

var proxy = require('./../proxy/proxy.js')

router.get('/', function(req, res){
  
  res.render('index', {
    title: 'shortly'//,
    // ur: '/shorten',
    // port: cfg.port
  })
})

router.post('/shorten', function(req, res, next){

  //check url validation in backend
  if(!isUrl(req.body.data)) {
    return res.status(500).send({})
  }

  var longUrl = req.body.data

  proxy.getShortFromLong(longUrl, function(err, data){
    if(err){
      return next(err)
    }

    if(data.length > 0){
      return res.send({short: data[0].short})   
    }

    proxy.countCollection(function(err, count){
      var shortURL = createShortURL(count)
      proxy.addRecord(shortURL, longUrl)
      res.send({short: shortURL})
    })

  })

})

router.get('/:url', function(req, res, next){

  var shortURL = req.params.url

  proxy.getLongFromShort(shortURL, function(err, data){
    if(err){
      return next(err)
    }
    
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