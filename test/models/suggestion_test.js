"use strict"
require(TEST_HELPER) // <--- This must be at the top of every test file.

const User = require(__models + '/user');

const Suggestion = require(__models + '/suggestion');
const Trip = require(__models + '/trip');
const Task = require(__models + '/task');
const Votes = require(__models + '/votes');
const db      = require('../../lib/db');
const dbCleaner = require('knex-cleaner');

describe('Suggestion model', function() {
    var testTrip = {
        id : 0,
        name: 'Denver',
    };

    var testUser = {
        id : 0,
        username : 'Test',
        email : "test@gmail.com",
        image : 'image.jpg',
        auth_id : 'test',
    };

    var testUser2 = {
        id : 1,
        username : 'Test1',
        email : "test1@gmail.com",
        image : 'image.jpg',
        auth_id : 'test1',
    };

    var testTask = {
        name: 'Places to sink',
        decision: 'Bermuda',
        status: 'decided',
        id_trip: 0
    };

    var getSuggestion = function(newID, suggestion, userID, taskID, dateString) {
        return {
            id : newID,
            id_user : userID,
            id_task : taskID,
            suggestion : suggestion,
            createdAt : new Date(dateString),
        };
    }


    beforeEach(function() {
      return dbCleaner.clean(db, {mode: 'truncate'});
    })

    it_.only('should returns all suggestions for a given task along with the users that have voted on that task', function * () {
    	// populate the data
        var user = yield User.create(testUser);
        var user2 = yield User.create(testUser2);
        var trip = yield Trip.create(testTrip);
        var task = yield Task.create(testTask);
        var vote = yield Votes.addVote(0, 0);
        var vote1 = yield Votes.addVote(0, 1);
        var suggestion1 = yield Suggestion.create(getSuggestion(0, "one", 0, 0, "05/15/1983"));
        var suggestion2 = yield Suggestion.create(getSuggestion(1, "two", 0, 0, "05/16/1983"));
        var suggestion3 = yield Suggestion.create(getSuggestion(2, "three", 0, 0, "05/17/1983"));    
        var foundSuggestions = yield Suggestion.allOfTaskWithVotes(0);
        // confirm that the first suggestion comes back
        foundSuggestions[0].should.contain({id : 0});
        foundSuggestions[0].votes[0].should.contain({user_id : 0});
        foundSuggestions[0].votes[1].should.contain({user_id : 1});
        foundSuggestions[1].should.contain({id : 1});
        console.log(foundSuggestions[1].votes);
        foundSuggestions[1].votes.length.should.equal(0); 
        foundSuggestions[2].should.contain({id : 2});
        foundSuggestions[2].votes.length.should.equal(0); 
    })


})
