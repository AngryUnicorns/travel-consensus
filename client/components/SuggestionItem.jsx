var React = require('react');
var ReactDOM = require('react-dom');
var DeleteHelper = require('../requests/delete.js');
var VoteIcon = require('./VoteIcon.jsx');

var User = require('../models/users');
var _ = require('underscore');

var SuggestionItem = React.createClass({

  clickHandler: function() {
    var id = {};
    id.id_suggestion = this.props.suggestion.id;
    DeleteHelper.deleteSuggestion(id);
  },
  render: function() {
    return (
      <li className="suggestion">
      {this.props.suggestion.suggestion} 
      <VoteIcon suggestion={this.props.suggestion} />
      <i className="voted-icon fa fa-times" onClick={this.clickHandler}></i>
      </li>
    )
  }
})

module.exports = SuggestionItem;
