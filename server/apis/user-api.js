require('../server-helper'); // Keep me near the top; I load a few global utilities.

var UserAPI = require('express').Router();

var Trip    = require(__models + '/trip');
var Task    = require(__models + '/task');
var User    = require(__models + '/user');

module.exports = UserAPI;

UserAPI.post('/new', function(request, response) {
  User.createFromAuth(request.body)
    .then(sendStatusAndData(response, 201))
    .catch(sendStatusAndError(response, 500, 'Server error posting new trip'))
})
