
exports.seed = function(knex, Promise) {
  return knex('suggestion').truncate()
    .then(function() {
      return knex('suggestion').insert([
        {
          suggestion: 'jimmy johns', votes: 1,
          id_task: 7, id_user: 2, id_trip: 1
        },
        {
          suggestion: 'a funny one', votes: 2,
          id_task: 3, id_user: 1, id_trip: 2
        },
        {
          suggestion: 'moms basement',
          id_task: 8, id_user: 3, id_trip: 2
        },
        {
          suggestion: 'Paris', votes: 3,
          id_task: 5, id_user: 3, id_trip: 3
        },
        {
          suggestion: 'Jimmy John', votes: 1,
          id_task: 1, id_user: 2, id_trip: 3
        }
      ])
    })
    .catch(function(error) {
      console.error('error seeding suggestions', error)
    })
};
