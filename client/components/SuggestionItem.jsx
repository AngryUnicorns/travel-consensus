var React = require('react');
var ReactDOM = require('react-dom');
var DeleteHelper = require('../requests/delete.js');
var PostHelper = require('../requests/post.js');
var User = require('../models/users')
var _ = require('underscore');

var SuggestionItem = React.createClass({

  clickHandler: function() {
    var id = {};
    id.id_suggestion = this.props.suggestion.id;
    DeleteHelper.deleteSuggestion(id);
  },

  voteHandler: function() {
    suggestionId = this.props.suggestion.id;
    PostHelper.upVoteSuggestion(suggestionId, User.getID());
  },

  arrowHelper: function() {
    userVoteArray = _.pluck(this.props.suggestion.votes, 'user_id');
    if(userVoteArray.indexOf(User.getID()) === -1) {
      return "fa fa-arrow-up"
    } else {
      return "fa fa-arrow-down"
    }
  },

  render: function() {
    return (
      <li className="suggestion">
      {this.props.suggestion.suggestion} <i className={this.arrowHelper()} onClick={this.voteHandler}></i>  <i className="fa fa-times" onClick={this.clickHandler}></i>
      </li>
    )
  }
})

module.exports = SuggestionItem;
