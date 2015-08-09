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
          errorMsg: 'Unable to shorten invalid url. ಠ~ಠ',
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
          errorMsg: 'Unable to shorten invalid url. ಠ~ಠ',
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
           shortUrl = {this.state.shortUrl} errorMsg = {this.state.errorMsg}>
         </InputBox>
      </div>
    )
  }
})

var InputBox = React.createClass({
  propTypes: {
    submit: React.PropTypes.func.isRequired,
    typing: React.PropTypes.func.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    errorMsg: React.PropTypes.string.isRequired
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
  handleSubmit: function(e){
    e.preventDefault()
    this.props.submit(this.state.url)
  },
  handleClear: function(){
    this.setState({
      url: ''
    })
    this.props.typing()
  },
  handleCopy: function(){

  },
  render: function(){
    return(
      <div>

        <form className='input-group'>

          <input className='form-control' type='text' placeholder='Pasted a link to shorten it'
            onChange={this.handleChange} 
            value={this.props.shortUrl.length > 0 ? this.props.shortUrl : this.state.url} />

          <span className='input-group-btn'>
            <button 
              disabled={this.state.url.length === 0}
              className={
                this.props.shortUrl.length > 0 ? 'btn btn-success' : (
                    this.props.errorMsg.length > 0 ? 'btn btn-default' : 'btn btn-primary'
                  )
              }  
              onClick={
                this.props.shortUrl.length > 0 ? this.handleCopy : (
                    this.props.errorMsg.length > 0 ? this.handleClear : this.handleSubmit
                  )
              }>
              {
               this.props.shortUrl.length > 0 ? 'copy' : (
                  this.props.errorMsg.length > 0 ? 'clear' : 'shorten'
                )
              }
            </button>
          </span>
                   
        </form>

        <div className='outputBox'>
          <div className={this.props.errorMsg.length > 0 ? 'alert alert-danger' : ''}>
            {this.props.errorMsg}
          </div>
        </div>

      </div>
    )
  }

})

module.exports = UrlBox