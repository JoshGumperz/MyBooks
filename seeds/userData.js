const { User } = require('../models');


const userData = [
  {
    username: 'User1',
    password: 'user1password',

  },
  {
    username: 'User2',
    password: 'user2password',

  },
  {
    username: 'User3',
    password: 'user3password',

  }
];

const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;