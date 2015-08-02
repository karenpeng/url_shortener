//var React = require('react')
//var request = require('superagent');
var longURL = ''

var UrlBox = React.createClass({
  PropTypes:{
    url: React.PropTypes.string.isRequired,
    port: React.PropTypes.number.isRequired
  },
  getInitialState: function(){
    return{
      shortUrl: '',
      errorMsg: ''
    }
  },
  handleSubmit: function(data){
      longURL = data
      this.sendUrlToServer()
  },
  sendUrlToServer: function(){
  //should do ajax here
  //   request
  // .post('/api/pet')
  // .send({ name: 'Manny', species: 'cat' })
  // .set('X-API-Key', 'foobar')
  // .set('Accept', 'application/json')
  // .end(function(err, res){
  // });
    $.ajax({
      url: this.props.url,
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        data: longURL
      }),
      dataType: 'json',
      error: function(error){
        console.dir(error)
        this.setState({
          errorMsg: error,
          shortUrl: ''
        })
      }.bind(this),
      success: function(data){
        console.log(data)
        this.setState({
          shortUrl: 'http://localhost:' +this.props.port +'/' + data.short,
          errorMsg: ''
        })
      }.bind(this)
    })
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
  handleClick: function(e){
    e.preventDefault()
    this.props.haha(this.state.url)
  },
  render: function(){
    return(
      <form>
        <input type="text" onChange={this.handleChange}/><br/>
        <button disabled={this.state.url.length === 0} onClick={this.handleClick}>shorten</button>                   
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

React.render(
  // <UrlBox url={this.props.url} port={this.props.port} />,
  // @TODO: can i set below props from server?
  <UrlBox url='/shorten' port='1235' />,
  document.getElementById('container')
);