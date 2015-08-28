var React = require('react')
var request = require('superagent')
var isUrl = require('valid-url').is_http_uri
var InputBox = require('./InputBox.jsx')
var ZeroClipboard = require('zeroclipboard')

var protectUrl =  'http://' + location.host
var protectRegex = new RegExp(protectUrl, 'g')

var UrlBox = React.createClass({
  PropTypes:{
    postUrl: React.PropTypes.string.isRequired
  },
  getInitialState: function(){
    return{
      shortUrl: '',
      errorMsg: '',
      result: ''
    }
  },
  handleTyping: function(){
    this.setState({
      shortUrl: '',
      errorMsg: '',
      result: ''
    })
  },
  handleSubmit: function(data){
      //check url validation in frontend
      if(!isUrl(data) || data.match(protectRegex) !== null){
        this.setState({
          errorMsg: 'Unable to shorten invalid url. ಠ~ಠ',
          shortUrl: '',
          result: 'form-group has-error has-feedback'
        })
        return
      }
      this.sendUrlToServer(data)
  },
  sendUrlToServer: function(longURL){
      request
    .post(this.props.postUrl)
    .send(JSON.stringify({
          data: longURL
        }))
    .set('Content-Type', 'application/json')
    .end(function(err, res){
      if(err){
        console.log(err)
        this.setState({
          errorMsg: 'Unable to shorten invalid url. ಠ~ಠ',
          shortUrl: '',
          result: 'form-group has-error has-feedback'
        })
        return
      }
      this.setState({
        shortUrl: 'http://' + location.host + '/' + res.body.short,
        errorMsg: '',
        result: 'form-group has-success has-feedback'
      })
    }.bind(this))

  },
  componentDidMount: function () {
    //this.sendUrlToServer()
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
  },
  render: function(){
    return(
      <div className={this.state.result}>
         <InputBox
           submit={this.handleSubmit} typing={this.handleTyping}
           shortUrl={this.state.shortUrl} errorMsg={this.state.errorMsg}>
         </InputBox>
      </div>
    )
  }
})

module.exports = UrlBox