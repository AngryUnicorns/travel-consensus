var React = require('react');
var ReactDOM = require('react-dom');
var User = require('../models/users.js');


var Login = React.createClass({
  getInitialState : function() {
    return {
      logged_in : User.isLoggedIn(),
    };
  },
  handleLogout : function() {
    User.signOut().then(() => this.setState({logged_in : false}));
  },
  handleLogin: function(){  
    User.signIn().then(user => this.setState({logged_in : true}));
  },
  render: function() {
    if(!this.state.logged_in) {
      return (
          // <form className="form">
          <div className="splashBox">
              <button className="top-bar-login" onClick={this.handleLogin}>Login</button>
          </div>
          // </form>
      )
    } else {
      return (
        <button className="top-bar-logout" onClick={this.handleLogout}>Logout</button>
      )
    }
  }
})

module.exports = Login;
