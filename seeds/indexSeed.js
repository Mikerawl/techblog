const sequelize = require('../config/connection');
const seedUser = require('./userSeed');
const seedPost = require('./postSeed');
const seedComment = require('./commentSeed');

console.log("seeds")

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedPost();
    await seedUser();
    await seedComment();

    process.exit(0);
};

seedAll();