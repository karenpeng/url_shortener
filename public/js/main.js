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
    }
  })
})