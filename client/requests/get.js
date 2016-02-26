require('./request-helpers.js'); // Imports headers
require('whatwg-fetch');      // imports 'fetch' function
var User = require('../models/users');

exports.setViewDataUpdateInterval = function(taskList, taskArea, interval) {
  setInterval(function() {
    fetchTasks(window.globalStateTripId)
      .then(function(tasks) {
        taskList.setState( {tasksInList: tasks} );
      })

    fetchMessages(window.globalStateTaskId)
      .then(function(messages) {
        taskArea.setState( {messagesInTask: messages} );
      })
      .then(function(){
        var elem = document.getElementsByClassName('chat-display');
        elem.scrollTop = elem.scrollHeight;
      })

    fetchSuggestions(window.globalStateTaskId)
      .then(function(suggestions) {
        taskArea.setState( {suggestionsInTask: suggestions} );
      })  
  }, interval)
}

function fetchTasks(tripId) {
  return fetch('trip/' + tripId + '/tasks', {
    headers: requestHeaders
  })
    .then(function(response) {
      return response.json();
    })
}

function fetchMessages(taskId) {
  return fetch('task/' + taskId + '/messages', {
    headers: requestHeaders
  })
    .then(function(response) {
      return response.json();
    })
}

function fetchSuggestions(taskId) {
  return fetch('task/' + taskId + '/suggestions', {
    headers: requestHeaders
  })
    .then(function(response) {
      return response.json();
    })
    .then(processSuggestions)
    .catch(function(error) {
      console.error('syntax error');
      console.dir(error);
    })
}

function idInVotesArray(id, votes) {
  return votes.some(function(vote){
    return vote.user_id === id;
  })
}

function processSuggestions(suggestions) {
  var userID = User.getID();
  
  var userHasVoted = suggestions.some(function(suggestion){
    return idInVotesArray(userID, suggestion.votes);
  });

  return suggestions.map(function(suggestion){
    setUserVoteStatus(suggestion, userID, userHasVoted);
    return suggestion;
  });
}

function setUserVoteStatus(suggestion, userID, userHasVoted) {
    var userHasVotedOnThis = idInVotesArray(userID, suggestion.votes);
    if(userHasVotedOnThis) {
      suggestion.user_vote_status = 'voted_on_this';
    } else {
      suggestion.user_vote_status = userHasVoted ? 'voted_on_other' : 'no_vote';
    }   
}


