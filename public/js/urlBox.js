//var React = require('react')
//var request = require('superagent');
var longURL = ''

var UrlBox = React.createClass({
  PropTypes:{
    url: React.PropTypes.string.isRequired
  },
  getInitialState: function(){
    return{
      shortUrl: ''
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
          shortUrl: 'oops, try again' + error.toString()
        })
        console.log(this.state.shortUrl)
      }.bind(this),
      success: function(data){
        console.log(data)
        //new EJS({url: 'index.ejs'}).update('short', {'short': shortURL})
        //console.log(EJS)
        this.setState({
          shortUrl: data.short
        })
        console.log(this.state.shortUrl)
      }.bind(this)
    })
  },
  componentDidMount: function () {
    this.sendUrlToServer()
  },
  render: function(){
    return(
      <div className="UrlBox">
         <InputBox haha = {this.handleSubmit}></InputBox>
         <OutputBox data = {this.state.shortUrl}></OutputBox>
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
    shortUrl: React.PropTypes.string.isRequired
  },
  render: function(){
    return(
      <p>{this.props.shortUrl}</p>
    )
  }
})

React.render(
  <UrlBox url="/shorten" />,
  document.getElementById('container')
);