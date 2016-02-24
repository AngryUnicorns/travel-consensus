var React = require('react');
var ReactDOM = require('react-dom');
var User = require('../models/users.js');

var Login = React.createClass({
  showLogin: function(){  
    User.signIn().then(function(user){
      
    });
  },
  render: function() {
    return (
      <button className="top-bar-login" onClick={this.showLogin}>Login</button>
    )
  }
})

module.exports = Login;
