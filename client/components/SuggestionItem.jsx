var React = require('react');
var ReactDOM = require('react-dom');
var DeleteHelper = require('../requests/delete.js');
var Votes = require('../models/votes.js');

var SuggestionItem = React.createClass({
  clickHandler: function() {
    var id = {};
    id.id_suggestion = this.props.suggestion.id;
    DeleteHelper.deleteSuggestion(id);
  },

  voteHandler: function() {
    alert('You clicked the up arrow!');
  },

  render: function() {
    return (
      <li className="suggestion">
      {this.props.suggestion.suggestion} <i className="fa fa-arrow-up" onClick={this.voteHandler}></i>  <i className="fa fa-times" onClick={this.clickHandler}></i>
      </li>
    )
  }
})

module.exports = SuggestionItem;
