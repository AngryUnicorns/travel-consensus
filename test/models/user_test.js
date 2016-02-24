"use strict"
require(TEST_HELPER) // <--- This must be at the top of every test file.

const User = require(__models + '/user');
const db      = require('../../lib/db');
const dbCleaner = require('knex-cleaner');

describe('User model', function() {
  	var testUser = {
		username : 'Test',
		email : "test@gmail.com",
		image : 'image.jpg',
		auth_id : 'test',
    };

    beforeEach(function() {
      return dbCleaner.clean(db, {mode: 'truncate'});
    })

    it_('should create a user if no user with a matching auth_id exists', function * () {
    	var user = yield User.create(testUser);
    	user.should.contain(testUser);
    })

    it_('should find a user by id', function * () {
    	var insertedUser = yield User.create(testUser);
    	var foundUser = yield User.findById(insertedUser.id);
    	foundUser.should.contain(testUser);
    });


    it_('should find a user by email', function * () {
    	var insertedUser = yield User.create(testUser);
    	var foundUser = yield User.findOne(insertedUser.email);
    	foundUser.should.contain(testUser);
    });
    
    it_('should update an existing user when a matching auth id exists', function * () {
    	yield User.create(testUser);
    	testUser['image'] = 'new_image.jpg';
    	yield User.create(testUser);
    	var users = yield db.select('*').from('users');
    	users[0].should.contain({image : 'new_image.jpg'});
    	users.length.should.equal(1);
    });

    it_.only('should create a user from an auth response', function * (){
    	
    	var authResponse = {
    		data : {
    			email : 'test.com',
    			name : "Tom Test",
    			id : "https://api.stormpath.com/v1/accounts/testID",
    			avatar : 'image.jpg'
    		}
    	};
    	  var expected = {
    		email : authResponse.data.email,
    		username : authResponse.data.name,
    		auth_id : 'testID',
    		image : authResponse.data.avatar,
    	};
    	var user = yield User.createFromAuth(authResponse);
    	user.should.contain(expected);
    })

})
