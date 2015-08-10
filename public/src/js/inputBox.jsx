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
      //for line 81
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
    var value = this.props.shortUrl || this.state.url
    
    var disable = !value
    
    var btnClass = 'btn btn-primary'
    var onclick = this.handleSubmit
    var btnDisplay = 'shorten'
    
    if (this.props.shortUrl) {
      btnClass = 'btn btn-success'
      onclick = this.handleCopy;
      btnDisplay = 'copy';
    }
    if (this.props.errorMsg) {
      btnClass = 'btn btn-default'
      onclick = this.handleClear
      btnDisplay = 'clear'
    }

    var outputClass = ''
    if (this.props.errorMsg.length) {
      outputClass = 'alert alert-danger'
    }
    if (this.state.copied) {
      outputClass = 'alert alert-success'
    }
    
    var outputDisplay = this.props.errorMsg || 
        (this.state.copied ? 'copied successfully.' : '')

    return(
      <div>

        <form className='input-group'>

          <input id='thininput' className='form-control' type='text' placeholder='Paste a link to shorten it'
            onChange={this.handleChange} 
            value={this.props.shortUrl.length > 0 ? this.props.shortUrl : this.state.url} />

          <span className='input-group-btn'>
            <button id="fatbutton"
              disabled={disable}
              className={btnClass}  
              onClick={onclick}>
              {btnDisplay}
            </button>
          </span>

        </form>

        <div className='outputBox'>
          <div className={outputClass}>
          {outputDisplay}
          </div>
        </div>

      </div>
    )
  }
})

module.exports = InputBox