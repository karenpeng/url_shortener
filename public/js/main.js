$('#submit').click(function(){
  console.log($('#longURL').val())
  $.ajax({
    url: '/shorten',
    method: 'POST',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      data: $('#longURL').val()
    }),
    dataType: 'json',
    error: function(error){
      console.dir(data)
    },
    success: function(data){
      console.log(data)
      //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
      //console.log(EJS)
      if(data.success){
        $("#shortURL").html('http://localhost:3000/' + data.short)
      }else{
        $("#shortURL").html(data.short)
      }
    }
  })
})