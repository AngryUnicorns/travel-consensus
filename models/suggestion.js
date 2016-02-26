require('./model-helper');

const db = require('../lib/db');
const first = require('ramda').head;

const Suggestion = module.exports;
const _ = require('underscore');

/*
  Insert new suggestion into database

  attrs {
    suggestion: String <What's the suggestion?>
    id_task:    Number <Which task is this a suggestion for?>
    id_user:    Number <Who made this suggestion?>
  }
*/
Suggestion.create = function(attrs) {
  return db('suggestion').insert(attrs, ['id', 'suggestion', 'id_user', 'id_task', 'createdAt'])
    .catch(reportError('error inserting suggestion into db'))
    .then(first)
}

/*
  Retrieve all suggestions of a certain task

  TODO: Sort suggestions by createdAt dates
*/
Suggestion.allOfTask = function(taskId) {
  return db.select('*').from('suggestion').where({'id_task': taskId}).orderBy('createdAt', 'asc')
    .catch(reportError('error reading all suggestions of task:'))
}

Suggestion.votesBySuggestionIDForTask = function(taskId) {
  return  db.select('*').from('suggestion').innerJoin('votes', 'suggestion.id', 'votes.id_suggestion').where({'suggestion.id_task' : taskId})
  .catch(reportError('error reading all suggestions of task:'))
  .then(addVotesToSuggestions)
}

Suggestion.allOfTaskWithVotes = function(taskId) {
  return Promise.all([
    Suggestion.votesBySuggestionIDForTask(taskId),
    Suggestion.allOfTask(taskId),
  ]).then(function(results){
    var votesBySuggestion = results[0];
    var suggestions = results[1];
    return _.map(suggestions, function(suggestion){
      suggestion.votes = votesBySuggestion[suggestion.id] || [];
      return suggestion;
    });
  });
}

var addVotesToSuggestions = function(joinedSuggestions) {
  // console.log(joinedSuggestions);
  var output =  _.chain(joinedSuggestions)
    .groupBy('id_suggestion')
    .reduce(function(indexedVotes, votesForSuggestion, suggestionID){
      var votes = _.map(votesForSuggestion, function(vote){
        return {
          id : vote.id, 
          user_id : vote.id_user
        };
      });
      suggestionID = votesForSuggestion[0]['id_suggestion'];
      indexedVotes[suggestionID] = votes;
      return indexedVotes;
    }, {})
  .value();
  // console.log(output);
  return output;
}


/*
  Delete a suggestion
*/
Suggestion.delete = function(suggestionId) {
  return db('suggestion').where({'id': suggestionId}).del()
    .catch(reportError('error deleting suggestion'))
}
