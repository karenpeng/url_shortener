var express = require('express')
var app = express()

var ejs = require('ejs')
var bodyParser = require('body-parser')
var base62 = require('base62')
var config = require('./config.json')
var isUrl = require('valid-url').is_http_uri

var longHash = {}
var shortHash = {}
var count = 0;

/*
{
  'shortURL' : 'longURL'
}
 */

app.set('views', __dirname + '/views')
app.engine('.html', ejs.__express)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data


var protectURL = [
  
]

app.post('/shorten', function(req, res){
  if(isUrl(req.body.data)){
    console.log(req.body.data)
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
      shortHash[shortURL] = url
      longHash[url] = shortURL
      //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
      res.send({'short': shortURL})
    }
  }else{
    res.status(500).send('Invaild url')
  }

})

app.get('/', function(req, res){
  res.render('index.ejs', {'short': 'haha'})
})

app.get('/:url', function(req, res){

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

function createShortURL(id){

  function roundFunction(val){
    return ((131239 * val + 15534) % 714025) / 714025
  }

  function permuteId(id){
    l1 = (id >> 16) && 65535
    r1 = id & 65535

    for(var i = 0; i < 2; i++){
      l2 = r1;
      r2 = l1^Math.floor((roundFunction(r1)*65535))
      l2 = l2
      r1 = r2
      console.log('r1 ', r1)
      console.log('l1 ', l1)
      return((r1 << 16) + l2)
    }
  }

  var weirdId = Math.abs(permuteId(id))
  console.log('weird id ', weirdId)
  var url = base62.encode(weirdId)
  console.log('lalala short url ', url)

  return url
}

var port = process.env.PORT || config.port
app.listen(port, function(){
  console.log('listening on ' + port)
})

module.exports = app
