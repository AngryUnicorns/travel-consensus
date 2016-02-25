var React = require('react');
var ReactDOM = require('react-dom');
var DeleteHelper = require('../requests/delete.js');
var PostHelper = require('../requests/post.js');
var User = require('../models/users')

var SuggestionItem = React.createClass({

  clickHandler: function() {
    var id = {};
    id.id_suggestion = this.props.suggestion.id;
    DeleteHelper.deleteSuggestion(id);
  },

  voteHandler: function() {
    suggestionId = this.props.suggestion.id;
    userId = this.props.suggestion.id_user;

    PostHelper.upVoteSuggestion(suggestionId, userId)
  },

  arrowHelper: function() {
    var user = User.getID(),
    userVoteArray = this.props.suggestion.vote_users;

    if(userVoteArray.indexOf(user) === -1) {
      return "fa fa-arrow-up"
    }
    else {
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
