var React = require('react')

var InputBox = React.createClass({
  propTypes: {
    submit: React.PropTypes.func.isRequired,
    typing: React.PropTypes.func.isRequired,
    shortUrl: React.PropTypes.string.isRequired,
    errorMsg: React.PropTypes.string.isRequired
  },
  getInitialState: function(){
    return{
      url: '',
      copied: false
    }
  },
  handleChange: function(e){
    this.setState({
      url: e.target.value,
      //state is exactly a state machine, you have to reset it, otherwise it won't update
      //for line 155
      copied: false
    })
    this.props.typing()
  },
  handleSubmit: function(e){
    e.preventDefault()
    this.props.submit(this.state.url)
  },
  handleClear: function(e){
    e.preventDefault()
    this.setState({
      url: ''
    })
    this.props.typing()
  },
  handleCopy: function(e){
    e.preventDefault()
    this.setState({
      copied: true
    })
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
          <div className={this.props.errorMsg.length > 0 ? 'alert alert-danger' : (
              this.state.copied ? 'alert alert-success' : ''
            )
        }>
          {this.props.errorMsg.length > 0 ? this.props.errorMsg : (
              this.state.copied ? 'copy successfully.' : ''
            )
          }
          </div>
        </div>

      </div>
    )
  }

})

module.exports = InputBox