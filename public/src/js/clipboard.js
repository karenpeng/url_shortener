var ZeroClipboard = require('zeroclipboard')

setTimeout(function(){

  var bt = document.getElementById('fatbutton')

  bt.setAttribute("data-clipboard-text", 'Default clipboard text from attribute')
  bt.setAttribute('data-clipboard-target', 'thininput')

  var client = new ZeroClipboard( document.getElementById("fatbutton") )
  console.log(client)
  client.on( "ready", function( readyEvent ) {
    console.log( "ZeroClipboard SWF is ready!" )
    client.on( "aftercopy", function( event ) {
      // `this` === `client`
      // `event.target` === the element that was clicked
      console.log("Copied text to clipboard: " + event.data["text/plain"] )
    })
  })

}, 4000)