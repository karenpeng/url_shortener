var React = require('react')

var urlBox = React.createClass({
  onSubmit: function(data){
    //should do ajax here
    console.log(data)
  },
  render: function(){
    return(
      <div className="urlBox">
         <InputBox haha={this.onSubmit}></InputBox>
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
    e.preventDefault()
    this.setState({
      url: e.target.value
    })
    console.log(this.state.url.length)
  },
  handleClick: function(){
    this.props.haha(this.state.url)
  },
  render: function(){
    return(
      <form>
        <input type="text" onChange={this.handleChange}/><br/>
        <button disabled={this.state.url.length > 0} onClick={this.handleClick}>shorten</button>                   
      </form>
    )
  }
})

module.exports = urlBox