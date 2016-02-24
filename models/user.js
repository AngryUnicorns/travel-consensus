require('./model-helper');

const db = require('../lib/db');
const first = require('ramda').head;
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');


const User = module.exports;

/*
  Insert new user into database

  attrs {
    auth_id:    String <user id provided by 0Auth>
    username:   String <username to be shown in chat>
    image:      String <facebook profile image url>
    email:      String <user's email address>
  }
*/
User.create = function(attrs) {
  return db('user').insert(attrs, ['id', 'username', 'email', 'image', 'auth_id'])
    .catch(reportError('error inserting user into db'))
}

/*
  Password hash and decrypt functions, using bcrypt
*/


User.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

/*
  function to look for a user based on email, for use by passport
  adapting a native Mongo function for use with PostGreSQL
*/

User.findOne = function(email) {
  return db.select('*').from('users').where({ 'email': email })
    .catch(reportError('error retrieving user'))
    .then(function(user) {
      if (user) {
        console.warn(email + ' is not available!');
        return true;
      } else {
        console.log(email + ' is available');
        return false;
      }
    })
}

/*
  function to find user by ID
  used in pasport deserialize to pass user id to session
*/

User.findById = function(id) {
  return db.select('*').from('users').where({ 'id': id })
    .catch(function(error) {
      console.warn('error retrieving user id', id);
      console.warn(error);
      throw error;
    })
    .then(function(result) {
      console.log('success retrieving user');
      return result;
    })
    .catch(reportError('error retrieving user id'))
    .then(first)
}

/*
  Retrieve all users of a trip
*/
User.allOfTrip = function(tripId) {
  // TODO: do not select password_digest
  return db.select('*').from('trip_users').where({ 'id_trip': tripId })
    .catch(reportError('error retrieving users for trip'))
}


/*
  Retrieve username for an id
*/
User.usernameById = function(userId) {
  return db.select('username').from('users').where( {id: userId} )
    .catch(reportError('error retrieving username by userId'))
    .then(first)
}

/*
  Delete a user from a trip id
*/
User.deleteFromTrip = function(userId, tripId) {
  return db('trip_users').where({'id_trip': tripId}).andWhere({'id_user': userId}).del()
    .catch(reportError('error deleting user from trip'))
    .then(function() {
      return deleteUserFromMessage(userId);
    })
    .then(function() {
      return deleteUserFromSuggestion(userId);
    })
}

/*
  We should not need a delete user functions, but in case
*/
User.deleteUser = function(userId) {
  return db('user').where({'id': userId}).del()
    .catch(reportError('error deleting user'))
  return db('users').where({'id': userId}).del()
    .catch(function(error) {
      console.warn('error deleting user', userId);
      console.warn(error);
      throw error;
    })
    .then(function(result) {
      console.log('success deleting user');
      return result;
    })
}

/*
  Foreign key deletion functions for user

  Helper functions for deleteUserFromTrim
*/
function deleteUserFromMessage(userId) {
  return db('message').where({'id_user': userId}).del()
    .catch(reportError('error deleting user from message'))
}

function deleteUserFromSuggestion(userId) {
  return db('suggestion').where({'id_user': userId}).del()
    .catch(reportError('error deleting user from suggestion'))
}

