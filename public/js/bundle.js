(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/karen/Documents/my_project/short_url/public/js/main.js":[function(require,module,exports){
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
      console.dir(error)
      $("#shortURL").html('Invalid url, please try again.')
    },
    success: function(data){
      console.log(data)
      //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
      //console.log(EJS)
      $("#shortURL").html('http://localhost:3000/' + data.short)
    }
  })
})
},{}]},{},["/Users/karen/Documents/my_project/short_url/public/js/main.js"]);
