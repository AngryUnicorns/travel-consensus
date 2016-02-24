require('./model-helper');

const db = require('../lib/db');
const first = require('ramda').head;

const Votes = module.exports;


Votes.addVote = function(suggestionID, userID) {
  return db('votes').where({id: suggestionId}).increment('count', 1).insert({user_id: userID})
    .catch(reportError('error updating votes on suggestion'))
}

/*
  Delete vote from suggestion
*/

Votes.removeVote = function(suggestionID) {
  return db('votes').where({id: suggestionId}).decrement('count', 1)
    .catch(reportError('error updating votes on suggestion'))
}
