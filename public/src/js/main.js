/** @jsx React.DOM */

var React = require('react');
// Here we put our React instance to the global scope. Make sure you do not put it 
// into production and make sure that you close and open your console if the 
// DEV-TOOLS does not display
window.React = React; 

var UrlBox = require('./urlBox.jsx');
React.render(
  // <UrlBox url={this.props.url} port={this.props.port} />,
  // @TODO: can i set below props from server?
  <UrlBox url='/shorten' port='1235' />,
  document.getElementById('container'))