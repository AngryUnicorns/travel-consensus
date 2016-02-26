require('./model-helper');

const db = require('../lib/db');
const first = require('ramda').head;

const Votes = module.exports;


Votes.addVote = function(suggestionId, userId) {
  return db('votes').insert({id_suggestion: suggestionId, id_user: userId})
    .catch(reportError('error updating votes on suggestion'))
}

/*
  Delete vote from suggestion
*/

Votes.removeVote = function(voteId) {
  return db('votes').where({id: voteId}).del()
    .catch(reportError('error updating votes on suggestion'))
}

// Votes.create = function(attrs) {
//   return db('user').insert(attrs, ['id', 'username', 'email', 'image', 'auth_id'])
//     .catch(reportError('error inserting user into db'))
// }
