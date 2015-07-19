var express = require('express')
var app = express()

var ejs = require('ejs')
var bodyParser = require('body-parser')
var base62 = require('base62')
var config = require('./config.json')

var hash = {}
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
  console.log(req.body.data)
  count ++;
  //1. lookup
  //if yes,redirect
  //if no,
  // req.url -> short url
  
  //save into the hash table
  //console.log(req.body.data)
  var shortURL = createShortURL()
  hash[shortURL] = req.body.data
  console.dir(hash)
  //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
  res.send({'short': shortURL})
  //redirect
})

app.get('/', function(req, res){
  res.render('index.ejs', {'short': 'haha'})
})

app.get('/:url', function(req, res){

  console.log(req.params.url)

  if(hash.hasOwnProperty(req.params.url)){
    res.redirect(hash[req.params.url])
  }
  // if(req.params.url === 'favicon.ico'){
  //   console.log('jjj')

  //   res.render('index.html')

  // }else{


  // }
  
//   //lookup
  
//   //if yes, redirect
  
//   //if no, error
})


function lookUpHash(key){

}

function createShortURL(id){

  function roundFunction(val){
    return ((131239 * val + 15534) % 714025) / 714025
  }

  function permuteId(id){
    l1 = (id>>16) && 65535
    r1 = id&65535

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

  var url = base62.encode(permuteId(id))
  console.log(url)

  return url
}


function saveInHash(key, value){

}

var port = process.env.PORT || config.port
app.listen(port, function(){
  console.log('listening on ' + port)
})


