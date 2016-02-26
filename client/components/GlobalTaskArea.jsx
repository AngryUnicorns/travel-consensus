var React = require('react');
var ReactDOM = require('react-dom');
var SuggestionList = require('./SuggestionList.jsx');
var SuggestionItem = require('./SuggestionItem.jsx');
var MessageList = require('./MessageList.jsx');
var MessageItem = require('./MessageItem.jsx');
var SplashView = require('./SplashView.jsx');
var User = require('../models/users.js');
var Login = require('./Login.jsx');


var GlobalTaskArea = React.createClass({
  getInitialState: function() {
     return {
        logged_in: User.isLoggedIn(),
        messagesInTask: [],
        suggestionsInTask: [],
        // yourTrips: []
      }
  },

  handleNewMessage: function(e) {
    e.preventDefault();

    var newMessage = {
      content: $('.newMessageContent').val(),
      id_user: User.getID(),
    }

    // clear newMessageContent field
    $('.newMessageContent').val('')

    this.props.addNewMessage(newMessage);

    // intermediary setState; takes care of server-delay
    this.state.messagesInTask.push(newMessage)
    this.setState( {messagesInTask: this.props.messagesInTask} )
  },

  handleNewSuggestion: function(e) {
    e.preventDefault();
    var newSuggestion = {
      suggestion: $('.newSuggestionContent').val(),
      id_user: User.getID(),
      id_task : window.globalStateTaskId,
    }

    // clear newSuggestionContent field
    $('.newSuggestionContent').val('')

    this.props.addNewSuggestion(newSuggestion);

    // intermediary setState; takes care of server-delay
    this.state.suggestionsInTask.push(newSuggestion)
    this.setState( {suggestionsInTask: this.props.suggestionsInTask} )
  },

  // changeStatus: function(login) {
  //   this.setState({logged_in: User.isLoggedIn()});
  // },

  render: function() {
    setTimeout(() => {
      this.setState({logged_in: User.isLoggedIn()});
    }, 2000);

    if(!this.state.logged_in) {
      return (
        <div>
          <SplashView />
        </div>
      )
    }

    // else if(this.state.logged_in){
    //   return (
    //     <div className="main">
    //       <SplashView />
    //     </div>
    //   )
    // }

    else {
        return (

        <div className="main">

        <SuggestionList suggestions={this.state.suggestionsInTask} />

        <div className="suggestion-display">
          <form onSubmit={this.handleNewSuggestion}>
          <p>Add suggestion:</p>
            <input className="newSuggestionContent" type="text"></input>
            <button type="submit">Post</button>
          </form>
        </div>

        <div className="chat-display">
          <MessageList messages={this.state.messagesInTask} />
        </div>

        <div className="message-input">
          <form onSubmit={this.handleNewMessage}>
            <input className="newMessageContent" type="text"></input>
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    )
  } //closes else

  //get.js, fetchTrip and redirect them to that trip
  //<TaskList tasks={this.state.tasksInList} addNewTask={this.props.addNewTask} />


}

});

module.exports = GlobalTaskArea;
