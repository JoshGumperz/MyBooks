const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedBook = require('./bookData');


const seedAll = async () => {
  await sequelize.sync({ force : true})

  await seedUser();

  await seedBook();

  process.exit(0)
}

seedAll()