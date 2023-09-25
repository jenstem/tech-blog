const sequelize = require('../config/connection');

const usersSeed = require('./userData');
const commentsSeed = require('./commentData');
const postsSeed = require('./blogData');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await usersSeed();
  await postsSeed();
  await commentsSeed();

  process.exit(0);
};

seedDatabase();
