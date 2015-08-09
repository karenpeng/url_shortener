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
      errorMsg: '',
      result: ''
    }
  },
  handleSubmit: function(data){
      //check url validation in frontend
      if(!isUrl(data)) {
        this.setState({
          errorMsg: 'Unable to shorten that link. It is not a valid url.',
          shortUrl: '',
          result: 'form-group has-error has-feedback'
        })
        return
      }
      this.sendUrlToServer(data)
  },
  handleTyping: function(){
    this.setState({
      shortUrl: '',
      errorMsg: '',
      result: ''
    })
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
          shortUrl: '',
          result: 'form-group has-error has-feedback'
        })
        return
      }
      this.setState({
        shortUrl: 'http://localhost:' + this.props.port +'/' + res.body.short,
        errorMsg: '',
        result: 'form-group has-success has-feedback'
      })
    }.bind(this))

  },
  // componentDidMount: function () {
  //   this.sendUrlToServer()
  // },
  render: function(){
    return(
      <div className={this.state.result}>
         <InputBox 
           submit = {this.handleSubmit} typing={this.handleTyping}
         ></InputBox>
         <OutputBox shortUrl = {this.state.shortUrl} errorMsg = {this.state.errorMsg}></OutputBox>
      </div>
    )
  }
})

var InputBox = React.createClass({
  propTypes: {
    submit: React.PropTypes.func.isRequired,
    typing: React.PropTypes.func.isRequired
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
    this.props.typing()
  },
  handleClick: function(e){
    e.preventDefault()
    this.props.submit(this.state.url)
  },
  render: function(){
    return(
      <form>
        <input className='form-control' type='text' placeholder='Pasted a link to shorten it'
        onChange={this.handleChange} value={this.state.url} />
        <br/>
        <button type='submit' className={style.button.primary} 
        disabled={this.state.url.length === 0} onClick={this.handleClick}>shorten</button>            
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

var style = {
  button: {
    primary: 'btn btn-primary',
    normal: 'btn btn-default'
  }//,
  // input:{
  //   className: 'form-control',
  //   default
  // }
}

module.exports = UrlBox