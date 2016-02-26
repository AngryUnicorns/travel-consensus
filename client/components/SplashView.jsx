var React = require('react');
var ReactDOM = require('react-dom');

var SplashView = React.createClass({
  render: function() {
    return (
      <img className="splash" src="http://s3.amazonaws.com/usersthink/02-large.jpg"/>
      )
  }
});

module.exports = SplashView;