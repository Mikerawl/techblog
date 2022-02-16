const Sequelize = require('sequelize');
const path = require('path')
require('dotenv').config({path: './config/.env'});

console.log("Name 3", process.env.DB_NAME)

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306
    }
  );
}


module.exports = sequelize;

