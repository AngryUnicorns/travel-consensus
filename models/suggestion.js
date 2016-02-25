require('./model-helper');

const db = require('../lib/db');
const first = require('ramda').head;

const Suggestion = module.exports;

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


/*
  Delete a suggestion
*/
Suggestion.delete = function(suggestionId) {
  return db('suggestion').where({'id': suggestionId}).del()
    .catch(reportError('error deleting suggestion'))
}

/*
  Add vote to suggestion
*/
// Suggestion.addVote = function(suggestionID) {
// console.log('suggestionIDsuggestionIDsuggestionID', suggestionID)
//   // return db('suggestion').where({id: suggestionId}).increment('votes', 1)
//   //   .catch(reportError('error updating votes on suggestion'))
// }

// /*
//   Delete vote from suggestion
// */

// Suggestion.removeVote = function(suggestionID) {
//   return db('suggestion').where({id: suggestionId}).decrement('votes', 1)
//     .catch(reportError('error updating votes on suggestion'))
// }
