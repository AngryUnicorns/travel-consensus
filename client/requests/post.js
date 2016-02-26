require('./request-helpers');
require('whatwg-fetch');


/*
  Sends a request to the server to create a new task

  See server/apis/trip-api @ POST trip/:id_trip/task
*/
exports.addNewTask = function(taskObject) {
  return fetch('trip/' + window.globalStateTripId + '/task', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(taskObject)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('!POSTED NEW TASK TO DATABASE!', data);
      return data;
    })
};

/*
  Sends a request to the server to create a new message

  See server/apis/task-api @ POST task/:id_task/message
*/
exports.addNewMessage = function(messageObject) {
  return fetch('task/' + window.globalStateTaskId + '/message', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(messageObject)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('!Posted new message to database!', data);
      return data;
    })
};

/*
  Sends a request to the server to create a new suggestion

  See server/apis/task-api @ POST task/:id_task/suggestion
*/
exports.addNewSuggestion = function(suggestionObject) {
  return fetch('task/' + window.globalStateTaskId + '/suggestion', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(suggestionObject)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('!Posted new suggestion to database!', data);
      return data;
    })
};


/*
  Sends a request to the server to create a new user

  See server/apis/user-api
*/
exports.createUser = function(authResponse) {
  return fetch('user/new', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(authResponse)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('!Posted new user!', data);
      return data;
    })
    .catch(function(error){
      console.log('create user error', error);
    })
};

exports.upVoteSuggestion = function(suggestionId, userId) {
  return fetch('task/' + window.globalStateTaskId + '/suggestions/' + suggestionId + '/vote', {
  // return fetch('/:id_task/suggestions/:id_suggestion/vote', {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify({user_id: userId})
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data) {
    console.log('!Posted new vote to database!', data);
    return data;
  })
  .catch(function(res){
    console.log('got an error over here! in post on upVoteSuggestion')
  })
};

