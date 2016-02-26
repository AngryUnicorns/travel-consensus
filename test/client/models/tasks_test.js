"use strict"
require(TEST_HELPER) // <--- This must be at the top of every test file.

const Task = require(__client + '/models/tasks');

describe('Get Requests', function() {

    describe('Processing tasks', function(){
      it('should set consensus status if more than half of users have voted for a given task', function() {
        var task = {
            name : "Task1",
            suggestions : [
              {
                suggestion : 'one',
                votes : [
                  {},{},
                ],
              },
              {
                suggestion : 'two',
                votes : [
                  {},
                ],
              },
              {
                suggestion : 'three',
                votes : [],
              },
          ],
        };
        task = Task.process(task, 3);
        task.consensus_choice.should.equal('one');
      })
      it('should do nothing if a more than half of users have voted', function() {
        var task = {
            name : "Task1",
            consensus_choice : 'other',
            suggestions : [
              {
                suggestion : 'one',
                votes : [
                ],
              },
              {
                suggestion : 'two',
                votes : [
                ],
              },
              {
                suggestion : 'three',
                votes : [],
              },
          ],
        };
        task = Task.process(task, 3);
        task.consensus_choice.should.equal('other');
      })
    })




})
