var React = require('react')
var request = require('superagent')
var isUrl = require('valid-url').is_http_uri
var longURL = ''

var UrlBox = React.createClass({
  PropTypes:{
    postUrl: React.PropTypes.string.isRequired,
    port: React.PropTypes.number.isRequired
  },
  getInitialState: function(){
    return{
      shortUrl: '',
      errorMsg: ''
    }
  },
  handleSubmit: function(data){
      //check url validation in frontend
      if(!isUrl(data)) {
        this.setState({
          errorMsg: 'Unable to shorten that link. It is not a valid url.',
          shortUrl: ''
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
          errorMsg: 'Unable to shorten that link. It is not a valid url.',
          shortUrl: ''
        })
        return
      }
      console.log(res)
      this.setState({
        shortUrl: 'http://localhost:' +this.props.port +'/' + res.body.short,
        errorMsg: ''
      })
    }.bind(this))

  },
  // componentDidMount: function () {
  //   this.sendUrlToServer()
  // },
  render: function(){
    return(
      <div className="UrlBox">
         <InputBox haha = {this.handleSubmit}></InputBox>
         <OutputBox shortUrl = {this.state.shortUrl} errorMsg = {this.state.errorMsg}></OutputBox>
      </div>
    )
  }
})

var InputBox = React.createClass({
  propTypes: {
    haha: React.PropTypes.func.isRequired
  },
  getInitialState: function(){
    return{
      url: ''
    }
  },
  handleChange: function(e){
    this.setState({
      url: e.target.value
    })
  },
  handleClear: function(e){
    e.preventDefault()
    this.setState({
      url: ''
    })
  },
  handleClick: function(e){
    e.preventDefault()
    this.props.haha(this.state.url)
  },
  render: function(){
    return(
      <form>
        <input type="text" onChange={this.handleChange} value={this.state.url}/><br/>
        <button disabled={this.state.url.length === 0} onClick={this.handleClick}>shorten</button>
        <button disabled={this.state.url.length === 0} onClick={this.handleClear}>clear</button>              
      </form>
    )
  }
})

var OutputBox = React.createClass({
  PropTypes: {
    shortUrl: React.PropTypes.string.isRequired,
    errorMsg: React.PropTypes.string.isRequired
  },
  render: function(){
    return(
      <div>
        <p>{this.props.errorMsg}</p>
        <a href={this.props.shortUrl}>{this.props.shortUrl}</a>
      </div>
    )
  }
})

module.exports = UrlBox