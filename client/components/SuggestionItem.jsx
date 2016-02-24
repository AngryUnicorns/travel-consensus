var React = require('react');
var ReactDOM = require('react-dom');
var DeleteHelper = require('../requests/delete.js');
var PostHelper = require('../requests/post.js');

var SuggestionItem = React.createClass({
  clickHandler: function() {
    var id = {};
    id.id_suggestion = this.props.suggestion.id;

    DeleteHelper.deleteSuggestion(id);
  },

  voteHandler: function() {
    var userObject = {};
    userObject.suggestionID = this.props.suggestion.id;
    userObject.userID = this.props.suggestion.id_user;

    console.log('Props R Us', this.props)

    PostHelper.upVoteSuggestion(userObject)

    // this.props.upVoteSuggestion(this.props.suggestion.id)
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
