//var $ = require('jquery-browserify')
$('#submit').click(function(){
  console.log($('#longURL').val())
  $.ajax({
    url: '/shorten',
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      data: $('#longURL').val()
    }),
    error: function(err){
      console.dir(err)
    },
    success: function(data){
    console.log(data)
    //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
    //console.log(EJS)
    $("#shortURL").html('http://localhost:3000/' + data.short)
    }
  })
})