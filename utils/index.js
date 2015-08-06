var base62 = require('base62')

function createShortURL(id){

  var weirdId = Math.abs(permuteId(id))
  console.log('weird id ', weirdId)
  var url = base62.encode(weirdId)
  console.log('lalala short url ', url)

  return url
}

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

module.exports = createShortURL