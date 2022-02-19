const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize

// console.log("Name 3", process.env.DB_NAME)

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'Localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}


module.exports = sequelize;

