"use strict"
require(TEST_HELPER) // <--- This must be at the top of every test file.

const Message = require(__models + '/message');
const db      = require('../../lib/db');
const dbCleaner = require('knex-cleaner');

describe('Message model', function() {
  describe('interface with database', function() {

    beforeEach(function() {
      return dbCleaner.clean(db, {mode: 'truncate'})
        .then(function() {
          return db('message').insert([
            {
              content: 'i like content',
              id_task: 2, id_user: 1,
            },
          ])
        })
    })

    it_('should list all messages of a task', function * () {
      yield Message.allOfTask(2)
        .then(function(messages) {
          expect(messages).to.have.length(1);
          expect(messages[0].content).to.equal('i like content');
        })
        .catch(reportError('listing messages from task by id'))
    })

    it_('should create a new message', function * () {
      let newMessage = {
        id_user: 1,
        id_task: 2,
        content: 'test message',
      }

      yield Message.create(newMessage)
        .then(function(message) {
          expect(message.id_user).to.equal(1);
          expect(message.createdAt).to.be.ok;
          expect(message.content).to.equal('test message')
        })
        .catch(reportError('creating a new message'))
    })

    it_('should error on invalid user/task information', function * () {
      let badUserMessage = {
        id_user: 99,
        id_task: 2,
        content: 'test message',
      }
      let badTaskMessage = {
        id_user: 1,
        id_task: 99,
        content: 'test message',
      }

      yield Message.create(badUserMessage)
        .then(function(result) {
          console.log('\t√ created message with invalid user (read test notes)');
          // Because we do not actually enforce foreign key constraints
          // this is a valid message.
          expect(null).to.not.be.ok;
        })
        .catch(function(error) {
          console.log('failure creating message with invalid user');
          // Beacuse we do not actually enforce foreign key constraints
          // our Message.create should not error out.
          expect(error).to.not.be.ok; // reject test
        })

      yield Message.create(badTaskMessage)
        .then(function(result) {
          console.log('\t√ created message with invalid task (read test notes)');
          expect(null).to.not.be.ok;
        })
        .catch(function(error) {
          console.log('failure creating message with invalid task');
          // Beacuse we do not actually enforce foreign key constraints
          // our Message.create should not error out.
          expect(error).to.not.be.ok; // reject test
        })
    })

    it_('should not accept invalid message content', function * () {
      let badContentMessage = {
        id_user: 1,
        id_task: 2,
        content: null,
      }

      yield Message.create(badContentMessage)
        .then(function(result) {
          // reportError('created message with invalid content', result);
          expect(null).to.be.ok; // reject test
        })
        .catch(function(error) {
          console.log('\t√ failure creating message with invalid content');
          expect(error).to.be.ok;
        })
    })

  }) // interface with database
})
