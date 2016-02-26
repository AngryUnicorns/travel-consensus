var React = require('react');
var ReactDOM = require('react-dom');
var User = require('../models/users');

var MessageItem = React.createClass({
  render: function() {
    return (
      <p className="message">
        <span className="message-author">{this.props.message.username}: </span>
        {this.props.message.content}
      </p>
    )
  }
})

module.exports = MessageItem;
