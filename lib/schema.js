var pg = require('./db')

/*
	With a running postgres server process (postgres -D)
		> For development:
			'node lib/schema.js'
		> For testing:
			'NODE_ENV=test node lib/schema.js'
*/


/*
	Create all of the tables of our database.

	Foreign key constraints have been commented out to avoid
  having to actually comply with those constraints. We had
  problems only when testing them. If working with a fleshed
  out development database with proper ids and stuff, they
  shouldn't be a problem.
*/
pg.schema.createTableIfNotExists('trip', function (table) {
  table.increments('id').primary();
  table.string('name').notNullable().defaultTo('Unknown');
})
.createTableIfNotExists('users', function (table) {
  table.increments('id').primary();
  table.string('email').unique().notNullable();
  table.string('auth_id').unique().notNullable();
  table.string('image').defaultTo('');
  table.string('username').notNullable();
})
.createTableIfNotExists('trip_users', function (table) {
  table.increments('id').primary();
  table.integer('id_trip') // .references('id').inTable('trip');
  table.integer('id_user') // .references('id').inTable('users');
})
.createTableIfNotExists('task', function (table) {
  table.increments('id').primary();
  table.string('name').notNullable();
  //will set default after decision on wording is made
  table.string('status').defaultTo('');
  table.string('decision').nullable();
  table.integer('id_trip') // .references('id').inTable('trip');
})
.createTableIfNotExists('message', function (table) {
  table.increments('id').primary();
  table.timestamp('createdAt').defaultTo(pg.fn.now());
  table.string('content', 1000).notNullable();
  table.integer('id_task') // .references('id').inTable('task');
  table.integer('id_user') // .references('id').inTable('users');
})
.createTableIfNotExists('suggestion', function (table) {
  table.increments('id').primary();
  table.string('suggestion').notNullable();
  table.integer('votes').defaultTo(0);
  table.timestamp('createdAt').defaultTo(pg.fn.now());
  table.integer('id_task') // .references('id').inTable('task');
  table.integer('id_user') // .references('id').inTable('users');
  table.integer('id_trip') // .references('id').inTable('trip');
})
.createTableIfNotExists('votes', function (table) {
  table.integer('id_suggestion');
  table.integer('vote').defaultTo(0);
  table.integer('id_user');
})
.then(function(result) {
	console.log('SUCCESSFULLY BANKED THOSE TABLES');
})
.catch(function(error) {
	console.log('error initializing schema:', error)
})
