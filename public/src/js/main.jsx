var React = require('react')
var UrlBox = require('./urlBox.jsx')
var container = document.getElementById('container')

React.render(<UrlBox postUrl={postUrl}/>, container)