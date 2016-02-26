require('./request-helpers');
require('whatwg-fetch');


/*
  Sends a request to the server to delete an existing suggestion

  See server/apis/trip-api @ DELETE task/:id_task/suggestion
*/
exports.deleteSuggestion = function(suggestionObject) {

  return fetch('task/' + window.globalStateTaskId + '/suggestion', {
    method: 'DELETE',
    headers: requestHeaders,
    body: JSON.stringify(suggestionObject)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('!DELETED SUGGESTION IN DATABASE!', data);
      return data;
    })
    .catch(function(error) {
      console.log('errored deleting suggestion', error)
    })
};


exports.downVoteSuggestion = function(suggestionId, voteId) {
  return fetch('task/' + window.globalStateTaskId + '/suggestions/' + suggestionId + '/vote/' + voteId, {
    method: 'DELETE',
    headers: requestHeaders,
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log('!Deleted Vote in database!', data)
    return data;
  })
  .catch(function(err){
    console.log(err, 'Error In downVoteSuggestion')
  })
};
