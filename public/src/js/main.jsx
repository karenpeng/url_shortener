var React = require('react')
var UrlBox = require('./urlBox.jsx')

var container = document.getElementById('container')
//@TODO: figure out how to parse string
React.render(<UrlBox postUrl={'/shorten'} port={window.port} />, container)