require('./request-helpers.js'); // Imports headers
require('whatwg-fetch');      // imports 'fetch' function
var User = require('../models/users');
var _ = require('underscore');
var cachedTasks = {};
var Task = require('../models/tasks');

exports.setViewDataUpdateInterval = function(taskList, taskArea, interval) {
  setInterval(function() {
    fetchTasks(window.globalStateTripId)
    .then(function(tasks){
      var allFetches = [];
      tasks.forEach(function(task){
        if(window.globalStateTaskId === null) window.globalStateTaskId = task.id;
        var fetch = fetchSuggestions(task.id).then(function(suggestions){
          cachedTasks[task.id] = task;
          cachedTasks[task.id]['suggestions'] = suggestions;
        });
        allFetches.push(fetch); 
      })
      return Promise.all(allFetches);
    }).then(function(){
      var suggestions = cachedTasks[window.globalStateTaskId]['suggestions'];
      _.each(cachedTasks, task => Task.process(task, 3));
      taskArea.setState( {suggestionsInTask: suggestions} );
      taskList.setState({tasksInList : _.values(cachedTasks)});
    });

    if(window.globalStateTaskId) {
      fetchMessages(window.globalStateTaskId)
        .then(function(messages) {
          taskArea.setState( {messagesInTask: messages} );
        })
        .then(function(){
          var elem = document.getElementsByClassName('chat-display');
          elem.scrollTop = elem.scrollHeight;
        })
      }
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




