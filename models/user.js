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
  return User.findByAuthId(attrs['auth_id']).then(function(user){
    if(user) {
      delete user['auth_id'];
      console.log(user.id);
      return User.updateById(user.id, attrs).then(function(){
        return user;
      });
    } else {
      return User.insert(attrs);
    }
  }).then(function(user){
    console.log("User created for " + user.username);
    return user;
  });
}

User.updateById = function(id, attrs) {
  if(attrs.id) {
    delete attrs.id;
  }
  return db('users').select().where({id : id}).update(attrs);
}

User.insert = function(attrs) {
  return db('users').insert(attrs, ['id', 'username', 'email', 'image', 'auth_id'])
  .catch(reportError('error inserting user into db')).then(function(users){
    return users[0];
  });
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
  return User.findFirst({email : email});
}

// Accepts an auth response and creates a user from it
User.createFromAuth = function(auth) {
  var user = convertAuthToUser(auth);
  return User.create(user);
}

var convertAuthToUser = function(auth) {
  var authData = auth.data;
  var authId = getAuthId(authData);
  return {
    auth_id : authId,
    email : authData.email,
    username : authData.name,
    image : authData.avatar,
  };
}

var getAuthId = function(authData) {
  return authData.id.split('/')[5];
}



/*
  function to find user by ID
  used in pasport deserialize to pass user id to session
*/

User.findById = function(id) {
  console.log('searched for id', id);
  return User.findFirst({id : id}).catch(function(error) {
      console.warn('error retrieving user id', id);
      console.warn(error);
      throw error;
  }).then(function(result) {
      console.log('success retrieving user');
      return result;
  })
  .catch(reportError('error retrieving user id'));
}

User.findByAuthId = function(authId) {
  return User.findFirst({auth_id : authId});
}

User.find = function(query) {
  return db.select('*').from('users').where(query);
}

User.findFirst = function(query) {
  return User.find(query).then(first);
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

