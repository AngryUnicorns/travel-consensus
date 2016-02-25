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
      console.log('!Posted new suggestion to database!', data);
      return data;
    })
};
