
exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function() {
      return knex('users').insert([
        {
          username: 'Zack', email: 'sample@sample.com',
          password: 'babel',
          auth_id : 'test',
          image : 'http://www.adweek.com/socialtimes/files/2012/03/twitter-egg-icon.jpg',
        },
        {
          username: 'J-man', email: 'notsample@gmail.com',
          password: 'webmaster',
          auth_id : 'test',
          image : 'http://www.adweek.com/socialtimes/files/2012/03/twitter-egg-icon.jpg',

        },
        {
          username: 'Sammy', email: 'sammy@yahoo.com',
          password: 'password',
          auth_id : 'test',
          image : 'http://www.adweek.com/socialtimes/files/2012/03/twitter-egg-icon.jpg',
        }
      ])
    })
    .catch(function(error) {
      console.error('error seeding users', error)
    })
};
