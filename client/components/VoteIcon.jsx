var React = require('react');
var ReactDOM = require('react-dom');
var PostHelper = require('../requests/post.js');
var User = require('../models/users');
var _ = require('underscore');
var VoteIcon = React.createClass({
  voteHandler: function() {
    suggestionId = this.props.suggestion.id;
    PostHelper.upVoteSuggestion(suggestionId, User.getID());
  },
  arrowHelper: function() {
    if(this.props.suggestion.user_vote_status === 'voted_on_this') return 'fa fa-arrow-down';
    if(this.props.suggestion.user_vote_status === 'no_vote') return 'fa fa-arrow-up';
  },
  render: function() {
  	if(this.props.suggestion.user_vote_status === 'voted_on_other') {
  		return null;
  	} else {
	  	return (<i 
	  		className={this.arrowHelper()} 
	  		onClick={this.voteHandler}></i>
	  	);
  	}
  }
});

module.exports = VoteIcon;