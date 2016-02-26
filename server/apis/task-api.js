require('../server-helper'); // Keep me near the top; I load a few global utilities.

var TaskAPI    = require('express').Router();

var Task       = require(__models + '/task');
var Message    = require(__models + '/message');
var Suggestion = require(__models + '/suggestion');
var Vote       = require(__models + '/votes');


module.exports = TaskAPI;


/*
  POST task/:id_task/message

  Creates a new message for this task

  Expects request: {
    content: String <What was said>
    id_user:  Number <Who said it>
  }

  Responds with the new message: {
    id:        Number <unique identifier for this message>
    content:   String <What was said>
    createdAt: Date <When it was said>
    id_user:   Number <Who said it>
    id_task:   Number <In which task>
  }
*/
TaskAPI.post('/:id_task/message', function(request, response) {
  var newMessage = {
    content: request.body.content,
    id_user: request.body.id_user,
    id_task: request.params.id_task
  }

  Message.create(newMessage)
    .then(sendStatusAndData(response, 201))
    .catch(sendStatusAndError(response, 500, 'Server error posting new message to task'))
})

/*
  POST task/:id_task/suggestion

  Creates a new suggestion for this task

  Expects request: {
    suggestion: String <What was suggested>
    id_user:    Number <Who suggested it>
  }

  Responds with the new suggestion: {
    id:         Number <unique identifier for this message>
    suggestion: String <What was suggested>
    createdAt:  Date <When it was suggested>
    id_user:    Number <Who suggested it>
    id_task:    Number <In which task>
  }
*/
TaskAPI.post('/:id_task/suggestion', function(request, response) {
  var newSuggestion = {
    suggestion: request.body.suggestion,
    id_user: request.body.id_user,
    id_task: request.params.id_task
  }

  Suggestion.create(newSuggestion)
    .then(sendStatusAndData(response, 201))
    .catch(sendStatusAndError(response, 500, 'Server error posting new suggestion to task'))
})

/*
  DELETE task/:id_task/suggestion

  Removes a suggestion from the database

  Expects request: {
    id_suggestion: Number <suggestion id to delete>
  }

  Responds with the number of deleted rows (hopefully > 0)
*/
TaskAPI.delete('/:id_task/suggestion', function(request, response) {
  Suggestion.delete(request.body.id_suggestion)
    .then(function(){
      return {success: true};
    })
    .then(sendStatusAndData(response, 201))
    .catch(sendStatusAndError(response, 500, 'Server error deleting suggestion from task'))
})

/*NOT IMPLEMENTED

  PUT task/:id_task

  Updates a task's status

  Expects request: {
    // Do we need full information or can we update only given properties
  }

  Responds with: {
    id:       Number,
    name:     String,
    status:   String,
    decision: String,
    id_trip:  Number
  }
*/
TaskAPI.put('/:id_task/', function(request, response) {
  throw new Error('What are you doing here?')
})

/*
  GET task/:id_task/messages

  Returns an array of messages for the given task

  Responds with: [
    {
      id:        Number <unique identifier for this message>
      content:   String <What was said>
      createdAt: Date <When it was said>
      id_user:   Number <Who said it>
      id_task:   Number <In which task>
    },
    ...
  ]
*/
TaskAPI.get('/:id_task/messages', function(request, response) {
  var id_task = request.params.id_task;

  Message.allOfTask(id_task)
    .then(sendStatusAndData(response, 200))
    .catch(sendStatusAndError(response, 500, 'Server error getting messages by task id'))
})


/*
  GET task/:id_task/suggestions

  Returns an array of suggestions for a given task

  Responds with: [
    {
      id:         Number <unique identifier for this message>
      suggestion: String <What was suggested>
      createdAt:  Date <When it was suggested>
      id_user:    Number <Who suggested it>
      id_task:    Number <In which task>
    },
    ...
  ]
*/
TaskAPI.get('/:id_task/suggestions', function(request, response) {
  var id_task = request.params.id_task;
  Suggestion.allOfTaskWithVotes(id_task)
    .then(sendStatusAndData(response, 200))
    .catch(sendStatusAndError(response, 500, 'Server error getting suggestions by task id'))
})



TaskAPI.post('/:id_task/suggestions/:id_suggestion/vote', function(request, response) {
  var userId = request.body.user_id;
  var suggestionId = request.params.id_suggestion

  Vote.addVote(suggestionId, userId)
    .then(sendStatusAndData(response, 200))
    .catch(sendStatusAndError(response, 500, 'Server error posting vote'))
})

TaskAPI.delete('/:id_task/suggestions/:id_suggestion/vote/:id_vote', function(request, response) {
  var id_vote = request.params.id_vote;
  Vote.removeVote(id_vote)
    .then(function(){
      return {success: true}
    })
    .then(sendStatusAndData(response, 200))
    .catch(sendStatusAndError(response, 500, 'Server error changing vote'))
})
